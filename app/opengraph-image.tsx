import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

// サイト共通の OGP 画像。淡いピンクの地に、コンセプトとマットの色の丸
export const alt = SITE.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEXT = `${SITE.name}${SITE.nameEn}${SITE.kind}${SITE.tagline.join("")}`;

/** 使う文字だけを Google Fonts から取得する（ビルド時に1回） */
async function loadFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(TEXT)}`,
  ).then((r) => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`OGP 用フォントを取得できませんでした: ${family}`);
  return fetch(src).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const klee = await loadFont("Klee+One", 600);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 100px",
          background: "#fcece8",
          color: "#4b3440",
          fontFamily: "Klee",
          position: "relative",
        }}
      >
        {/* 右上の丸（マットの色） */}
        <div style={{ position: "absolute", right: -90, top: -110, width: 460, height: 460, borderRadius: 460, background: "#f6e3b0", display: "flex" }} />
        <div style={{ position: "absolute", right: 150, top: 250, width: 230, height: 230, borderRadius: 230, background: "#eeb0b7", display: "flex" }} />
        <div style={{ position: "absolute", right: 60, top: 420, width: 110, height: 110, borderRadius: 110, background: "#b9cdae", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SITE.tagline.map((l) => (
            <div key={l} style={{ fontSize: 92, lineHeight: 1.35, display: "flex" }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 50, color: "#b3566a" }}>{SITE.nameEn}</span>
          <span style={{ fontSize: 28, marginLeft: 22 }}>{SITE.name}</span>
          <span style={{ fontSize: 26, marginLeft: 26, color: "#77626d" }}>{SITE.kind}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Klee", data: klee, weight: 600, style: "normal" }],
    },
  );
}
