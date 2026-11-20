import Link from "next/link";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { AREA_INDEX_MIN } from "@/data/site";
import { pageMeta } from "@/lib/meta";
import { instructorsOfPurpose, getAllPurposes } from "@/lib/purposes-index";
import { toSummary } from "@/lib/view";

type Props = { params: Promise<{ purpose: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // まだ取材していない目的のページも作る（「これから取材します」と出す。少ないうちは noindex）
  return getAllPurposes().map((s) => ({ purpose: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { purpose: purposeSlug } = await params;
  const purpose = getAllPurposes().find((s) => s.slug === purposeSlug);
  if (!purpose) return {};
  return pageMeta({
    title: `「${purpose.label}」のヨガ・ピラティスインストラクターを探す`,
    description: `「${purpose.label}」という相談をよく受けているヨガ・ピラティスの先生のインタビュー。教え方と人柄を、本人の言葉で紹介しています。`,
    path: `/purpose/${purpose.slug}/`,
    // 薄いページを増やさないため、少ないうちはインデックスさせない
    noindex: purpose.count < AREA_INDEX_MIN,
  });
}

export default async function PurposePage({ params }: Props) {
  const { purpose: purposeSlug } = await params;
  const purpose = getAllPurposes().find((s) => s.slug === purposeSlug);
  if (!purpose) notFound();
  return (
    <ListPage
      crumbs={[
        { href: "/purpose/", label: "目的からさがす" },
        { href: `/purpose/${purpose.slug}/`, label: purpose.label },
      ]}
      en={purpose.en}
      title={purpose.label}
      lead={
        <p>
          {purpose.lead}
          レッスンの進め方も考え方も、先生によってさまざまです。それぞれのインタビューで確かめてください。
        </p>
      }
      mat={purpose.mat}
      people={instructorsOfPurpose(purpose.slug).map(toSummary)}
    >
      {purpose.count === 0 && (
        <div className="card p-8 text-center">
          <p className="font-bold">この目的の先生は、これから取材します。</p>
          <p className="mt-2 text-sm text-sub">
            <Link href="/instructor/" className="link">
              ほかの先生のインタビューを見る
            </Link>
          </p>
        </div>
      )}
    </ListPage>
  );
}
