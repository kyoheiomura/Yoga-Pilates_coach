/**
 * セクション見出し：大きな欧文のイタリック（読み上げない）→ Klee の和文見出し。
 * 欧文は飾りなので aria-hidden。見出しの名前は和文だけ。
 * 画面に入ると、欧文が1文字ずつふわっと出て、短い線が引かれ、和文が続く。
 */
export function SectionHead({
  id,
  en,
  ja,
  invert = false,
  center = false,
  className = "",
}: {
  id?: string;
  en: string;
  ja: string;
  invert?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <h2 id={id} className={`reveal ${center ? "text-center" : ""} ${className}`}>
      <span aria-hidden="true" className={`display-en block ${invert ? "!text-brass-soft" : ""}`}>
        <SplitChars text={en} start={0} />
      </span>
      <span className={`mt-4 flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        <span aria-hidden="true" className="rule-brass reveal-rule w-10" />
        <span className={`serif text-[1.25rem] min-[768px]:text-[1.5rem] ${invert ? "text-white" : "text-ink"}`}>
          <span className="reveal-line" style={{ "--d": en.replace(/ /g, "").length * 0.6 + 2 } as React.CSSProperties}>
            {ja}
          </span>
        </span>
      </span>
    </h2>
  );
}

/** 文字を1つずつに分けて、順に出す（単語の途中では折り返さない） */
export function SplitChars({ text, start = 0 }: { text: string; start?: number }) {
  let n = 0;
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <span key={wi}>
          <span className="reveal-word">
            {[...w].map((ch, ci) => (
              <span key={ci} className="reveal-char" style={{ "--d": start + n++ } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
