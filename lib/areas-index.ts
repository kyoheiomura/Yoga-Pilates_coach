/** 地域ごとの索引。エリアページ・検索の選択肢・サイトマップで使う */
import { PREFECTURES, REGIONS } from "@/data/areas";
import { venuesOf, getAllInstructors, type InstructorEntry } from "@/lib/content";

const inCity = (s: InstructorEntry, prefSlug: string, citySlug: string) =>
  venuesOf(s).some((c) => c.address.prefSlug === prefSlug && c.address.citySlug === citySlug);

export function instructorsInPref(prefSlug: string) {
  return getAllInstructors().filter((s) => venuesOf(s).some((c) => c.address.prefSlug === prefSlug));
}

export function instructorsInCity(prefSlug: string, citySlug: string) {
  return getAllInstructors().filter((s) => inCity(s, prefSlug, citySlug));
}

/** 47都道府県すべて（コード順）と、取材した人数。市区町村は取材したインストラクターがいるところだけ */
export function getAllPrefs() {
  return PREFECTURES.map((pref) => ({
    ...pref,
    count: instructorsInPref(pref.slug).length,
    cities: pref.cities
      .map((city) => ({ ...city, count: instructorsInCity(pref.slug, city.slug).length }))
      .filter((c) => c.count > 0),
  }));
}

/** 取材したインストラクターがいる都道府県だけ（検索の選択肢・サイトマップ） */
export function getAreaTree() {
  return getAllPrefs().filter((p) => p.count > 0);
}

/** 地方ごとにまとめた47都道府県（/area/ の一覧） */
export function getRegions() {
  const all = getAllPrefs();
  return REGIONS.map((r) => ({ ...r, prefs: all.filter((p) => p.region === r.key) }));
}
