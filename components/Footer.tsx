import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Wave } from "@/components/Wave";
import { SITE } from "@/data/site";

const GROUPS = [
  {
    label: "さがす",
    links: [
      { href: "/instructor/", label: "先生をさがす" },
      { href: "/purpose/", label: "目的からさがす" },
      { href: "/area/", label: "エリアからさがす" },
    ],
  },
  {
    label: "このサイトについて",
    links: [
      { href: "/join/", label: "掲載を希望する先生の方へ" },
      { href: SITE.contactUrl, label: "お問い合わせ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-[clamp(2rem,5vw,4.5rem)] bg-night text-white">
      <Wave side="top" color="var(--color-night)" />
      <div className="container-page grid gap-12 pt-14 pb-10 min-[768px]:grid-cols-12 min-[768px]:pt-20">
        <div className="min-[768px]:col-span-6">
          <Logo size="lg" invert />
          <p className="mt-6 max-w-[25rem] text-[0.9375rem] leading-[2] text-white/85">
            ヨガ・ピラティスの先生一人ひとりに話を聞き、レッスンの雰囲気と人柄を本人の言葉で届けます。
          </p>
        </div>
        {GROUPS.map((g) => (
          <nav key={g.label} aria-label={`フッター（${g.label}）`} className="min-[768px]:col-span-3">
            <p className="text-[0.8125rem] font-bold tracking-[0.12em] text-brass-soft">{g.label}</p>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              {g.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="text-white/90 underline decoration-transparent transition-colors duration-300 hover:text-white hover:decoration-brass-soft">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} target="_blank" rel="noopener" className="text-white/90 underline decoration-transparent transition-colors duration-300 hover:text-white hover:decoration-brass-soft">
                      {l.label}
                      <span aria-hidden="true"> ↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      {/* 画面幅いっぱいのロゴ。1文字ずつ下から出る。飾りなので読み上げない */}
      <p aria-hidden="true" className="reveal overflow-hidden px-2 text-center font-num text-[27vw] leading-[0.95] italic text-white/[0.09] select-none">
        {[...SITE.nameEn].map((ch, i) => (
          <span key={i} className="reveal-char" style={{ "--d": i * 2 } as React.CSSProperties}>
            {ch}
          </span>
        ))}
      </p>
      <div className="container-page border-t border-white/10 py-6 text-[0.75rem] text-white/55">
        © {SITE.name} {SITE.kind}
      </div>
    </footer>
  );
}
