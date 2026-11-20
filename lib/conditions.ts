/** 「特徴・こだわり」の絞り込み条件。一覧の絞り込みで使う */
import type { InstructorSummary } from "@/lib/view";

export const CONDITIONS = [
  { key: "private", label: "マンツーマンで受けられる", test: (s: InstructorSummary) => s.formats.includes("マンツーマン") },
  { key: "small", label: "少人数で受けられる", test: (s: InstructorSummary) => s.formats.includes("少人数グループ") || s.formats.includes("ペア") },
  { key: "female", label: "女性の先生", test: (s: InstructorSummary) => s.gender === "女性" },
  { key: "womenonly", label: "女性専用のスタジオ", test: (s: InstructorSummary) => s.features.includes("女性専用") },
  { key: "calm", label: "おだやかに見守る", test: (s: InstructorSummary) => s.tone === "おだやかに見守る" },
  { key: "gentle", label: "ゆったり動きたい", test: (s: InstructorSummary) => s.intensity === "ゆったり" },
  { key: "active", label: "しっかり動きたい", test: (s: InstructorSummary) => s.intensity === "しっかり" },
  { key: "kids", label: "子どもと一緒に通える", test: (s: InstructorSummary) => s.features.includes("子連れOK") || s.features.includes("キッズスペース") },
  { key: "rental", label: "ウェア・マットを借りられる", test: (s: InstructorSummary) => s.features.includes("ウェア・マットの貸し出し") },
  { key: "online", label: "オンラインで受けられる", test: (s: InstructorSummary) => s.formats.includes("オンライン") },
  { key: "weekend", label: "土日に通える", test: (s: InstructorSummary) => s.weekend },
  { key: "evening", label: "20時以降も通える", test: (s: InstructorSummary) => s.evening },
  { key: "morning", label: "朝8時までに始まる", test: (s: InstructorSummary) => s.morning },
] as const;
