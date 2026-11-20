/** サイト名はここだけで決める。変えるときは NAME と NAME_EN を直せば全ページに反映される */
const NAME = "ここち";
/** ロゴと OGP に使う欧文の表記 */
const NAME_EN = "cocochi";
const KIND = "ヨガ・ピラティスインストラクターメディア";

export const SITE = {
  name: NAME,
  nameEn: NAME_EN,
  /** title の末尾などに添える種別 */
  kind: KIND,
  /** ロゴの横に添える、何のメディアかの一言 */
  descriptor: "ヨガ・ピラティスの先生のインタビューメディア",
  /** コンセプト。トップとフッター・OGP で使う */
  tagline: ["「この先生なら、", "通えそう。」"],
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cocochi.example").replace(/\/$/, ""),
  /** トップの title。ほかのページは titleSuffix を付ける */
  defaultTitle: `${NAME}｜自分に合う先生が見つかる${KIND}`,
  titleSuffix: `｜${NAME} ${KIND}`,
  description:
    "ここちは、ヨガ・ピラティスのインストラクター一人ひとりに話を聞き、レッスンの雰囲気と人柄を本人の言葉で届けるメディアです。初回の流れや料金、スタジオの情報もあわせて載せています。",
  /** お問い合わせ・取材の希望の窓口（運営会社のフォーム） */
  contactUrl: "https://0450.co.jp/contact",
  /** 掲載中の先生・スタジオがダミーのあいだは true。robots.txt で全面ブロックする */
  isDummyContent: true,
} as const;

/** 1ページに並べる先生の数 */
export const PAGE_SIZE = 24;
/** エリアページ・目的ページをインデックスさせる最少人数 */
export const AREA_INDEX_MIN = 3;
