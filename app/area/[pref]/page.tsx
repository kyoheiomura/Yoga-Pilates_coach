import Link from "next/link";
import { notFound } from "next/navigation";
import { ListPage } from "@/components/ListPage";
import { AREA_INDEX_MIN } from "@/data/site";
import { getAllPrefs, instructorsInPref } from "@/lib/areas-index";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

type Props = { params: Promise<{ pref: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // 47都道府県すべてのページを作る（まだ取材していない県は「これから取材します」と出す。少ないうちは noindex）
  return getAllPrefs().map((p) => ({ pref: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { pref: prefSlug } = await params;
  const pref = getAllPrefs().find((p) => p.slug === prefSlug);
  if (!pref) return {};
  return pageMeta({
    title: `${pref.name}のヨガ・ピラティスインストラクター`,
    description: `${pref.name}のヨガ・ピラティスの先生のインタビュー。教え方と人柄から、習う先生を選べます。`,
    path: `/area/${pref.slug}/`,
    noindex: pref.count < AREA_INDEX_MIN,
  });
}

export default async function PrefPage({ params }: Props) {
  const { pref: prefSlug } = await params;
  const pref = getAllPrefs().find((p) => p.slug === prefSlug);
  if (!pref) notFound();
  return (
    <ListPage
      crumbs={[
        { href: "/area/", label: "エリアからさがす" },
        { href: `/area/${pref.slug}/`, label: pref.name },
      ]}
      en={pref.slug.charAt(0).toUpperCase() + pref.slug.slice(1)}
      title={`${pref.name}の先生`}
      lead={pref.count > 0 ? <p>{pref.name}で話を聞いたヨガ・ピラティスの先生は{pref.count}人です（新着順）。</p> : <p>{pref.name}のヨガ・ピラティスの先生を紹介するページです。</p>}
      people={instructorsInPref(pref.slug).map(toSummary)}
    >
      <ul className="flex flex-wrap gap-2">
        {pref.cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/area/${pref.slug}/${c.slug}/`}
              className="inline-flex min-h-11 items-center rounded-full bg-chalk px-5 text-sm font-bold transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {c.name}
              <span className="ml-1 opacity-70">（{c.count}）</span>
            </Link>
          </li>
        ))}
      </ul>
      {pref.count === 0 && (
        <div className="card mt-4 p-8 text-center">
          <p className="font-bold">{pref.name}の先生は、これから取材します。</p>
          <p className="mt-2 text-sm text-sub">
            <Link href="/instructor/" className="link">
              ほかのエリアの先生を見る
            </Link>
          </p>
        </div>
      )}
    </ListPage>
  );
}
