import { Cormorant_Garamond, Klee_One, Zen_Maru_Gothic } from "next/font/google";

// 和文の本文：Zen Maru Gothic。角の丸いゴシックで、やわらかく読みやすい
export const sans = Zen_Maru_Gothic({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-sans-jp",
});

// 和文の見出し・先生の言葉：Klee One。ペンで書いた手紙のような教科書体。大きく見せる和文だけに使う
export const serif = Klee_One({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-serif-jp",
});

// 欧文と数字：Cormorant Garamond のイタリック。細く流れるような線を、大きく使う
export const num = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-num",
});
