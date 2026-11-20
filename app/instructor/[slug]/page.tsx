import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareFieldsList } from "@/components/CompareFieldsList";
import { InstructorGrid } from "@/components/InstructorCard";
import { JsonLd } from "@/components/JsonLd";
import { Wave } from "@/components/Wave";
import { SITE } from "@/data/site";
import { findPurpose, MATS } from "@/data/vocab";
import { getAllInstructors, getInstructor, venuesOf } from "@/lib/content";
import { chaptersOf, renderInterview } from "@/lib/mdx";
import { pageMeta } from "@/lib/meta";
import { areaOf, formatDate, formatMonth, formatYen, hoursLabel, purposesLabel, stationLabel, toCompareData, toSummary } from "@/lib/view";

/*
 * 先生の取材記事。上から、
 *   見出し（アーチの写真・名前・一言・導入文）→ 目次 → 章ごとの質問と答え
 *   → 教え方のまとめ → レッスンを受けるには（場所・料金・申し込み）
 * の順。記事が主役で、まとめと連絡先は読み終えたあとに置く。
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInstructors().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getInstructor((await params).slug);
  if (!s) return {};
  const area = areaOf(venuesOf(s)[0]);
  return pageMeta({
    title: `${s.name}さんの取材記事（${s.styles.join("・")}のインストラクター／${area.label}）`,
    description: s.lead ?? `${area.fullLabel}で${s.styles.join("・")}を教える${s.name}さんの取材記事。${s.compare.belief}`,
    path: `/instructor/${s.slug}/`,
    ogType: "article",
  });
}

export default async function InstructorPage({ params }: Props) {
  const s = getInstructor((await params).slug);
  if (!s) notFound();

  const venues = venuesOf(s);
  const main = areaOf(venues[0]);
  const data = toCompareData(s);
  const chapters = chaptersOf(s.body);
  const interview = await renderInterview(s.body);
  const purpose = findPurpose(s.purposes[0]);
  const station = venues[0].stations[0];
  const mat = MATS[data.mat];

  // 「おすすめ」ではなく、同じ地域で話を聞いた先生を新着順に。いなければ、ほかの先生を新着順に
  const others = getAllInstructors().filter((o) => o.slug !== s.slug);
  const sameCity = others.filter((o) => toSummary(o).citySlugs.some((c) => data.citySlugs.includes(c)));
  const samePref = others.filter((o) => toSummary(o).prefSlug === main.pref.slug);
  const relatedTitle = sameCity.length || samePref.length ? "同じエリアで話を聞いた先生" : "ほかの先生のインタビュー";
  const related = (sameCity.length ? sameCity : samePref.length ? samePref : others).slice(0, 3).map(toSummary);
  let ci = 0;

  return (
    <>
      <section className="relative mb-[clamp(2rem,5vw,4.5rem)] bg-chalk">
        <Breadcrumbs
          items={[
            ...(purpose ? [{ href: `/purpose/${purpose.slug}/`, label: purpose.label }] : []),
            { href: `/instructor/${s.slug}/`, label: `${s.name}さん` },
          ]}
        />
        <header className="container-page grid items-center gap-10 pt-8 pb-14 min-[768px]:grid-cols-12 min-[768px]:gap-14 min-[768px]:pt-12 min-[768px]:pb-20">
          <div className="relative mx-auto w-[min(76vw,22rem)] min-[768px]:col-span-5 min-[768px]:w-full">
            <span aria-hidden="true" className="hero-bloom absolute -inset-[9%] block">
              <span className="morph block size-full" style={{ background: mat.bg, opacity: 0.7 }} />
            </span>
            <div data-p="view" className="par-y relative [--par:-50px]">
              <div className="hero-arch arch relative aspect-[4/5]" style={{ background: mat.bg }}>
                <span className="zoom-in absolute inset-0 block">
                  <Image src={s.photo.src} alt={s.photo.alt} fill priority sizes="(min-width: 768px) 40vw, 76vw" className="object-cover" />
                </span>
              </div>
            </div>
            <span aria-hidden="true" className="hero-bloom absolute -right-3 -bottom-5 block size-20" style={{ "--i": 2 } as React.CSSProperties}>
              <span className="float-y block size-full rounded-full border-[5px] border-chalk" style={{ background: `repeating-radial-gradient(circle, ${mat.bg} 0 4px, ${mat.deep} 4px 5px)` }} />
            </span>
          </div>
          <div className="flex flex-col min-[768px]:col-span-7">
            <p aria-hidden="true" className="eyebrow hero-in">
              Interview
            </p>
            <div className="hero-in mt-4 flex flex-wrap items-center gap-2" style={{ "--i": 1 } as React.CSSProperties}>
              {s.styles.map((st) => (
                <span key={st} className="rounded-full bg-paper px-3.5 text-[0.8125rem] leading-[2.1] font-bold">
                  {st}
                </span>
              ))}
              {/* 有料掲載は必ず明示する。表示順には影響しない */}
              {s.listing === "paid" && <span className="badge">掲載プラン利用</span>}
            </div>
            <h1 className="serif mt-5 leading-[1.3]">
              <span className="block text-[2.75rem] tracking-[0.1em] min-[768px]:text-[4rem]">
                {[...s.name].map((ch) => (
                  <span key={ci} className="hero-char" style={{ "--i": ci++ } as React.CSSProperties}>
                    {ch === " " || ch === "　" ? " " : ch}
                  </span>
                ))}
              </span>
              <span className="hero-in mt-2 block font-sans text-[0.9375rem] font-bold tracking-[0.14em] text-sub" style={{ "--i": 3 } as React.CSSProperties}>
                さんの取材記事
              </span>
            </h1>
            <p className="hero-in mt-5 text-[0.9375rem] font-bold" style={{ "--i": 4 } as React.CSSProperties}>
              {venues.map((c) => c.name).join("／")}
              <span className="ml-2 text-[0.8125rem] font-medium text-sub">
                （{main.label}／{station.name}駅）
              </span>
            </p>
            <p className="serif hero-in relative mt-8 rounded-[2rem] bg-paper px-7 py-6 text-[1.25rem] leading-[1.8] min-[768px]:text-[1.625rem]" style={{ "--i": 5 } as React.CSSProperties}>
              <span className="-ml-[0.5em]">「</span>
              {s.catchphrase}」
            </p>
            {s.lead && (
              <p className="hero-in mt-7 text-[0.9375rem] leading-[2.15]" style={{ "--i": 6 } as React.CSSProperties}>
                {s.lead}
              </p>
            )}
            <p className="mt-6 text-xs leading-[1.9] text-sub">
              取材日 {formatDate(s.interviewedAt)}／聞き手 {s.interviewer}
              {s.photographer && `／撮影 ${s.photographer}`}／最終更新日 {formatDate(s.updatedAt ?? s.publishedAt)}
            </p>
          </div>
        </header>
        <Wave side="bottom" />
      </section>

      <article aria-label={`${s.name}さんの取材記事の本文`} className="container-page pt-8">
        <div className="mx-auto max-w-[44rem]">
          {chapters.length > 0 && (
            <nav aria-labelledby="toc" className="rise rounded-[2rem] bg-chalk px-7 py-8 min-[768px]:px-10 min-[768px]:py-10">
              <p id="toc" className="flex items-baseline gap-4">
                <span aria-hidden="true" className="eyebrow">
                  Contents
                </span>
                <span className="serif text-[1rem]">この記事の目次</span>
              </p>
              <ol className="mt-5 space-y-3">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="group flex gap-4 text-[0.9375rem] leading-[1.8] font-bold [word-break:auto-phrase]">
                      <span className="w-6 shrink-0 font-num text-[1.5rem] leading-[1.15] font-normal italic text-brass">{Number(c.no)}</span>
                      <span className="underline decoration-transparent transition-colors duration-300 group-hover:text-accent group-hover:decoration-current">{c.title}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#fields" className="group flex gap-4 text-[0.9375rem] leading-[1.8] font-bold [word-break:auto-phrase]">
                    <span aria-hidden="true" className="w-6 shrink-0 text-brass">
                      ＋
                    </span>
                    <span className="underline decoration-transparent transition-colors duration-300 group-hover:text-accent group-hover:decoration-current">
                      {s.name}さんの教え方・レッスンを受けるには
                    </span>
                  </a>
                </li>
              </ol>
            </nav>
          )}

          <div className="interview mt-14 min-[768px]:mt-20">{interview}</div>
          <div className="clear-both" />
        </div>

        <section id="fields" aria-labelledby="fields-title" className="mx-auto max-w-[54rem] scroll-mt-24 pt-24 min-[768px]:pt-32">
          <h2 id="fields-title" className="reveal">
            <span aria-hidden="true" className="display-en block !text-[clamp(3rem,7vw,5.5rem)]">
              Profile
            </span>
            <span className="serif mt-3 block text-[1.5rem] min-[768px]:text-[2rem]">{s.name}さんの教え方</span>
          </h2>
          <p className="mt-3 text-[0.875rem] text-sub">声のかけ方、レッスンの運動量、初回の流れ、料金など、会う前に知っておきたいことをまとめています。</p>
          <div className="mt-8">
            <CompareFieldsList data={data} />
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-[54rem] scroll-mt-24 pt-20 min-[768px]:pt-28">
          <h2 id="visit-title" className="reveal">
            <span aria-hidden="true" className="display-en block !text-[clamp(3rem,7vw,5.5rem)]">
              Visit
            </span>
            <span className="serif mt-3 block text-[1.5rem] min-[768px]:text-[2rem]">{s.name}さんのレッスンを受けるには</span>
          </h2>
          <div className={`mt-8 grid gap-5 ${venues.length > 1 ? "min-[768px]:grid-cols-2" : ""}`}>
            {venues.map((c, i) => (
              <section key={c.slug} aria-labelledby={`venue-${c.slug}`} className="rise rounded-[2rem] bg-chalk p-7 min-[768px]:p-9">
                <h3 id={`venue-${c.slug}`} className="serif text-[1.25rem]">
                  <Link href={`/studio/${c.slug}/`} className="underline decoration-brass-soft decoration-2 transition-colors duration-300 hover:text-accent">
                    {c.name}
                  </Link>
                  {s.venues[i].days && <span className="badge ml-2 align-middle">{s.venues[i].days}に担当</span>}
                </h3>
                <dl className="mt-4 space-y-2.5 text-sm leading-[1.9]">
                  <Row label="場所">
                    {areaOf(c).fullLabel}
                    {c.address.line}
                    {c.address.building && ` ${c.address.building}`}
                  </Row>
                  <Row label="最寄り駅">{stationLabel(c)}</Row>
                  <Row label="時間帯">
                    {hoursLabel(c)}
                    {c.hoursNote && <span className="block text-sub">{c.hoursNote}</span>}
                  </Row>
                  {i === 0 && (
                    <Row label="料金（税込）">
                      体験 {formatYen(s.compare.price.trial)}／通常 1回 {formatYen(s.compare.price.regular)}
                      {s.compare.price.admission !== undefined && `／入会金 ${formatYen(s.compare.price.admission)}`}
                      {s.compare.price.note && <span className="block text-sub">{s.compare.price.note}</span>}
                    </Row>
                  )}
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  {c.booking.url && (
                    <a href={c.booking.url} target="_blank" rel="noopener" className="btn-outline">
                      公式サイトで申し込み方法を見る<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                  {c.booking.phone && (
                    <a href={`tel:${c.booking.phone}`} className="btn-outline">
                      電話する（{c.booking.phone}）
                    </a>
                  )}
                  {c.booking.line && (
                    <a href={c.booking.line} target="_blank" rel="noopener" className="btn-outline">
                      LINEで問い合わせる<span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  )}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-4 text-xs text-sub">体験や入会の申し込みは、それぞれの窓口で受け付けています。</p>
        </section>

        <footer className="mx-auto max-w-[54rem] pt-10">
          <div className="space-y-1.5 rounded-[1.5rem] border border-line p-5 text-xs leading-[1.9] text-sub min-[768px]:p-6">
            <p>掲載している情報は{formatMonth(s.verifiedAt)}に確認したものです。料金や時間帯は変わることがあります。</p>
            <p>体の変わり方には個人差があります。持病や痛みがあるとき、妊娠中や出産後など体調に不安があるときは、先に医療機関に相談してください。</p>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-page pt-24 min-[768px]:pt-36">
          <h2 id="related" className="reveal">
            <span aria-hidden="true" className="display-en block !text-[clamp(3rem,7vw,5.5rem)]">
              More interviews
            </span>
            <span className="serif mt-3 block text-[1.5rem] min-[768px]:text-[2rem]">{relatedTitle}</span>
          </h2>
          <div className="mt-12">
            <InstructorGrid people={related} />
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${s.name}さんの取材記事「${s.catchphrase}」`,
          datePublished: s.publishedAt.toISOString(),
          dateModified: (s.updatedAt ?? s.publishedAt).toISOString(),
          image: `${SITE.url}${s.photo.src}`,
          inLanguage: "ja",
          author: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          publisher: { "@type": "Organization", name: SITE.name, url: `${SITE.url}/` },
          mainEntityOfPage: `${SITE.url}/instructor/${s.slug}/`,
          about: {
            "@type": "Person",
            name: s.name,
            jobTitle: `${s.styles.join("・")}インストラクター`,
            knowsAbout: purposesLabel(s.purposes),
            hasCredential: s.qualifications.map((l) => ({ "@type": "EducationalOccupationalCredential", name: l })),
            worksFor: venues.map((c) => ({
              "@type": "ExerciseGym",
              name: c.name,
              url: `${SITE.url}/studio/${c.slug}/`,
            })),
          },
        }}
      />
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <dt className="font-bold text-accent-deep">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
