/** 目的ごとの索引。目的ページ・トップのバーベルと /purpose/ の一覧で使う */
import { PURPOSES } from "@/data/vocab";
import { getAllInstructors } from "@/lib/content";

export function instructorsOfPurpose(purposeSlug: string) {
  return getAllInstructors().filter((s) => s.purposes.includes(purposeSlug));
}

/** すべての目的（data/vocab.ts の順）と、取材した人数。まだ0人の目的も含む */
export function getAllPurposes() {
  return PURPOSES.map((purpose) => ({ ...purpose, count: instructorsOfPurpose(purpose.slug).length }));
}

/** 取材したインストラクターがいる目的だけ（サイトマップなど） */
export function getPurposeIndex() {
  return getAllPurposes().filter((s) => s.count > 0);
}
