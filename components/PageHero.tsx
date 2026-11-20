import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Wave } from "@/components/Wave";
import { MATS, type MatColor } from "@/data/vocab";

/**
 * 内側のページの見出し帯。淡いピンクの面に、大きな欧文のイタリック（読み上げない）→ Klee の h1 → 導入文。
 * 右奥に、形がゆっくり変わる丸を置く。目的のページでは、その目的のマットの色になる。
 */
export function PageHero({
  crumbs,
  en,
  title,
  lead,
  mat,
  children,
}: {
  crumbs: Crumb[];
  en: string;
  /** 以前の見出し帯にあった小さなラベル。いまは出さない */
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  mat?: MatColor;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate mb-[clamp(2rem,5vw,4.5rem)] bg-chalk">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
        <span className="absolute top-16 -right-24 block size-[13rem] opacity-60 min-[768px]:top-1/2 min-[768px]:right-[6%] min-[768px]:size-[24rem] min-[768px]:-translate-y-1/2 min-[768px]:opacity-100">
          <span className="hero-bloom block size-full">
            <span className="morph block size-full" style={{ background: mat ? MATS[mat].bg : "var(--color-blush)", opacity: mat ? 0.75 : 0.8 }} />
          </span>
        </span>
        <span className="float-y absolute top-[18%] right-[38%] hidden size-5 rounded-full bg-butter min-[768px]:block" />
        <span className="float-y absolute right-[10%] bottom-[16%] hidden size-3 rounded-full bg-sage min-[768px]:block" style={{ "--i": 2 } as React.CSSProperties} />
      </div>
      <Breadcrumbs items={crumbs} />
      <div className="container-page pt-10 pb-14 min-[768px]:pt-14 min-[768px]:pb-20">
        <p aria-hidden="true" className="display-en hero-in max-w-[60rem]">
          {en}
        </p>
        <h1 className="serif hero-in mt-5 max-w-[40rem] text-[1.75rem] leading-[1.6] min-[768px]:text-[2.375rem]" style={{ "--i": 1 } as React.CSSProperties}>
          {title}
        </h1>
        {lead && (
          <div className="hero-in mt-5 max-w-[36rem] text-[0.9375rem] leading-[2.1] text-sub" style={{ "--i": 2 } as React.CSSProperties}>
            {lead}
          </div>
        )}
        {children}
      </div>
      <Wave side="bottom" />
    </section>
  );
}
