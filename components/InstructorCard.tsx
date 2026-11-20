import Image from "next/image";
import Link from "next/link";
import { MATS, findPurpose } from "@/data/vocab";
import type { InstructorSummary } from "@/lib/view";

type Props = {
  s: InstructorSummary;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

/**
 * インタビューカード。アーチの写真の左下にレッスンの種類、右下に目的の色の丸（巻いたマット）。
 * 写真の下は 目的 → 先生の一言（Klee）→ 名前・スタジオ・エリア。
 * 画面に入るとアーチが下から開き、ホバーで写真が寄ってカードが少し浮く。大きさはどのカードも同じ。
 */
export function InstructorCard({ s, headingLevel = "h3", priority }: Props) {
  const Heading = headingLevel;
  const mat = MATS[s.mat];
  return (
    <article className="group relative flex h-full flex-col transition-transform duration-700 ease-[var(--ease-soft)] hover:-translate-y-2">
      <div className="relative">
        <div className="wipe arch relative aspect-[4/5]" style={{ background: mat.bg }}>
          <span className="zoom-in absolute inset-0 block">
            <Image
              src={s.photo.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              priority={priority}
              className="card-photo object-cover"
            />
          </span>
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />
          <ul className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {s.styles.map((st) => (
              <li key={st} className="rounded-full bg-paper/95 px-3 text-[0.75rem] leading-[2] font-bold text-ink">
                {st}
              </li>
            ))}
          </ul>
        </div>
        {/* 巻いたマットの丸。ホバーで転がる */}
        <span
          aria-hidden="true"
          className="absolute -right-1 -bottom-4 block size-14 rounded-full border-4 border-paper transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:-translate-x-3 group-hover:-rotate-[220deg]"
          style={{ background: `repeating-radial-gradient(circle, ${mat.bg} 0 3px, ${mat.deep} 3px 4px), ${mat.bg}` }}
        />
      </div>
      <div className="flex flex-1 flex-col px-1 pt-6">
        <ul className="flex flex-wrap gap-x-3 gap-y-0.5 text-sub">
          {s.purposes.map((p) => {
            const pp = findPurpose(p);
            return (
              pp && (
                <li key={p} className="mat-chip" style={{ "--mat": MATS[pp.mat].bg } as React.CSSProperties}>
                  {pp.short}
                </li>
              )
            );
          })}
        </ul>
        <p className="serif mt-3 text-[1.1875rem] leading-[1.7] min-[768px]:text-[1.3125rem]">
          <span className="-ml-[0.5em]">「</span>
          {s.catchphrase}」
        </p>
        <div className="mt-auto flex items-baseline justify-between gap-3 pt-5">
          <Heading className="shrink-0 text-[0.9375rem] font-bold">
            <Link href={`/instructor/${s.slug}/`} className="after:absolute after:inset-0 after:content-['']">
              {s.name}
              <span className="ml-1 text-[0.8125rem] font-medium">さん</span>
              <span className="sr-only">のインタビューを読む</span>
            </Link>
          </Heading>
          <p className="text-right text-[0.75rem] leading-[1.6] text-sub">
            {s.venueName}（{s.areaLabel}）
          </p>
        </div>
      </div>
    </article>
  );
}

export function InstructorGrid({
  people,
  headingLevel,
  priorityCount = 0,
}: {
  people: InstructorSummary[];
  headingLevel?: "h2" | "h3";
  priorityCount?: number;
}) {
  return (
    <>
      <ul className="grid gap-x-7 gap-y-16 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:gap-x-10 min-[1024px]:gap-y-20">
        {people.map((s, i) => (
          <li key={s.slug} className="rise">
            <InstructorCard s={s} headingLevel={headingLevel} priority={i < priorityCount} />
          </li>
        ))}
      </ul>
      <SampleNote />
    </>
  );
}

/**
 * いま載っている先生は掲載イメージ用の架空の人物なので、カードの一覧の下に必ず添える。
 * 実際の取材記事に入れ替えたら、このコンポーネントごと消す。
 */
export function SampleNote({ className = "mt-12" }: { className?: string }) {
  return (
    <p className={`${className} text-[0.8125rem] leading-[1.9] text-sub`}>※ 掲載イメージです。先生とスタジオは架空のもので、写真はAIで作成しています。</p>
  );
}
