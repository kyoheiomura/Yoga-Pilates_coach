import { findPurpose, MATS } from "@/data/vocab";

/** 目的のしるし（巻いたマットの丸＋名前）を並べる */
export function PurposeChips({ slugs, className = "" }: { slugs: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {slugs.map((slug) => {
        const p = findPurpose(slug);
        if (!p) return null;
        return (
          <li key={slug} className="mat-chip" style={{ "--mat": MATS[p.mat].bg } as React.CSSProperties}>
            {p.label}
          </li>
        );
      })}
    </ul>
  );
}
