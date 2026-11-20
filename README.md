# ここち（cocochi｜ヨガ・ピラティスインストラクターメディア）

ヨガ・ピラティスの先生へのインタビューを軸にした「先生を読んで選べる」メディア。
コンセプトは **「この先生なら、通えそう。」** レッスンの雰囲気や声のかけ方は先生によって違うので、星・口コミ・ランキングでは並べない。判断材料は「インタビュー本文」と、初回の流れ・運動量・料金・スタジオ情報などの「通う前に知りたいこと」。

ジムトレーナーのメディア「バディ」（`../gym-coach`）と同じ仕組みを土台にし、女性寄りの読者に向けて作り替えた姉妹サイト。デザインは別物。

- 取材の質問シート: [docs/interview-question-sheet.md](docs/interview-question-sheet.md)
- 原稿テンプレート: [templates/instructor.mdx](templates/instructor.mdx)・[templates/studio.yaml](templates/studio.yaml)

## 技術

Next.js（App Router・全ページ静的生成）／TypeScript／Tailwind CSS v4／MDX＋frontmatter（Zod で検証）。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run build` | 原稿の検査 → ビルド → title の検査。どれかで失敗したら止まる |
| `npm run lint:content` | 原稿の検査だけ（スキーマ・参照・NG ワード・情報の鮮度） |
| `npm run check:titles` | ビルド後の全ページの title に「インストラクター」が入っているか |
| `npm run typecheck` | 型チェック |
| `bash scripts/generate-photos.sh` | ダミーの写真を AI（Codex の image_gen）で作る。無い写真だけ作る（`FORCE=1` で全部作り直す） |
| `bash scripts/generate-photos-oracle.sh` | 同じ写真を oracle（ChatGPT のブラウザ操作）で1枚ずつ作る。Codex が上限のときの代わり |

## 先生・スタジオを追加する

1. `templates/studio.yaml` を `content/studio/<slug>.yaml` にコピーして埋める（地域は `data/areas.ts` にある値だけ。無ければ市区町村を足す）
2. `templates/instructor.mdx` を `content/instructor/<slug>.mdx` にコピーして埋める。写真は `public/images/instructor/`（縦 4:5）と `public/images/interview/`（横 3:2）
3. `npm run lint:content` で検査 → `draft: false` にして公開
4. ファイル名が `_` で始まるものは読み込まれない（下書き置き場）。`SHOW_DRAFTS=1 npm run dev` で下書きも表示
5. 目的を増やすときは `data/vocab.ts` の `PURPOSES` に足す（マットの色も1つ決める）。レッスンの種類は `STYLES`

## URL

| URL | 中身 |
|---|---|
| `/` | トップ（見出しとアーチの写真・物語の場面・目的のマット8枚・新着・使い方・特徴・エリア） |
| `/instructor/` | 一覧（フリーワード・目的・レッスンの種類・エリア・相談したいこと・特徴で絞り込み。新着順／エリア順） |
| `/instructor/<slug>/` | 取材記事＋教え方の項目＋レッスンを受けるには |
| `/purpose/`・`/purpose/<slug>/` | 目的から |
| `/area/`・`/area/<pref>/`・`/area/<pref>/<city>/` | エリアから（47都道府県） |
| `/studio/<slug>/` | スタジオの情報と、そこで教えている先生 |
| `/join/`・`/privacy/` | 掲載希望の方へ・プライバシーポリシー |

## デザインの決まり

- 題材は朝のヨガ・ピラティススタジオ。桜色がかった白の地、淡いピンクの面、パステルのマット。文字は黒ではなく濃いプラム
- **マットの8色は「目的」だけを表す**（`data/vocab.ts` の `MATS`）。トップのマット・カード・個別ページ・目的ページで同じ色
- 形はアーチ・円・ピル。直角と黒い罫線は使わない。面の境目は波（`components/Wave.tsx`）
- 和文の本文は Zen Maru Gothic、見出しと先生の言葉は Klee One。欧文は Cormorant Garamond のイタリック
- カードの大きさは揃える
- 詳しくは `app/globals.css` の冒頭

## 動きの決まり

呼吸の速さを基準に、ゆっくり・やわらかく動かす。仕組みは3つだけ。

| 仕組み | 置き場所 | 使いどころ |
|---|---|---|
| 読み込み時 | `globals.css` の `.hero-char` `.hero-in` `.hero-arch` `.hero-bloom` | 見出しが1文字ずつ出る、アーチの写真が開く |
| 画面に入ったとき | `components/RevealObserver.tsx` が `.is-in` を付ける（`.rise` `.reveal` `.wipe` `.unroll` `.draw-path` など） | カード・見出し・マットが広がる・線画が描かれる |
| スクロール連動 | `components/ScrollProgress.tsx` が `[data-p]` に `--p`（0〜1）を入れる | 物語の場面（`components/Story.tsx`）、写真や欧文のずれ、波線が描かれる |

- 動きを減らす設定（prefers-reduced-motion）と、JS が動かないときは、全部が最初から見えている
- スクロール連動で動かすのは `transform` と `opacity` だけにする（幅や高さを変えると、ブラウザのスクロール位置の自動補正と干渉して勝手にスクロールする）
- 1つの要素に、動きのクラスを2つ重ねない（`animation` が上書きされて片方が消える）。入れ子にする

## 守ること（コンセプトから）

- 口コミ・星・点数・ランキング・「人気順」「おすすめ順」は作らない。並び順は新着順とエリア順だけ
- 体の不調が良くなる、体型が変わる、「何か月で」などの結果の約束は載せない（`data/ng-words.ts` で検査。公開前・有料掲載の開始前に専門家の確認を受ける）
- 資格の数や教えた人数など、肩書きの大きさを比べる項目は作らない
- 有料掲載でも表示順を変えない。`listing: paid` の先生には「掲載プラン利用」と自動で表示する
- 料金は通常の額だけ。割引・体験価格を強調しない
- 写真は、先生が生徒の体に触れる構図、背中やおなかの出るウェアを使わない

## 公開前にやること

- サイト名「ここち／cocochi」の商標・同名サービスを確認する（名前は `data/site.ts` の2か所を直せば全ページに反映される）
- 公開する場所を決める（バディと同じく media.raxus.inc 配下なら、パスで配信する設定が必要）
- `data/site.ts` の `isDummyContent` を `false` にする（robots.txt の全面ブロックが外れる）
- `NEXT_PUBLIC_SITE_URL` を本番ドメインに設定する
- ダミーの先生・スタジオ（`content/`）と AI 生成の写真を、実際の取材内容と写真に差し替える。カードの下の注記（`SampleNote`）も消す
- プライバシーポリシーを確定する
