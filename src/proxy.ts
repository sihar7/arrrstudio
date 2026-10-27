import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "@/utils/i18n";

// Urutan: pilihan bahasa tersimpan → Accept-Language → default (ID).
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (saved && hasLocale(saved)) return saved;
  const accepted = request.headers.get("accept-language") ?? "";
  for (const part of accepted.split(",")) {
    const base = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (hasLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|brand|.*\\..*).*)"],
};
