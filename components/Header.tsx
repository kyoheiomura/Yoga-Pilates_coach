import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MenuIcon } from "@/components/icons";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/purpose/", label: "目的から" },
  { href: "/area/", label: "エリアから" },
  { href: "/instructor/", label: "先生をさがす" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${SITE.name} ホーム`} className="shrink-0 py-2">
          <Logo />
        </Link>

        <nav aria-label="メイン" className="hidden min-[768px]:block">
          <ul className="flex items-center gap-1 text-[0.875rem] font-bold tracking-[0.08em]">
            {NAV.map((n, i) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={
                    i === NAV.length - 1
                      ? "ml-3 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-white transition-[background-color,transform] duration-500 hover:-translate-y-0.5 hover:bg-accent-deep"
                      : "inline-flex min-h-11 items-center rounded-full px-4 transition-colors duration-300 hover:bg-accent-soft hover:text-accent-deep"
                  }
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* モバイル */}
        <details className="group min-[768px]:hidden">
          <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full bg-accent-soft text-accent-deep [&::-webkit-details-marker]:hidden">
            <span className="sr-only">メニュー</span>
            <MenuIcon size={22} />
          </summary>
          <nav aria-label="メイン" className="fixed inset-x-0 top-[4.5rem] z-40 h-[calc(100dvh-4.5rem)] bg-paper px-5 pt-4">
            <ul className="serif text-[1.25rem]">
              {[...NAV].reverse().map((n) => (
                <li key={n.href} className="border-b border-line">
                  <Link href={n.href} className="flex py-5">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link href="/join/" className="flex py-5 font-sans text-[0.9375rem] font-bold text-sub">
                  掲載を希望する先生の方へ
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
