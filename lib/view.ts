/**
 * コンテンツから、表示とクライアントに渡すための形を作る。
 * ここで作るオブジェクトはすべてシリアライズ可能（Date は文字列にする）。
 */
import { findCity, findPref } from "@/data/areas";
import { findPurpose, goalLabel, PURPOSES, WEEKDAYS, type MatColor } from "@/data/vocab";
import { venuesOf, type VenueEntry, type InstructorEntry } from "@/lib/content";
import type { Venue, Instructor } from "@/lib/schema";

const BUILD_YEAR = new Date().getFullYear();

/** 「ダイエット・姿勢・体の使い方」。並びは data/vocab.ts の順 */
export function purposeLabels(purposes: Instructor["purposes"]) {
  return PURPOSES.filter((s) => purposes.includes(s.slug)).map((s) => s.label);
}
export function purposesLabel(purposes: Instructor["purposes"]) {
  return purposeLabels(purposes).join("・");
}
/** 主な目的（1つ目）のマットの色。カードと個別ページの差し色に使う */
export function matOf(purposes: Instructor["purposes"]): MatColor {
  return findPurpose(purposes[0])?.mat ?? "rose";
}

export function yearsOfTraining(s: Instructor) {
  return Math.max(1, BUILD_YEAR - s.startedYear);
}

export function areaOf(c: Venue) {
  const pref = findPref(c.address.prefSlug)!;
  const city = findCity(c.address.prefSlug, c.address.citySlug)!;
  return { pref, city, label: city.name, fullLabel: `${pref.name}${city.name}` };
}

export function formatMonth(d: Date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

export function formatDate(d: Date) {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function formatYen(n: number) {
  return `${n.toLocaleString("ja-JP")}円`;
}

export function stationLabel(c: Venue) {
  return c.stations.map((s) => `${s.line} ${s.name}駅 徒歩${s.walkMin}分`).join("／");
}

/** 「月・火・木 10:00〜20:00」の形に */
export function hoursLabel(c: Venue) {
  return c.hours
    .map((h) => {
      const days = [...h.days].sort((a, b) => WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b));
      return `${days.join("・")} ${h.open}〜${h.close}`;
    })
    .join("／");
}

const opensWeekend = (c: Venue) => c.hours.some((h) => h.days.includes("土") || h.days.includes("日"));
const opensEvening = (c: Venue) => c.hours.some((h) => h.close >= "21:00");
const opensMorning = (c: Venue) => c.hours.some((h) => h.open <= "08:00");

/** 一覧・カードで使う要約 */
export type InstructorSummary = {
  slug: string;
  name: string;
  nameKana: string;
  catchphrase: string;
  photo: { src: string; alt: string };
  purposes: Instructor["purposes"];
  purposesLabel: string;
  purposeLabels: string[];
  mat: MatColor;
  styles: string[];
  intensity: string;
  areaLabel: string;
  venueName: string;
  prefSlug: string;
  citySlugs: string[];
  areaCode: number;
  goals: string[];
  targets: string[];
  formats: string[];
  gender?: string;
  tone: string;
  feedback: string;
  features: string[];
  weekend: boolean;
  evening: boolean;
  morning: boolean;
  publishedAt: string;
  /** フリーワード検索の対象（名前・一言・比較項目・場所・地域） */
  searchText: string;
};

export function toSummary(s: InstructorEntry): InstructorSummary {
  const venues = venuesOf(s);
  const main = areaOf(venues[0]);
  return {
    slug: s.slug,
    name: s.name,
    nameKana: s.nameKana,
    catchphrase: s.catchphrase,
    photo: s.photo,
    purposes: s.purposes,
    purposesLabel: purposesLabel(s.purposes),
    purposeLabels: purposeLabels(s.purposes),
    mat: matOf(s.purposes),
    styles: s.styles,
    intensity: s.compare.intensity,
    areaLabel: main.label,
    venueName: venues[0].name,
    prefSlug: main.pref.slug,
    citySlugs: venues.map((c) => c.address.citySlug),
    areaCode: main.city.code,
    goals: s.compare.goals,
    targets: s.compare.targets,
    formats: s.compare.formats,
    gender: s.compare.gender,
    tone: s.compare.tone,
    feedback: s.compare.feedback,
    features: [...new Set(venues.flatMap((c) => c.features))],
    weekend: venues.some(opensWeekend),
    evening: venues.some(opensEvening),
    morning: venues.some(opensMorning),
    publishedAt: s.publishedAt.toISOString(),
    searchText: [
      s.name,
      s.nameKana,
      s.catchphrase,
      purposesLabel(s.purposes),
      ...s.styles,
      s.compare.feature,
      s.compare.belief,
      s.compare.approach,
      ...s.compare.targets,
      ...s.compare.methods,
      ...s.compare.goals.map(goalLabel),
      ...venues.flatMap((c) => [c.name, areaOf(c).fullLabel, ...c.stations.map((st) => st.name)]),
    ].join(" "),
  };
}

/** 比較項目の表示に使う形 */
export type InstructorCompareData = InstructorSummary & {
  qualifications: string[];
  years: number;
  compare: Omit<Instructor["compare"], "goals"> & { goalLabels: string[] };
  venues: { name: string; area: string; stations: string; hours: string; hoursNote?: string }[];
};

export function toCompareData(s: InstructorEntry): InstructorCompareData {
  const venues = venuesOf(s);
  return {
    ...toSummary(s),
    qualifications: s.qualifications,
    years: yearsOfTraining(s),
    compare: { ...s.compare, goalLabels: s.compare.goals.map(goalLabel) },
    venues: venues.map((c: VenueEntry, i) => ({
      name: s.venues[i].days ? `${c.name}（${s.venues[i].days}）` : c.name,
      area: areaOf(c).fullLabel,
      stations: stationLabel(c),
      hours: hoursLabel(c),
      hoursNote: c.hoursNote,
    })),
  };
}
