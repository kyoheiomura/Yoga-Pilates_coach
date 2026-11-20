/**
 * 比較項目で使う決まった語彙。自由入力にすると絞り込みと比較が崩れるので、増やすときはここに足す。
 */

/**
 * マットの色。目的（なやみ）ごとに1色で、トップのマット・カード・個別ページで同じ色を使う。
 * 文字はどの色の上でも SUMI（濃いプラム）で読める明るさにそろえている。
 */
export const MATS = {
  sage: { bg: "#b9cdae", deep: "#7f9a72" },
  sky: { bg: "#b1cde6", deep: "#6f97bd" },
  rose: { bg: "#eeb0b7", deep: "#c9727e" },
  butter: { bg: "#f2dc9f", deep: "#c2a04a" },
  lavender: { bg: "#c9bbe4", deep: "#8d79b8" },
  peach: { bg: "#f5c6ab", deep: "#cf8a61" },
  mauve: { bg: "#dcb1d4", deep: "#a66f9c" },
  mint: { bg: "#aed8cc", deep: "#62a08f" },
} as const;
export type MatColor = keyof typeof MATS;

/**
 * 目的（サイトの主な探し方）。slug は URL（/purpose/[slug]/）に使うので、公開後は変えない。
 * 並びは一覧・絞り込み・トップのマットの順。
 * lead は目的ページの冒頭の文。体の不調が良くなる、といった結果を約束する言い方は書かない。
 */
export type Purpose = { slug: string; label: string; short: string; en: string; mat: MatColor; lead: string };
export const PURPOSES: Purpose[] = [
  {
    slug: "stiff",
    label: "肩・腰まわりをほぐしたい",
    short: "肩・腰まわり",
    en: "Release",
    mat: "sage",
    lead: "デスクワークや家事でかたまりやすい肩や腰まわりを、ゆっくり動かしていく先生たちです。",
  },
  {
    slug: "posture",
    label: "姿勢を整えたい",
    short: "姿勢",
    en: "Posture",
    mat: "sky",
    lead: "立ち方や座り方のくせを一緒に確かめて、体の使い方から見直す先生たちです。",
  },
  {
    slug: "shape",
    label: "体のラインを整えたい",
    short: "ボディライン",
    en: "Shape",
    mat: "rose",
    lead: "なりたい体のイメージを聞いて、体幹から動かすレッスンを組み立てる先生たちです。",
  },
  {
    slug: "flexible",
    label: "体のかたさが気になる",
    short: "柔軟性",
    en: "Flexibility",
    mat: "butter",
    lead: "前屈で手が届かなくても大丈夫。道具を使いながら、その人の動く範囲で進める先生たちです。",
  },
  {
    slug: "relax",
    label: "リラックスしたい",
    short: "リラックス",
    en: "Relax",
    mat: "lavender",
    lead: "呼吸をゆっくり整えて、頭と体を休める時間をつくる先生たちです。",
  },
  {
    slug: "habit",
    label: "運動の習慣をつくりたい",
    short: "運動習慣",
    en: "Habit",
    mat: "peach",
    lead: "運動が久しぶりの人や苦手な人と、通い続けられるペースを一緒につくる先生たちです。",
  },
  {
    slug: "maternity",
    label: "マタニティ・産後",
    short: "マタニティ・産後",
    en: "Maternity",
    mat: "mauve",
    lead: "妊娠中や出産のあとの体と生活のリズムに合わせて、無理のない動きを選ぶ先生たちです。",
  },
  {
    slug: "ageless",
    label: "年齢に合わせて動きたい",
    short: "40代・50代から",
    en: "Ageless",
    mat: "mint",
    lead: "40代・50代からはじめる人の、体力や体調の変化に合わせて進める先生たちです。",
  },
];
export const PURPOSE_SLUGS = PURPOSES.map((s) => s.slug) as [string, ...string[]];
export const findPurpose = (slug: string) => PURPOSES.find((s) => s.slug === slug);
export const purposeLabel = (slug: string) => findPurpose(slug)?.label ?? slug;

/** レッスンの種類（ジャンル）。カードと絞り込みに出す */
export const STYLES = ["ヨガ", "ホットヨガ", "マタニティヨガ", "産後ヨガ", "マットピラティス", "マシンピラティス"] as const;

/** よく受ける相談。「できるようになること」とは書かない（結果を約束する表示になるため） */
export const GOALS = [
  { slug: "hajimete", label: "スタジオがはじめてで不安" },
  { slug: "katai", label: "体がかたくて、ついていけるか心配" },
  { slug: "nigate", label: "運動に苦手意識がある" },
  { slug: "tsuzukanai", label: "ひとりだと続かない" },
  { slug: "saikai", label: "久しぶりに運動を再開したい" },
  { slug: "kihon", label: "ポーズや呼吸を基本から教わりたい" },
  { slug: "shincho", label: "体に不安があり慎重に進めたい" },
  { slug: "jikan", label: "忙しくて時間が限られている" },
  { slug: "hitori", label: "ひとりで参加するのが不安" },
  { slug: "kinchou", label: "人に見られるのが苦手" },
] as const;
export const GOAL_SLUGS = GOALS.map((g) => g.slug) as [string, ...string[]];
export const goalLabel = (slug: string) => GOALS.find((g) => g.slug === slug)?.label ?? slug;

/** 教えている相手 */
export const TARGETS = ["運動がはじめての人", "経験者", "女性", "妊娠中・産後の人", "シニア", "男性"] as const;

/** 教え方の温度感。優劣ではなく相性の項目 */
export const TONES = ["おだやかに見守る", "理屈からていねいに", "明るく盛り上げる", "相手に合わせる"] as const;
/** 伝え方の中心 */
export const FEEDBACKS = ["言葉で細かく伝える", "見本を見せる", "鏡や動画で一緒に確かめる", "道具で動きを助ける"] as const;
/** レッスンの運動量。優劣ではなく好みの項目 */
export const INTENSITIES = ["ゆったり", "ほどよく", "しっかり"] as const;
export const FORMATS = ["マンツーマン", "ペア", "少人数グループ", "グループ", "オンライン"] as const;
export const ROLES = ["代表", "所属インストラクター", "業務委託", "フリーランス"] as const;

export const VENUE_KINDS = ["ヨガスタジオ", "ピラティススタジオ", "ヨガ・ピラティススタジオ", "ホットヨガスタジオ", "フィットネスクラブ", "レンタルスタジオ", "その他"] as const;
export const WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日", "祝"] as const;
export const FEATURES = [
  "完全個室",
  "女性専用",
  "シャワー",
  "更衣室",
  "ウェア・マットの貸し出し",
  "駐車場",
  "キッズスペース",
  "子連れOK",
  "オンライン対応",
  "英語対応",
] as const;
