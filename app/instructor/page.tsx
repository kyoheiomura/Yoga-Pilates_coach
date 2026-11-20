import { PageHero } from "@/components/PageHero";
import { InstructorBrowser } from "@/components/InstructorBrowser";
import { getAreaTree } from "@/lib/areas-index";
import { getAllInstructors } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

export const metadata = pageMeta({
  title: "先生をさがす（ヨガ・ピラティスインストラクターのインタビュー一覧）",
  description:
    "取材したヨガ・ピラティスの先生の一覧です。目的・レッスンの種類・エリアで絞り込んで、気になる先生のインタビューを読めます。",
  path: "/instructor/",
});

export default function InstructorListPage() {
  const people = getAllInstructors().map(toSummary);
  const areas = getAreaTree().map((p) => ({
    slug: p.slug,
    name: p.name,
    cities: p.cities.map((c) => ({ slug: c.slug, name: c.name })),
  }));

  return (
    <>
      <PageHero
        crumbs={[{ href: "/instructor/", label: "先生をさがす" }]}
        en="Teachers"
        title="先生をさがす"
        lead={`${people.length}人のヨガ・ピラティスの先生に話を聞きました。目的やエリアで絞り込んで、気になる人から読んでみてください。`}
      />
      <div className="container-page pt-10 pb-8 min-[768px]:pt-14">
        <div>
          <InstructorBrowser people={people} areas={areas} />
        </div>
      </div>
    </>
  );
}
