import Link from "next/link";
import { MATS } from "@/data/vocab";
import { getAllPurposes } from "@/lib/purposes-index";

/**
 * 目的の一覧（/purpose/）。マットの色の帯・目的・ひとこと・人数。
 * まだ取材していない目的も載せる（人数の代わりに「これから」と出す）。
 */
export function PurposeDirectory({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-5 min-[640px]:grid-cols-2">
      {getAllPurposes().map((p) => {
        const c = MATS[p.mat];
        return (
          <li key={p.slug} className="rise">
            <Link
              href={`/purpose/${p.slug}/`}
              className="group flex h-full gap-5 rounded-[2rem] bg-white p-5 shadow-[0_18px_40px_-30px_rgb(179_86_106/0.6)] transition-transform duration-700 ease-[var(--ease-soft)] hover:-translate-y-1.5 min-[768px]:p-7"
            >
              <span
                aria-hidden="true"
                className="w-5 shrink-0 rounded-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-y-110 min-[768px]:w-6"
                style={{ background: `repeating-linear-gradient(0deg, rgb(255 255 255 / 0.35) 0 1px, transparent 1px 6px), ${c.bg}` }}
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <Heading className="serif text-[1.125rem] transition-colors duration-300 group-hover:text-accent min-[768px]:text-[1.25rem]">{p.label}</Heading>
                  <span className="shrink-0 text-sm font-bold text-sub">
                    {p.count > 0 ? (
                      <>
                        <span className="num mr-0.5 text-[1.5rem] text-ink">{p.count}</span>人
                      </>
                    ) : (
                      <span className="text-xs">これから取材します</span>
                    )}
                  </span>
                </span>
                <span className="mt-1.5 block text-[0.875rem] leading-[1.8] text-sub">{p.lead}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
