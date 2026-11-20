import { PageHero } from "@/components/PageHero";
import { PurposeDirectory } from "@/components/PurposeDirectory";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "目的からヨガ・ピラティスインストラクターを探す",
  description: "取材したヨガ・ピラティスの先生を、肩・腰まわり、姿勢、リラックス、マタニティ・産後など、通う目的から探せます。",
  path: "/purpose/",
});

export default function PurposeIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/purpose/", label: "目的からさがす" }]}
        en="Purpose"
        title="目的からさがす"
        lead="通う目的ごとに、その相談をよく受けている先生をまとめています。数字は、話を聞いた先生の人数です。"
      />
      <div className="container-page pt-12 pb-8 min-[768px]:pt-16">
        <div>
          <PurposeDirectory headingLevel="h2" />
        </div>
      </div>
    </>
  );
}
