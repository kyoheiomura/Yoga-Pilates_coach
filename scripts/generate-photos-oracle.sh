#!/bin/bash
# ダミー期間用の写真を、oracle（ChatGPT のブラウザ操作）で1枚ずつ作る。Codex の image_gen が上限のときの代わり。
# oracle の完了待ちは止まりやすいので、Chrome の debug port から画像を直接取り出す（scripts/oracle-grab.mjs）。
#   bash scripts/generate-photos-oracle.sh          … まだ無い写真だけ作る
# いまの記事内の写真（public/images/interview/）の一部は、先生の写真の元画像（artifacts/photos/*.png）の横長版や切り出し。
# 専用の写真に作り直すときは、その .jpg を消してから実行する（alt と caption も合わせて直す）。
# 決まりは generate-photos.sh と同じ：顔は写さない／体に触れる構図にしない／背中やおなかの出るウェアにしない。
set -u
cd "$(dirname "$0")/.."
ROOT="$PWD"
PROFILE="$HOME/.oracle/browser-profile"
RAW="$ROOT/artifacts/photos"
mkdir -p public/images/instructor public/images/interview public/images/top "$RAW"

STYLE="Photorealistic editorial photograph for a Japanese women's lifestyle and wellness magazine. NO faces visible (faces out of frame, cropped at the chin, or seen from behind). No physical contact between people. Modest relaxed activewear with sleeves, no bare backs, no bare midriffs. No text, no logos, no brand marks, no watermark. Japan, bright airy yoga and pilates studio, soft diffused morning window light through sheer linen curtains, pale wood floor, white walls, a few green plants, gentle pastel palette of dusty rose, soft sage green and cream, calm and welcoming atmosphere, shallow depth of field, natural skin tones, soft film-like contrast."

# 頼んだ縦横比で出ないことがあるので、中央を切り出してそろえる（縦 4:5／横 3:2／正方形）。余白は足さない
fit() { # fit <jpg> <portrait|landscape|square>
  local w h rw=3 rh=2 cw ch
  w=$(sips -g pixelWidth "$1" | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$1" | awk '/pixelHeight/{print $2}')
  [ "$2" = portrait ] && { rw=4; rh=5; }
  [ "$2" = square ] && { rw=1; rh=1; }
  if [ $((w * rh)) -gt $((h * rw)) ]; then cw=$((h * rw / rh)); ch=$h; else cw=$w; ch=$((w * rh / rw)); fi
  sips -c "$ch" "$cw" "$1" > /dev/null
}

gen() { # gen <公開するパス（.jpg）> <portrait|landscape|square> <プロンプト>
  local out="$1" shape="$2" prompt="$3 $STYLE"
  [ -s "$out" ] && [ ! -f "$out.placeholder" ] && { echo "あり: $out"; return 0; }
  local name; name="$(basename "${out%.jpg}")"
  local raw="$RAW/$name.png" aspect="3:2"
  [ "$shape" = portrait ] && aspect="2:3"
  [ "$shape" = square ] && aspect="1:1"
  rm -f "$raw"
  oracle --engine browser --browser-manual-login --browser-manual-login-profile-dir "$PROFILE" --browser-keep-browser --force \
    --slug "cocochi photo $name" --generate-image "$raw" --aspect "$aspect" --prompt "$prompt" > "$RAW/$name.log" 2>&1 &
  local op=$! ok=0
  for i in $(seq 1 60); do
    sleep 10
    [ -s "$raw" ] && { ok=1; break; }
    local port; port=$(head -1 "$PROFILE/DevToolsActivePort" 2>/dev/null)
    if [ -n "$port" ] && [ "$i" -gt 6 ] && node scripts/oracle-grab.mjs "$port" "$raw" "${prompt:0:60}" >/dev/null 2>&1; then
      sleep 15; node scripts/oracle-grab.mjs "$port" "$raw" "${prompt:0:60}" >/dev/null 2>&1; ok=1; break
    fi
  done
  kill $op 2>/dev/null
  [ "$ok" = 1 ] || { echo "失敗: $out"; return 1; }
  sips -s format jpeg -s formatOptions 86 "$raw" --out "$out" > /dev/null
  fit "$out" "$shape"
  rm -f "$out.placeholder"
  echo "できた: $out"
}

T=public/images/instructor
I=public/images/interview
P=public/images/top

gen $P/hero.jpg portrait "A woman seen from behind sitting cross-legged on a dusty rose yoga mat, both arms raised overhead in a gentle seated stretch, wearing a loose cream long-sleeve top, hair in a low bun, facing a large window with sheer curtains, morning light glowing around her."
gen $T/mihon-akari.jpg portrait "A female yoga instructor in a soft sage long-sleeve top and cream pants sitting in a relaxed kneeling pose on a dusty rose yoga mat, hands resting on her thighs, a bolster and a folded blanket beside her, cropped at the chin so the face is out of frame."
gen $T/kari-yui.jpg portrait "A female pilates instructor in a dusty rose long-sleeve top and gray leggings standing beside a wooden pilates reformer machine, one hand resting lightly on the footbar, small private studio with a large mirror, cropped at the shoulders so the face is out of frame."
gen $T/hinagata-maho.jpg portrait "A female yoga instructor in a cream knit top kneeling on a lavender yoga mat, arranging a round bolster and a soft blanket, a small baby play mat with wooden toys softly blurred in the background, cropped so the face is out of frame."
gen $T/reiji-sayaka.jpg portrait "A female pilates instructor in a butter yellow long-sleeve top sitting upright on a sky blue mat, holding a pilates ring between her palms in front of her chest, a small soft ball beside her, cropped at the chin so the face is out of frame."
gen $P/talk.jpg landscape "A female yoga instructor and a female student sitting on their own separate mats facing each other and chatting before class, seen from behind and from the side at floor level, clear space between them, a notebook on the floor, faces out of frame."
gen $P/studio.jpg landscape "Wide interior of an empty small yoga studio in the morning: six pastel yoga mats (dusty rose, sage, butter yellow, lavender, sky blue, peach) laid out in two neat rows on a pale wood floor, a monstera plant, cork blocks stacked by the wall, nobody in frame."
gen $P/roll.jpg square "Close-up of a woman's hands slowly rolling up a soft sage green yoga mat on a pale wood floor, a ceramic mug of tea and a folded cream blanket beside it, faces out of frame."
gen $I/mihon-akari-studio.jpg landscape "Interior of a small quiet yoga studio with nobody in it: four dusty rose and cream yoga mats, bolsters and folded blankets stacked on a low wooden shelf, a paper lantern, wide shot."
gen $I/mihon-akari-props.jpg landscape "Still life on a pale wood floor: two cork yoga blocks, a rolled dusty rose mat, a cotton yoga strap and a folded cream blanket arranged neatly, nobody in frame."
gen $I/kari-yui-room.jpg landscape "Interior of a small private machine pilates room with nobody in it: two wooden pilates reformers side by side, a wall mirror, a low shelf with small balls and rings, pale pink wall, wide shot."
gen $I/kari-yui-spring.jpg landscape "Close-up of the springs and footbar of a wooden pilates reformer, soft window light, a folded towel on the carriage, nobody in frame."
gen $I/hinagata-maho-studio.jpg landscape "Interior of a bright small yoga studio for mothers with nobody in it: lavender and cream mats in a circle, bolsters, a corner with a baby play mat, wooden toys and a baby bouncer, wide shot."
gen $I/hinagata-maho-tea.jpg landscape "Still life on a low wooden table in a yoga studio lounge: a glass teapot of herbal tea, two small cups, a folded cotton blanket and a small notebook, nobody in frame."
gen $I/reiji-sayaka-studio.jpg landscape "Interior of a mat pilates studio on an upper floor of a city building with nobody in it: eight sky blue and butter yellow mats in rows, a mirror wall, a shelf with pilates rings and foam rollers, wide shot."
gen $I/reiji-sayaka-tools.jpg landscape "Still life on a sky blue mat: a pilates ring, a small soft ball, a foam roller and a resistance band arranged neatly, nobody in frame."
echo "完了"
