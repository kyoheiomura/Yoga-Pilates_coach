/**
 * 取材記事の本文（MDX）で使える部品。CMS のリッチテキストに置き換えやすいよう、数を絞る。
 *   ## 章の見出し            章（目次に出る）。lib/mdx.tsx が <ChapterTitle> に置きかえる
 *   <Q>質問</Q>              聞き手の質問（小見出し）。答えは、その下にふつうの段落で書く
 *   <Photo src alt caption align />  写真。align="left" で文章の左に回りこむ（省くと中央）
 *   <Quote>言葉</Quote>      本文から抜き出した、大きく見せる言葉（使わなくてもよい）
 */
import Image from "next/image";
import type { ReactNode } from "react";

export function ChapterTitle({ id, no, children }: { id: string; no: string; children: ReactNode }) {
  return (
    <h2 id={id} className="reveal !mt-24 scroll-mt-24 text-center first:!mt-0 min-[768px]:!mt-32">
      <span aria-hidden="true" className="flex flex-col items-center">
        <span className="eyebrow reveal-line">Chapter</span>
        <span className="num-outline reveal-line mt-1 text-[5rem] min-[768px]:text-[6.5rem]" style={{ "--d": 2 } as React.CSSProperties}>
          {Number(no)}
        </span>
        <span className="rule-brass reveal-rule mt-5 w-16 !bg-brass-soft" />
      </span>
      <span className="serif reveal-line mt-7 block text-[1.5rem] leading-[1.7] min-[768px]:text-[2rem]" style={{ "--d": 5 } as React.CSSProperties}>
        {children}
      </span>
    </h2>
  );
}

export function Q({ children }: { children: ReactNode }) {
  return (
    <h3 className="!mt-12 clear-both flex gap-3 text-[1.0625rem] leading-[1.8] text-accent-deep min-[768px]:text-[1.1875rem]">
      <span aria-hidden="true" className="shrink-0 font-num text-[1.75rem] leading-[1.15] font-normal italic text-brass">
        Q.
      </span>
      <span>{children}</span>
    </h3>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="serif rise relative !my-16 clear-both rounded-[2.5rem] bg-accent-soft px-8 py-10 text-center text-[1.375rem] leading-[1.9] min-[768px]:text-[1.75rem]">
      {children}
    </blockquote>
  );
}

export function Photo({ src, alt, caption, align = "center" }: { src: string; alt: string; caption?: string; align?: "center" | "left" }) {
  return (
    <figure className={align === "left" ? "!mt-6 min-[768px]:float-left min-[768px]:mr-9 min-[768px]:mb-3 min-[768px]:w-[44%]" : "!my-9 clear-both mx-auto min-[768px]:w-[88%]"}>
      <div className="wipe relative aspect-[3/2] overflow-clip rounded-[2rem] bg-chalk">
        <span className="zoom-in absolute inset-0 block">
          <Image src={src} alt={alt} fill sizes={align === "left" ? "(min-width: 768px) 320px, 100vw" : "(min-width: 768px) 620px, 100vw"} className="object-cover" />
        </span>
      </div>
      {caption && <figcaption className="mt-3 text-xs leading-[1.8] text-sub">{caption}</figcaption>}
    </figure>
  );
}

export const mdxComponents = { ChapterTitle, Q, Quote, Photo };
