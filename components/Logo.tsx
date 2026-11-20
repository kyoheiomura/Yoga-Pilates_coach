import { SITE } from "@/data/site";

/**
 * ロゴ：重なる2つの輪（co と co。先生と読む人）＋欧文の「cocochi」（イタリック）＋小さなひらがな＋何のメディアかの一言。
 * 読み上げは外側のリンクの aria-label が担当するので、ここは飾りとして扱う。
 */
export function Logo({ size = "md", invert = false }: { size?: "md" | "lg"; invert?: boolean }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center gap-3 ${invert ? "text-white" : "text-ink"}`}>
      <LogoMark className={size === "lg" ? "h-10 w-[3.35rem]" : "h-7 w-[2.35rem] min-[768px]:h-8 min-[768px]:w-[2.7rem]"} invert={invert} />
      <span className={`font-num leading-none font-medium italic ${size === "lg" ? "text-[3rem]" : "text-[1.875rem] min-[768px]:text-[2.125rem]"}`}>{SITE.nameEn}</span>
      <span className={`hidden self-end pb-[0.3em] text-[0.6875rem] leading-none font-bold tracking-[0.1em] min-[640px]:inline ${invert ? "text-white/70" : "text-sub"}`}>
        {SITE.name}
        <span className="ml-2.5 hidden font-medium min-[1024px]:inline">{SITE.descriptor}</span>
      </span>
    </span>
  );
}

/** ロゴの印：重なる2つの輪。重なったところだけ淡く色が付く */
export function LogoMark({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <svg viewBox="0 0 40 30" className={`shrink-0 ${className}`} fill="none">
      <path d="M20 6.1a10.2 10.2 0 0 1 0 17.8a10.2 10.2 0 0 1 0-17.8Z" fill={invert ? "rgb(255 255 255 / 0.22)" : "#f8d5d8"} />
      <circle cx="15" cy="15" r="10.2" stroke={invert ? "#f2c4c7" : "#b3566a"} strokeWidth="1.5" />
      <circle cx="25" cy="15" r="10.2" stroke={invert ? "#ffffff" : "#e39aa4"} strokeWidth="1.5" />
    </svg>
  );
}

/** 巻いたマットの切り口（うずまき）。ロゴと飾りに使う */
export function RollMark({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={`shrink-0 ${className}`} fill="none" strokeLinecap="round">
      <circle cx="20" cy="20" r="19" fill={invert ? "rgb(255 255 255 / 0.12)" : "#fbe3e4"} />
      <path
        d="M20 20c0-1.6 2.6-1.6 2.6.4 0 3-5.6 3-5.6-.6 0-4.6 8.8-4.6 8.8.8 0 6.2-12 6.2-12-1 0-7.8 15.2-7.8 15.2 1.2 0 9.4-18.4 9.4-18.4-1.4"
        stroke={invert ? "#f2c4c7" : "#c9727e"}
        strokeWidth="2"
      />
    </svg>
  );
}
