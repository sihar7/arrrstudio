"use client";

import Link from "next/link";
import { locales, type Locale } from "@/utils/i18n";
import { rememberLocale } from "@/utils/locale-client";
import { cn } from "@/lib/utils";

export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex h-11 items-center text-[12px] font-medium">
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}`}
          scroll={false}
          prefetch={false}
          hrefLang={code}
          onClick={() => rememberLocale(code)}
          aria-current={code === lang ? "true" : undefined}
          className={cn(
            "relative grid h-11 min-w-9 place-items-center uppercase tracking-[0.14em] text-ink transition-opacity duration-200 after:absolute after:inset-x-2 after:bottom-2.5 after:h-px after:bg-current after:transition-transform after:duration-300",
            code === lang ? "after:scale-x-100" : "opacity-60 after:scale-x-0 hover:opacity-100",
          )}
        >
          {code}
        </Link>
      ))}
    </nav>
  );
}
