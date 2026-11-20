import type { ReactNode } from "react";
import { type Crumb } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { InstructorGrid } from "@/components/InstructorCard";
import type { MatColor } from "@/data/vocab";
import type { InstructorSummary } from "@/lib/view";

/** 目的別・エリア別・場所別など、条件が決まった静的な一覧ページの共通の形 */
export function ListPage({
  crumbs,
  en,
  label,
  title,
  lead,
  people,
  mat,
  children,
}: {
  crumbs: Crumb[];
  /** 見出し帯の大きな欧文 */
  en: string;
  label?: string;
  title: string;
  lead: ReactNode;
  people: InstructorSummary[];
  /** 目的のページだけ：その目的のマットの色 */
  mat?: MatColor;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={crumbs} en={en} label={label} title={title} lead={lead} mat={mat} />
      <div className="container-page pt-12 pb-8 min-[768px]:pt-16">
        {children}
        <div className="mt-10 min-[768px]:mt-14">
          <InstructorGrid people={people} headingLevel="h2" priorityCount={2} />
        </div>
      </div>
    </>
  );
}
