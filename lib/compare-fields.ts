/**
 * 個別ページ「〇〇さんの教え方」に載せる項目の並びと書き方（components/CompareFieldsList.tsx）。
 * kind: short = 短い値／long = 文章／list = 箇条書き
 * 値に優劣の色付けはしない。
 */
import type { InstructorCompareData } from "@/lib/view";

export type FieldValue = string | string[];
export type CompareField = {
  key: string;
  label: string;
  kind: "short" | "long" | "list";
  get: (d: InstructorCompareData) => FieldValue;
};
export type CompareGroup = { key: string; label: string; fields: CompareField[] };

const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    key: "person",
    label: "人",
    fields: [
      { key: "styles", label: "教えているレッスン", kind: "list", get: (d) => d.styles },
      { key: "purposes", label: "よく応えている目的", kind: "list", get: (d) => d.purposeLabels },
      {
        key: "qualifications",
        label: "資格",
        kind: "list",
        get: (d) => (d.qualifications.length ? d.qualifications : ["特になし"]),
      },
      { key: "years", label: "指導歴", kind: "short", get: (d) => `${d.years}年` },
      { key: "why", label: "先生になったきっかけ", kind: "long", get: (d) => d.compare.why },
    ],
  },
  {
    key: "belief",
    label: "考え",
    fields: [
      { key: "belief", label: "いちばん大切にしていること", kind: "long", get: (d) => d.compare.belief },
      { key: "approach", label: "「できない」への向き合い方", kind: "long", get: (d) => d.compare.approach },
      { key: "message", label: "メッセージ", kind: "long", get: (d) => `「${d.compare.message}」` },
      { key: "notFor", label: "ほかを勧めることがあるケース", kind: "long", get: (d) => d.compare.notFor },
    ],
  },
  {
    key: "lesson",
    label: "教え方",
    fields: [
      { key: "feature", label: "教え方の特徴", kind: "long", get: (d) => d.compare.feature },
      { key: "targets", label: "教えている相手", kind: "list", get: (d) => d.compare.targets },
      { key: "tone", label: "教えるときの温度感", kind: "short", get: (d) => d.compare.tone },
      { key: "feedback", label: "伝え方の中心", kind: "short", get: (d) => d.compare.feedback },
      { key: "formats", label: "レッスンの人数", kind: "list", get: (d) => d.compare.formats },
      { key: "methods", label: "レッスンで使うもの", kind: "list", get: (d) => d.compare.methods },
      { key: "explanation", label: "動きのねらいの伝え方", kind: "long", get: (d) => d.compare.explanation },
      {
        key: "firstLesson",
        label: "初回の流れ",
        kind: "short",
        get: (d) => `お話を聞く時間${d.compare.firstLesson.hearingMin}分＋レッスン${d.compare.firstLesson.lessonMin}分`,
      },
      { key: "pace", label: "通うペースの考え方", kind: "long", get: (d) => d.compare.pace },
      { key: "intensity", label: "レッスンの運動量", kind: "short", get: (d) => d.compare.intensity },
      {
        key: "homework",
        label: "自宅でできる運動の提案",
        kind: "short",
        get: (d) => (d.compare.homework ? "あり" : "なし"),
      },
      { key: "goals", label: "よく受ける相談", kind: "list", get: (d) => d.compare.goalLabels },
    ],
  },
  {
    key: "access",
    label: "通いやすさ",
    fields: [
      { key: "venue", label: "スタジオ", kind: "list", get: (d) => d.venues.map((c) => c.name) },
      {
        key: "area",
        label: "エリア・最寄り駅",
        kind: "long",
        get: (d) => d.venues.map((c) => `${c.area}　${c.stations}`),
      },
      { key: "hours", label: "レッスンのある時間帯", kind: "long", get: (d) => d.venues.map((c) => c.hours) },
      {
        key: "features",
        label: "設備・対応",
        kind: "list",
        get: (d) => (d.features.length ? d.features : ["特になし"]),
      },
      { key: "gender", label: "先生の性別", kind: "short", get: (d) => d.gender ?? "非公開" },
      {
        key: "price",
        label: "料金（税込）",
        kind: "long",
        get: (d) =>
          [
            `体験 ${yen(d.compare.price.trial)}`,
            `通常 1回 ${yen(d.compare.price.regular)}`,
            d.compare.price.admission !== undefined ? `入会金 ${yen(d.compare.price.admission)}` : undefined,
            d.compare.price.note,
          ].filter((v): v is string => Boolean(v)),
      },
    ],
  },
];
