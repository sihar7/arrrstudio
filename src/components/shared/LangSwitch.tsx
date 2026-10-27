"use client";

import Link from "next/link";
import { locales, type Locale } from "@/utils/i18n";
import { rememberLocale } from "@/utils/locale-client";
import { cn } from "@/lib/utils";

export default function LangSwitch({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex h-9 items-center rounded-full bg-sunken p-0.5 font-mono text-xs">
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}`}
          scroll={false}
          hrefLang={code}
          onClick={() => rememberLocale(code)}
          aria-current={code === lang ? "true" : undefined}
          className={cn(
            "grid h-8 min-w-10 place-items-center rounded-full px-2 uppercase tracking-wider transition-colors duration-150",
            code === lang ? "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.12)]" : "text-ink-3 hover:text-ink",
          )}
        >
          {code}
        </Link>
      ))}
    </nav>
  );
}
