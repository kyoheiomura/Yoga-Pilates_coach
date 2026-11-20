import { AreaLinks } from "@/components/AreaLinks";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "エリアからヨガ・ピラティスインストラクターを探す",
  description: "取材したヨガ・ピラティスの先生を、都道府県・市区町村から探せます。",
  path: "/area/",
});

export default function AreaIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/area/", label: "エリアからさがす" }]}
        en="Area"
        title="エリアからさがす"
        lead="数字は、話を聞いた先生の人数です。数字のない都道府県は、これから取材します。"
      />
      <div className="container-page pt-12 pb-8 min-[768px]:pt-16">
        <div>
          <AreaLinks headingLevel="h2" />
        </div>
      </div>
    </>
  );
}
