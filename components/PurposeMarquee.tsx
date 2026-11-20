import Link from "next/link";
import { MATS, PURPOSES } from "@/data/vocab";

/**
 * 目的の英語名がゆっくり流れる帯。各語の前に、その目的のマットの色の丸（巻いたマット）を置く。
 * 帯の中身は2回並べてつなぎ目を消す。2回目は読み上げない。
 */
export function PurposeMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {PURPOSES.map((p) => (
        <li key={p.slug}>
          <Link href={`/purpose/${p.slug}/`} tabIndex={hidden ? -1 : undefined} className="group flex items-center gap-5 px-6 min-[768px]:gap-7 min-[768px]:px-9">
            <span
              aria-hidden="true"
              className="block size-5 rounded-full transition-transform duration-700 group-hover:scale-150 min-[768px]:size-7"
              style={{ background: `radial-gradient(circle, #fff8f6 0 20%, ${MATS[p.mat].bg} 22%)` }}
            />
            <span className="font-num text-[clamp(2.75rem,6.5vw,5.5rem)] leading-none italic text-ink/85 transition-colors duration-500 group-hover:text-accent">{p.en}</span>
            <span className="sr-only">（{p.label}）</span>
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="目的の一覧" className="marquee py-6 min-[768px]:py-9">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
