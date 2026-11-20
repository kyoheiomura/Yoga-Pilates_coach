import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { InstructorGrid } from "@/components/InstructorCard";
import { RollMark } from "@/components/Logo";
import { MatRow } from "@/components/MatRow";
import { PurposeMarquee } from "@/components/PurposeMarquee";
import { SectionHead } from "@/components/SectionHead";
import { Story } from "@/components/Story";
import { Wave } from "@/components/Wave";
import { SITE } from "@/data/site";
import { STYLES } from "@/data/vocab";
import { getAreaTree } from "@/lib/areas-index";
import { getAllInstructors } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { toSummary } from "@/lib/view";

/*
 * トップは「この先生なら通えそう、と思える人に出会う」ページ。
 * 見出しとアーチの写真 → 目的の帯 → 物語の場面（スクロール連動）→ 目的のマット8枚 → 新着インタビュー
 * → 使い方（1〜3）→ 特徴 → エリア → 先生の方へ。
 */
export const metadata = pageMeta({ absoluteTitle: SITE.defaultTitle, path: "/" });

const PHOTO = {
  hero: "/images/top/hero.jpg",
  roll: "/images/top/roll.jpg",
  talk: "/images/top/talk.jpg",
  studio: "/images/top/studio.jpg",
};

/** 読み方。実際に順番のある手順なので番号を付ける */
const STEPS = [
  {
    verb: "読む",
    what: "先生のインタビュー",
    body: "先生になったきっかけ、初回の進め方、どんな人に来てほしいか。本人の言葉で、3つの章にまとめています。",
    icon: "book",
  },
  {
    verb: "確かめる",
    what: "初回の流れと料金",
    body: "初回の時間配分、運動量、料金、スタジオの場所と時間帯。通う前に知っておきたいことも、記事の中にまとめています。",
    icon: "list",
  },
  {
    verb: "体験に行く",
    what: "申し込みはスタジオへ",
    body: "会ってみたい先生が決まったら、記事の最後にあるスタジオの窓口から体験を申し込めます。",
    icon: "mat",
  },
] as const;

/** ここちの特徴 */
const FEATURES = [
  ["本人の言葉で、人柄が伝わる。", "先生になったきっかけや、レッスンで大切にしていること。経歴の紹介ではなく、その人の考え方がわかるインタビューです。"],
  ["通う前に知りたいことも、まとめて載せている。", "レッスンの運動量、初回の流れ、料金、スタジオの最寄り駅まで。体験を申し込む前に、通えそうかどうかを確かめられます。"],
  ["目的とエリアから、すぐに見つかる。", "肩・腰まわり、姿勢、リラックス、マタニティ・産後など8つの目的と、都道府県・市区町村から探せます。"],
];

export default function Home() {
  const all = getAllInstructors();
  const latest = all.slice(0, 3).map(toSummary);
  const prefs = getAreaTree();
  let ci = 0;

  return (
    <>
      {/* 見出しとアーチの写真 */}
      <section aria-labelledby="hero-title" className="relative isolate overflow-x-clip">
        {/* 背景の、大きくて淡い丸。文字と写真にかからない端に置く */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="hero-bloom absolute block top-[9%] -left-[5%] w-[clamp(9rem,17vw,19rem)] max-[1023px]:hidden" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="float-y block aspect-square rounded-full bg-[#e4f1f7]" style={{ "--i": 1 } as React.CSSProperties} />
          </span>
          <span className="hero-bloom absolute block bottom-[5%] left-[41%] w-[clamp(6rem,10vw,11rem)] max-[1023px]:hidden" style={{ "--i": 2 } as React.CSSProperties}>
            <span className="float-y block aspect-square rounded-full bg-[#fbf1d6]" style={{ "--i": 2 } as React.CSSProperties} />
          </span>
          <span className="hero-bloom absolute block -right-[12%] top-[58%] w-[clamp(8rem,14vw,15rem)] min-[1024px]:top-auto min-[1024px]:-right-[4%] min-[1024px]:bottom-[9%]" style={{ "--i": 3 } as React.CSSProperties}>
            <span className="float-y block aspect-square rounded-full bg-[#fde6e6]" style={{ "--i": 3 } as React.CSSProperties} />
          </span>
          <span className="hero-bloom absolute block top-[53%] left-[3%] w-[clamp(2.5rem,4vw,4.5rem)] min-[1024px]:top-[7%] min-[1024px]:left-[50%]" style={{ "--i": 4 } as React.CSSProperties}>
            <span className="float-y block aspect-square rounded-full bg-[#fbf1d6]" style={{ "--i": 4 } as React.CSSProperties} />
          </span>
          <span className="hero-bloom absolute block bottom-[20%] left-[5%] w-[clamp(2rem,3vw,3.5rem)]" style={{ "--i": 5 } as React.CSSProperties}>
            <span className="float-y block aspect-square rounded-full bg-[#fde6e6] max-[1023px]:hidden" style={{ "--i": 5 } as React.CSSProperties} />
          </span>
        </div>
        <div className="container-page relative grid items-center gap-14 pt-8 pb-12 min-[1024px]:min-h-[calc(100svh-4.5rem)] min-[1024px]:grid-cols-12 min-[1024px]:gap-6 min-[1024px]:pt-4 min-[1024px]:pb-20">
          <div className="min-[1024px]:col-span-7">
            <p aria-hidden="true" className="eyebrow hero-in flex items-center gap-3 whitespace-nowrap max-[639px]:!text-[1.0625rem] min-[640px]:gap-4">
              <span className="block h-px w-6 shrink-0 bg-brass-soft min-[640px]:w-10" />
              Interviews with yoga & pilates teachers
            </p>
            <h1 id="hero-title" className="serif mt-6 text-[clamp(2.375rem,6.4vw,5rem)] leading-[1.42] tracking-[0.03em]">
              {SITE.tagline.map((l) => (
                <span key={l} className="block whitespace-nowrap">
                  {[...l].map((ch) => (
                    <span key={ci} className={`hero-char ${ch === "「" ? "-ml-[0.5em]" : ""}`} style={{ "--i": ci++ } as React.CSSProperties}>
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="hero-in mt-8 max-w-[29rem] space-y-1 text-[0.9375rem] leading-[2.15] text-sub min-[768px]:text-[1rem]" style={{ "--i": 5 } as React.CSSProperties}>
              <p>
                <Phrases parts={["はじめてのスタジオは、", "どんな先生がいるのか", "分からなくて不安なもの。"]} />
              </p>
              <p>
                <Phrases parts={[`${SITE.name}は、`, "ヨガ・ピラティスの", "先生本人に話を聞いて、", "教え方と人柄を", "読めるようにした", "メディアです。"]} />
              </p>
            </div>
            <p className="hero-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ "--i": 7 } as React.CSSProperties}>
              <Link href="/instructor/" className="btn-primary">
                先生をさがす
              </Link>
              <Link href="#purpose-title" className="link-quiet">
                目的からさがす
              </Link>
            </p>
          </div>

          <div aria-hidden="true" className="relative mx-auto w-[min(68vw,21rem)] min-[1024px]:col-span-5 min-[1024px]:mr-[6%] min-[1024px]:w-[min(88%,26rem)]">
            {/* うしろの、ごく淡い光 */}
            <span className="hero-bloom absolute -inset-[24%] block rounded-full bg-[radial-gradient(closest-side,var(--color-accent-soft),transparent)]" />
            {/* 水色の丸。写真のうしろから少しのぞく */}
            <div className="hero-bloom absolute -top-[6%] -right-[14%] w-[42%]" style={{ "--i": 1 } as React.CSSProperties}>
              <span className="float-y block aspect-square rounded-full bg-[#d6eaf3]" />
            </div>
            {/* 写真から少しずらした、細い線のアーチ */}
            <span className="hero-bloom arch absolute -top-[3.5%] bottom-[3.5%] left-[5.5%] -right-[5.5%] block border border-brass-soft" style={{ "--i": 2 } as React.CSSProperties} />
            <div data-p="view" className="par-y relative [--par:-70px]">
              <div className="hero-arch arch relative aspect-[4/5] bg-blush">
                <span className="zoom-in absolute inset-0 block">
                  <Image src={PHOTO.hero} alt="" fill priority sizes="(min-width: 1024px) 416px, 68vw" className="object-cover" />
                </span>
              </div>
            </div>
            <div data-p="view" className="par-y absolute -bottom-[6%] -left-[17%] w-[40%] [--par:-150px]">
              <div className="hero-bloom" style={{ "--i": 3 } as React.CSSProperties}>
                <div className="float-y relative aspect-square overflow-clip rounded-full border-[6px] border-paper">
                  <Image src={PHOTO.roll} alt="" fill sizes="170px" className="object-cover" />
                </div>
              </div>
            </div>
            {/* 写真の右に添える、縦の欧文 */}
            <p className="eyebrow hero-in absolute top-[38%] -right-[15%] hidden min-[1024px]:flex items-center gap-3 !text-[0.8125rem] tracking-[0.16em] [writing-mode:vertical-rl]" style={{ "--i": 8 } as React.CSSProperties}>
              <span className="block h-9 w-px bg-brass-soft" />
              Find your teacher
            </p>
          </div>

          {/* 下へ続く合図 */}
          <p aria-hidden="true" className="hero-in pointer-events-none absolute inset-x-0 bottom-7 hidden items-center gap-4 [padding-inline:inherit] min-[1024px]:flex [@media(max-height:720px)]:!hidden" style={{ "--i": 10 } as React.CSSProperties}>
            <span className="eyebrow !text-[0.8125rem] tracking-[0.16em]">Scroll</span>
            <span className="scroll-cue relative block h-px w-16 overflow-clip bg-brass-soft" />
          </p>
        </div>
        <PurposeMarquee />
      </section>

      {/* 物語の場面：スクロールで入れ替わる */}
      <Story people={latest.slice(0, 2)} />

      {/* 目的のマット8枚 */}
      <section aria-labelledby="purpose-title" className="relative mt-[clamp(2rem,5vw,4.5rem)] scroll-mt-20 bg-chalk py-20 min-[768px]:py-28">
        <Wave side="top" />
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="purpose-title" en="Find by purpose" ja="目的からさがす" />
            <p className="reveal-fade max-w-[22rem] text-[0.875rem] leading-[2] text-sub">マットを選ぶと、その相談をよく受けている先生が並びます。数字は、話を聞いた先生の人数です。</p>
          </div>
          <div className="mt-12 min-[768px]:mt-16">
            <MatRow />
          </div>
          <div className="rise mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 min-[768px]:mt-16">
            <p className="serif text-[1rem]">レッスンの種類から</p>
            <ul className="flex flex-wrap gap-2">
              {STYLES.map((st) => (
                <li key={st}>
                  <Link
                    href={`/instructor/?style=${encodeURIComponent(st)}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-paper px-5 text-[0.875rem] font-bold transition-[background-color,color,transform] duration-500 hover:-translate-y-0.5 hover:bg-accent hover:text-white"
                  >
                    {st}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Wave side="bottom" />
      </section>

      {/* 新着インタビュー */}
      <section aria-labelledby="latest-title" className="relative mt-[clamp(2rem,5vw,4.5rem)] overflow-x-clip py-20 min-[768px]:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="latest-title" en="New interviews" ja="新しいインタビュー" />
            <Link href="/instructor/" className="link-quiet">
              {all.length}人すべてを見る
            </Link>
          </div>
          <div className="mt-14 min-[768px]:mt-20">
            <InstructorGrid people={latest} priorityCount={0} />
          </div>
        </div>
      </section>

      {/* 使い方：1 → 2 → 3 を1本の線でつなぐ */}
      <section aria-labelledby="steps-title" className="relative bg-chalk py-20 min-[768px]:py-28">
        <Wave side="top" />
        <div className="container-page">
          <SectionHead id="steps-title" en="How to use" ja={`${SITE.name}の使い方`} center />
          <div data-p="view" className="relative mt-14 min-[768px]:mt-20">
            {/* 3つをつなぐ波線。スクロールに合わせて描かれる */}
            <svg aria-hidden="true" viewBox="0 0 1000 80" preserveAspectRatio="none" className="draw-scroll pointer-events-none absolute top-10 left-[8%] hidden h-20 w-[84%] min-[768px]:block" fill="none">
              <path pathLength="1" d="M0 40c80-50 170-50 250 0s170 50 250 0 170-50 250 0 170 50 250 0" stroke="#e6a3ab" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" />
            </svg>
            <ol className="relative grid gap-12 min-[768px]:grid-cols-3 min-[768px]:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.verb} className="rise text-center">
                  <div className="draw-path relative mx-auto flex size-40 items-center justify-center rounded-full bg-paper text-accent">
                    <StepIcon name={s.icon} />
                    <span aria-hidden="true" className="pop-num num-outline absolute -top-3 -left-1 text-[4.5rem]">
                      {i + 1}
                    </span>
                  </div>
                  <p className="serif mt-7 text-[1.625rem]">{s.verb}</p>
                  <p className="mt-1 text-[0.8125rem] font-bold tracking-[0.1em] text-accent">{s.what}</p>
                  <p className="mx-auto mt-4 max-w-[19rem] text-left text-[0.9375rem] leading-[2.1]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <Wave side="bottom" />
      </section>

      {/* 特徴：写真と3つの見出し */}
      <section aria-labelledby="why-title" className="relative mt-[clamp(2rem,5vw,4.5rem)] overflow-x-clip py-20 min-[768px]:py-28">
        <div className="container-page grid gap-14 min-[1024px]:grid-cols-12 min-[1024px]:items-center min-[1024px]:gap-16">
          <div aria-hidden="true" className="relative min-[1024px]:col-span-5">
            <div className="wipe relative aspect-[4/5] overflow-clip rounded-[3rem] bg-blush min-[1024px]:rounded-[4rem]">
              <span data-p="view" className="par-zoom absolute inset-0 block">
                <Image src={PHOTO.talk} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </span>
            </div>
            <div className="absolute -right-4 -bottom-10 w-[46%] min-[768px]:-right-10">
              <div className="rise relative aspect-square overflow-clip rounded-full border-[6px] border-paper">
                <Image src={PHOTO.studio} alt="" fill sizes="240px" className="object-cover" />
              </div>
            </div>
            <span className="morph absolute -top-8 -left-8 -z-10 block size-40 bg-butter" />
          </div>
          <div className="min-[1024px]:col-span-7">
            <SectionHead id="why-title" en={`Why ${SITE.nameEn}`} ja={`${SITE.name}の特徴`} />
            <ul className="mt-10 min-[768px]:mt-14">
              {FEATURES.map(([t, d]) => (
                <li key={t} className="rise draw-top border-t border-line py-8 last:border-b min-[768px]:py-9">
                  <h3 className="serif flex gap-3 text-[1.25rem] leading-[1.7] min-[768px]:text-[1.5rem]">
                    <RollMark className="mt-[0.35em] size-6" />
                    {t}
                  </h3>
                  <p className="mt-3 pl-9 text-[0.9375rem] leading-[2.1] text-sub">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* エリア。県名を大きな欧文で */}
      <section aria-labelledby="area-title" className="relative overflow-x-clip bg-chalk py-20 min-[768px]:py-28">
        <Wave side="top" />
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="area-title" en="Find by area" ja="エリアからさがす" />
            <Link href="/area/" className="link-quiet">
              47都道府県の一覧を見る
            </Link>
          </div>
          <ul className="mt-12 min-[768px]:mt-16">
            {prefs.map((p) => (
              <li key={p.slug} className="rise group relative mt-3 grid items-center gap-x-8 gap-y-2 rounded-[2rem] bg-paper px-6 py-6 transition-[transform,box-shadow] duration-700 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgb(179_86_106/0.7)] min-[768px]:grid-cols-12 min-[768px]:rounded-full min-[768px]:px-12 min-[768px]:py-7">
                <span aria-hidden="true" className="font-num text-[clamp(2.75rem,6vw,4.75rem)] leading-[0.9] italic text-brass capitalize transition-colors duration-500 group-hover:text-accent min-[768px]:col-span-5">
                  {p.slug}
                </span>
                <p className="flex items-baseline gap-4 min-[768px]:col-span-3">
                  <Link href={`/area/${p.slug}/`} className="serif text-[1.375rem] after:absolute after:inset-0 after:content-['']">
                    {p.name}
                  </Link>
                  <span className="text-[0.8125rem] text-sub">
                    <span className="num mr-0.5 text-[1.5rem] text-ink">{p.count}</span>人
                  </span>
                </p>
                <p className="relative z-10 flex flex-wrap gap-x-4 gap-y-1 text-[0.875rem] min-[768px]:col-span-4 min-[768px]:justify-end">
                  {p.cities.map((c) => (
                    <Link key={c.slug} href={`/area/${p.slug}/${c.slug}/`} className="link">
                      {c.name}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <Wave side="bottom" />
      </section>

      {/* 先生向けの案内 */}
      <section aria-labelledby="join-title" className="container-page mt-[clamp(2rem,5vw,4.5rem)] pt-20 min-[768px]:pt-28">
        <div className="rise relative isolate overflow-clip rounded-[2.5rem] bg-accent-soft px-7 py-14 text-center min-[768px]:rounded-[4rem] min-[768px]:px-16 min-[768px]:py-20">
          <span aria-hidden="true" className="morph absolute -top-16 -left-16 -z-10 block size-64 bg-blush" />
          <span aria-hidden="true" className="morph absolute -right-20 -bottom-24 -z-10 block size-80 bg-butter/70 [animation-delay:-8s]" />
          <p aria-hidden="true" data-p="view" className="display-en par-x par-stop !text-[clamp(3rem,8vw,6.5rem)] whitespace-nowrap [--par:18vw]">
            For teachers
          </p>
          <h2 id="join-title" className="serif mt-4 text-[1.375rem] leading-[1.7] min-[768px]:text-[1.875rem]">
            <Phrases parts={["ヨガ・ピラティスを", "教えている先生の方へ"]} />
          </h2>
          <p className="mx-auto mt-5 max-w-[30rem] text-[0.9375rem] leading-[2.1] text-sub">取材を受けていただける先生を探しています。取材の流れと、載せる内容をまとめました。</p>
          <p className="mt-9">
            <Link href="/join/" className="btn-primary">
              掲載について読む
            </Link>
          </p>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: `${SITE.name} ${SITE.kind}`,
          url: `${SITE.url}/`,
          description: SITE.description,
          inLanguage: "ja",
        }}
      />
    </>
  );
}

/** 使い方の線画。画面に入ると、線が描かれる（pathLength="1"） */
function StepIcon({ name }: { name: "book" | "list" | "mat" }) {
  const common = { pathLength: 1, fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg aria-hidden="true" viewBox="0 0 80 80" className="size-20">
      {name === "book" && (
        <>
          <path {...common} d="M40 24c-7-5-16-6-26-5v36c10-1 19 0 26 5 7-5 16-6 26-5V19c-10-1-19 0-26 5z" />
          <path {...common} d="M40 24v36M22 30c4 0 8 .6 11 2M22 39c4 0 8 .6 11 2M58 30c-4 0-8 .6-11 2M58 39c-4 0-8 .6-11 2" style={{ "--d": 3 } as React.CSSProperties} />
        </>
      )}
      {name === "list" && (
        <>
          <path {...common} d="M24 16h32a4 4 0 0 1 4 4v42a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z" />
          <path {...common} d="M28 31l3 3 6-7M44 31h9M28 45l3 3 6-7M44 45h9M28 57h25" style={{ "--d": 3 } as React.CSSProperties} />
        </>
      )}
      {name === "mat" && (
        <>
          <path {...common} d="M14 50c0-7 5-12 12-12h34c4 0 7 3 7 7s-3 7-7 7H26" />
          <path {...common} d="M26 52c-3 0-5-2-5-5s3-5 6-4 3 6-1 6M60 38V26c0-4-3-7-7-7H20" style={{ "--d": 3 } as React.CSSProperties} />
        </>
      )}
    </svg>
  );
}

/** 文節ごとにまとめて、文節の途中で改行しないようにする */
function Phrases({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((t, i) => (
        <span key={i} className="inline-block">
          {t}
        </span>
      ))}
    </>
  );
}
