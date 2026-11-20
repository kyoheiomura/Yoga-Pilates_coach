#!/bin/bash
# ダミー期間用の写真を AI（Codex 組み込みの image_gen / gpt-image-2）で生成する。
# 人物の顔は作らない（作り物の質感が出るため）。後ろ姿・手元・道具・スタジオの様子だけ。
# 先生が生徒の体に触れる構図、背中やおなかの出るウェアは使わない。
#   bash scripts/generate-photos.sh          … まだ無い写真だけ作る
#   FORCE=1 bash scripts/generate-photos.sh  … すべて作り直す
set -u
cd "$(dirname "$0")/.."
mkdir -p public/images/instructor public/images/interview public/images/top
LOG_DIR=artifacts/photos
mkdir -p "$LOG_DIR"

STYLE="Photorealistic editorial photograph for a Japanese women's lifestyle and wellness magazine. NO faces visible (faces out of frame, cropped at the chin, or seen from behind). No physical contact between people. Modest relaxed activewear with sleeves, no bare backs, no bare midriffs. No text, no logos, no brand marks, no watermark. Japan, bright airy yoga and pilates studio, soft diffused morning window light through sheer linen curtains, pale wood floor, white walls, a few green plants, gentle pastel palette of dusty rose, soft sage green and cream, calm and welcoming atmosphere, shallow depth of field, natural skin tones, soft film-like contrast."

gen() { # gen <公開するパス（.jpg）> <サイズ> <プロンプト>
  if [ -f "$1" ] && [ "${FORCE:-0}" != "1" ]; then echo "あり: $1"; return; fi
  local raw="$LOG_DIR/$(basename "${1%.jpg}").png"
  codex exec --sandbox workspace-write --skip-git-repo-check --cd "$PWD" "Codex 組み込みの image_gen ツール（gpt-image-2）を直接呼んで画像を1枚作ってください。
API キーも Python/Node スクリプトも不要です。

プロンプト: '$3'
サイズ: $2
保存先: $raw" > "$LOG_DIR/$(basename "$1").log" 2>&1
  sips -s format jpeg -s formatOptions 86 "$raw" --out "$1" > /dev/null && file "$1"
}

T=public/images/instructor
I=public/images/interview
P=public/images/top

# トップの写真（最初に作る）
gen $P/hero.jpg 1024x1280 "A woman seen from behind sitting cross-legged on a dusty rose yoga mat, both arms raised overhead in a gentle seated stretch, wearing a loose cream long-sleeve top, hair in a low bun, facing a large window with sheer curtains, morning light glowing around her. $STYLE" &
gen $P/roll.jpg 1024x1024 "Close-up of a woman's hands slowly rolling up a soft sage green yoga mat on a pale wood floor, a ceramic mug of tea and a folded cream blanket beside it, faces out of frame. $STYLE" &
gen $P/talk.jpg 1536x1024 "A female yoga instructor and a female student sitting on their own separate mats facing each other and chatting before class, seen from behind and from the side at floor level, clear space between them, a notebook on the floor, faces out of frame. $STYLE" &
wait
gen $P/studio.jpg 1536x1024 "Wide interior of an empty small yoga studio in the morning: six pastel yoga mats (dusty rose, sage, butter yellow, lavender, sky blue, peach) laid out in two neat rows on a pale wood floor, sheer curtains, a monstera plant, cork blocks stacked by the wall, nobody in frame. $STYLE" &
# 先生の写真（縦 4:5。カードと記事の冒頭）
gen $T/mihon-akari.jpg 1024x1280 "A female yoga instructor in a soft sage long-sleeve top and cream pants sitting in a relaxed kneeling pose on a dusty rose yoga mat, hands resting on her thighs, a bolster and a folded blanket beside her, bright studio with sheer curtains, cropped at the chin so the face is out of frame. $STYLE" &
gen $T/kari-yui.jpg 1024x1280 "A female pilates instructor in a dusty rose long-sleeve top and gray leggings standing beside a wooden pilates reformer machine, one hand resting lightly on the footbar, bright small private studio with a large mirror, cropped at the shoulders so the face is out of frame. $STYLE" &
wait
gen $T/hinagata-maho.jpg 1024x1280 "A female yoga instructor in a cream knit top kneeling on a lavender yoga mat, arranging a round bolster and a soft blanket, a small baby play mat with wooden toys softly blurred in the background, cropped so the face is out of frame. $STYLE" &
gen $T/reiji-sayaka.jpg 1024x1280 "A female pilates instructor in a butter yellow long-sleeve top sitting upright on a sky blue mat, holding a pilates ring (magic circle) between her palms in front of her chest, small soft ball beside her, cropped at the chin so the face is out of frame. $STYLE" &
# 取材記事の本文に入れる写真（スタジオの様子・道具。人は入れない）
gen $I/mihon-akari-studio.jpg 1536x1024 "Interior of a small quiet yoga studio with nobody in it: four dusty rose and cream yoga mats, bolsters and folded blankets stacked on a low wooden shelf, a paper lantern, sheer curtains, wide shot. $STYLE" &
wait
gen $I/mihon-akari-props.jpg 1536x1024 "Still life on a pale wood floor: two cork yoga blocks, a rolled dusty rose mat, a cotton yoga strap and a folded cream blanket arranged neatly, nobody in frame. $STYLE" &
gen $I/kari-yui-room.jpg 1536x1024 "Interior of a small private machine pilates room with nobody in it: two wooden pilates reformers side by side, a wall mirror, a low shelf with small balls and rings, pale pink wall, wide shot. $STYLE" &
gen $I/kari-yui-spring.jpg 1536x1024 "Close-up of the springs and footbar of a wooden pilates reformer, soft window light, a folded towel on the carriage, nobody in frame. $STYLE" &
wait
gen $I/hinagata-maho-studio.jpg 1536x1024 "Interior of a bright small yoga studio for mothers with nobody in it: lavender and cream mats in a circle, bolsters, a corner with a baby play mat, wooden toys and a baby bouncer, wide shot. $STYLE" &
gen $I/hinagata-maho-tea.jpg 1536x1024 "Still life on a low wooden table in a yoga studio lounge: a glass teapot of herbal tea, two small cups, a folded cotton blanket and a small notebook, nobody in frame. $STYLE" &
gen $I/reiji-sayaka-studio.jpg 1536x1024 "Interior of a mat pilates studio on an upper floor of a city building with nobody in it: eight sky blue and butter yellow mats in rows, a mirror wall, a shelf with pilates rings and foam rollers, city window light, wide shot. $STYLE" &
wait
gen $I/reiji-sayaka-tools.jpg 1536x1024 "Still life on a sky blue mat: a pilates ring, a small soft ball, a foam roller and a resistance band arranged neatly, nobody in frame. $STYLE" &
wait
echo "完了。public/images/ を確認してください。"
