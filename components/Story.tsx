import Image from "next/image";
import Link from "next/link";
import { MATS } from "@/data/vocab";
import type { InstructorSummary } from "@/lib/view";

/**
 * トップの「物語」の場面。画面に貼りついた舞台の上で、スクロールに合わせて
 *   1. 先生によってレッスンは変わる → 2・3. 実際の先生2人の言葉と写真 → 4. だから本人の話を読む
 * の順に場面が入れ替わる。床にはマットが広がっていき、道具（リング・ブロック・ボール）が横切る。
 * 場面の出入りは globals.css が --p（components/ScrollProgress.tsx）から計算する。
 * JS が動かないとき・動きを減らす設定のときは、上から順に並んだふつうの文章になる。
 */
export function Story({ people }: { people: InstructorSummary[] }) {
  const [a, b] = people;
  return (
    <section aria-labelledby="story-title" data-p="pin" className="story relative">
      <div className="story-stage">
        {/* 横切る道具（飾り） */}
        <span aria-hidden="true" className="story-prop size-24 rounded-full border-[10px] border-brass-soft min-[768px]:size-36" style={{ "--x": "8%", "--y": "46%", "--dy": "150vh", "--rot": "140deg" } as React.CSSProperties} />
        <span aria-hidden="true" className="story-prop h-12 w-20 rounded-xl bg-butter min-[768px]:h-16 min-[768px]:w-28" style={{ "--x": "78%", "--y": "30%", "--dy": "210vh", "--dx": "10vw", "--rot": "-200deg" } as React.CSSProperties} />
        <span aria-hidden="true" className="story-prop size-10 rounded-full bg-sage/70 min-[768px]:size-14" style={{ "--x": "66%", "--y": "70%", "--dy": "90vh", "--dx": "-30vw", "--rot": "0deg" } as React.CSSProperties} />
        <span aria-hidden="true" className="story-prop size-5 rounded-full bg-[#c9bbe4]" style={{ "--x": "24%", "--y": "22%", "--dy": "260vh", "--rot": "0deg" } as React.CSSProperties} />
        <span aria-hidden="true" className="story-mat" />

        <div className="story-scene" style={{ "--a": -1, "--b": 0.24, "--m": 0.06 } as React.CSSProperties}>
          <h2 id="story-title" className="serif max-w-[14em] text-[clamp(1.75rem,4.8vw,3.875rem)] leading-[1.7]">
            <Lines lines={["ヨガもピラティスも、", "先生によって", "レッスンは変わります。"]} />
          </h2>
        </div>

        {a && <Voice s={a} range={[0.22, 0.5]} />}
        {b && <Voice s={b} range={[0.48, 0.76]} flip />}

        <div className="story-scene" style={{ "--a": 0.74, "--b": 2, "--m": 0.94 } as React.CSSProperties}>
          <p className="serif max-w-[14em] text-[clamp(1.75rem,4.8vw,3.875rem)] leading-[1.7]">
            <Lines lines={["合うかどうかは、", "本人の話を読むと", "わかります。"]} />
          </p>
          <p className="max-w-[32rem] text-[0.9375rem] leading-[2.1] text-sub min-[768px]:text-base">
            <Lines lines={["ここちは、先生本人に話を聞いて、", "教え方と人柄を読めるようにしたメディアです。"]} />
          </p>
          <Link href="/instructor/" className="btn-primary">
            インタビューを読む
          </Link>
        </div>

        <span aria-hidden="true" className="story-prop !top-auto bottom-0 left-0 h-1 w-full origin-left !transform-none bg-line">
          <span className="story-bar block h-full origin-left bg-brass" />
        </span>
      </div>
    </section>
  );
}

/** 先生の言葉と写真の場面 */
function Voice({ s, range, flip = false }: { s: InstructorSummary; range: [number, number]; flip?: boolean }) {
  return (
    <div className="story-scene" style={{ "--a": range[0], "--b": range[1], "--m": (range[0] + range[1]) / 2 } as React.CSSProperties}>
      <div className={`flex max-w-[64rem] flex-col items-center gap-6 min-[768px]:gap-14 ${flip ? "min-[768px]:flex-row-reverse" : "min-[768px]:flex-row"}`}>
        <div className="arch relative aspect-[4/5] w-[min(44vw,11rem)] shrink-0 min-[768px]:w-[clamp(15rem,20vw,21rem)]" style={{ background: MATS[s.mat].bg }}>
          <Image src={s.photo.src} alt="" fill sizes="(min-width: 768px) 336px, 44vw" className="object-cover" />
        </div>
        <div className="min-[768px]:text-left">
          <p className="serif text-[clamp(1.375rem,3.4vw,2.5rem)] leading-[1.75]">
            <span className="min-[768px]:-ml-[0.5em]">「</span>
            {s.catchphrase}」
          </p>
          <p className="mt-5 text-[0.875rem] font-bold text-sub">
            <Link href={`/instructor/${s.slug}/`} className="link">
              {s.name}さん
            </Link>
            <span className="ml-2 font-medium">
              {s.styles.join("・")}／{s.areaLabel}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/** 文節の途中で改行しないよう、行ごとにまとめる */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((l) => (
        <span key={l} className="inline-block">
          {l}
        </span>
      ))}
    </>
  );
}
