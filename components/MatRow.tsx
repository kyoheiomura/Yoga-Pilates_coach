import Link from "next/link";
import { MATS } from "@/data/vocab";
import { getAllPurposes } from "@/lib/purposes-index";

/**
 * トップの「目的からさがす」：上から見たスタジオの床に並ぶ、8枚のマット。1枚が目的1つ。押すとその目的の先生の一覧へ。
 * 画面に入ると、巻いてあったマットが左から順に広がる（globals.css の .unroll / .mat）。触れると少し浮く。
 * スマホでは横向きの帯になる。
 */
export function MatRow() {
  const all = getAllPurposes();
  return (
    <nav aria-label="目的からさがす">
      <ul className="unroll grid gap-3 min-[640px]:grid-cols-8 min-[640px]:gap-3 min-[1024px]:gap-5">
        {all.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/purpose/${p.slug}/`} className="group block rounded-[1.125rem]">
              <span
                className="mat flex h-[4.5rem] items-center gap-3 px-5 text-ink [--mat-dir:90deg] min-[640px]:h-[clamp(19rem,34vw,27rem)] min-[640px]:flex-col min-[640px]:px-0 min-[640px]:py-5 min-[640px]:[--mat-dir:0deg]"
                style={{ "--mat": MATS[p.mat].bg, "--mat-deep": MATS[p.mat].deep, "--i": i } as React.CSSProperties}
              >
                <span aria-hidden="true" className="w-[4.75rem] shrink-0 font-num text-[1.1875rem] leading-none italic opacity-75 min-[640px]:w-auto min-[640px]:text-[clamp(0.9375rem,1.5vw,1.375rem)]">
                  {p.en}
                </span>
                <span className="serif flex-1 text-[0.9375rem] leading-[1.4] tracking-[0.02em] min-[640px]:mt-3 min-[640px]:flex-none min-[640px]:text-[clamp(0.9375rem,1.45vw,1.25rem)] min-[640px]:tracking-[0.14em] min-[640px]:[writing-mode:vertical-rl]">
                  {p.label}
                </span>
                <span className="flex shrink-0 items-baseline gap-0.5 text-[0.75rem] font-bold min-[640px]:mt-auto min-[640px]:flex-col min-[640px]:items-center min-[640px]:gap-1">
                  <span className="num text-[1.5rem]">{p.count}</span>人
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
