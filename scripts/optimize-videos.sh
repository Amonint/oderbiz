#!/usr/bin/env bash
# Comprime videos de /assets/hero, /assets/aboutus y /assets/nuestra historia para web.
# Calidad visual alta (CRF 20), máx. 1080px de ancho, 7 s de duración, sin audio.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/videos/optimized"
CRF="${CRF:-20}"
PRESET="${PRESET:-slow}"
MAX_WIDTH="${MAX_WIDTH:-1080}"
MAX_DURATION="${MAX_DURATION:-7}"
MAXRATE="${MAXRATE:-8M}"
BUFSIZE="${BUFSIZE:-16M}"
FORCE="${FORCE:-0}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg no está instalado." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

encode_one() {
  local input="$1"
  local slug="${2:-}"
  if [[ -z "$slug" ]]; then
    slug="$(basename "$input" | sed -E 's/\.[Mm][Oo][Vv]$//; s/\.[Mm][Pp]4$//; s/-web$//')"
  fi
  local output="$OUT_DIR/${slug}-web.mp4"
  local poster="$OUT_DIR/${slug}-poster.jpg"

  if [[ "$FORCE" != "1" && -f "$output" && -f "$poster" && "$output" -nt "$input" && "$poster" -nt "$input" ]]; then
    echo "SKIP  $slug (ya actualizado)"
    return 0
  fi

  echo "ENCODE $slug (max ${MAX_DURATION}s)"
  ffmpeg -hide_banner -loglevel error -nostdin -y -i "$input" \
    -t "$MAX_DURATION" \
    -vf "scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos" \
    -c:v libx264 -crf "$CRF" -preset "$PRESET" \
    -maxrate "$MAXRATE" -bufsize "$BUFSIZE" \
    -profile:v high -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$output"

  ffmpeg -hide_banner -loglevel error -nostdin -y \
    -ss 00:00:01 -i "$output" \
    -vf "scale=480:-2" \
    -q:v 4 -frames:v 1 \
    "$poster"

  local src_mb out_mb
  src_mb="$(du -m "$input" | cut -f1)"
  out_mb="$(du -m "$output" | cut -f1)"
  echo "DONE  $slug  ${src_mb}MB -> ${out_mb}MB"
}

encode_story() {
  local input="$1"
  local slug="$2"
  local saved_crf="$CRF"
  local saved_width="$MAX_WIDTH"
  local saved_rate="$MAXRATE"
  local saved_buf="$BUFSIZE"
  local saved_preset="$PRESET"
  local saved_force="$FORCE"

  CRF=23
  MAX_WIDTH=720
  MAXRATE=4M
  BUFSIZE=8M
  PRESET=medium
  FORCE=1
  encode_one "$input" "$slug"

  CRF="$saved_crf"
  MAX_WIDTH="$saved_width"
  MAXRATE="$saved_rate"
  BUFSIZE="$saved_buf"
  PRESET="$saved_preset"
  FORCE="$saved_force"
}

should_skip_asset() {
  local file="$1"
  local dir base stem web_candidate
  dir="$(dirname "$file")"
  base="$(basename "$file")"
  stem="${base%.*}"

  if [[ "$base" =~ -web\.[Mm][Pp]4$ ]]; then
    return 1
  fi

  web_candidate="$dir/${stem}-web.mp4"
  if [[ -f "$web_candidate" ]]; then
    return 0
  fi

  return 1
}

if [[ "${STORY_ONLY:-0}" != "1" ]]; then
  while IFS= read -r -d '' file; do
    if should_skip_asset "$file"; then
      echo "SKIP  $(basename "$file") (ya existe versión -web.mp4)"
      continue
    fi
    encode_one "$file"
  done < <(find "$ROOT/public/assets/hero" "$ROOT/public/assets/aboutus" \
    -type f \( -iname '*.mov' -o -iname '*.mp4' \) -print0 | sort -z)
fi

STORY_DIR="$ROOT/public/assets/nuestra historia"
if [[ -d "$STORY_DIR" ]]; then
  echo ""
  echo "Nuestra historia (máx. ${MAX_DURATION}s, 720px)"
  encode_story "$STORY_DIR/IMG_9413-web.mp4" "IMG_9413"
  encode_story "$STORY_DIR/WhatsApp Video 2026-06-29 at 4.02.26 PM.mp4" "story-wa-402"
  encode_story "$STORY_DIR/WhatsApp Video 2026-06-29 at 4.04.44 PM.mp4" "story-wa-404"
  encode_story "$STORY_DIR/WhatsApp Video 2026-06-29 at 4.09.02 PM.mp4" "story-wa-409"
  encode_story "$STORY_DIR/1-web.mp4" "story-1"
  encode_story "$STORY_DIR/2-web.mp4" "story-2"
  encode_story "$STORY_DIR/3-web.mp4" "story-3"
fi

if [[ "${STORY_ONLY:-0}" == "1" ]]; then
  echo ""
  echo "Optimización de Nuestra historia completada en $OUT_DIR"
  exit 0
fi

# Recorta MP4 ya optimizados sin fuente en assets (legacy / huérfanos).
while IFS= read -r -d '' file; do
  slug="$(basename "$file" -web.mp4)"
  if src="$(find "$ROOT/public/assets/hero" "$ROOT/public/assets/aboutus" \
    -type f \( -iname "${slug}.mov" -o -iname "${slug}.MOV" -o -iname "${slug}.mp4" \) \
    -print -quit 2>/dev/null)" && [[ -n "$src" ]]; then
    continue
  fi
  duration="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$file" 2>/dev/null || echo 0)"
  if awk -v d="$duration" -v m="$MAX_DURATION" 'BEGIN { exit !(d > m + 0.05) }'; then
    echo "TRIM  $slug (orphan, ${duration}s -> ${MAX_DURATION}s)"
    tmp="${file}.tmp.mp4"
    ffmpeg -hide_banner -loglevel error -nostdin -y -i "$file" \
      -t "$MAX_DURATION" \
      -c:v libx264 -crf "$CRF" -preset "$PRESET" \
      -maxrate "$MAXRATE" -bufsize "$BUFSIZE" \
      -profile:v high -pix_fmt yuv420p \
      -movflags +faststart \
      -an \
      "$tmp"
    mv "$tmp" "$file"
    ffmpeg -hide_banner -loglevel error -nostdin -y \
      -ss 00:00:01 -i "$file" \
      -vf "scale=480:-2" \
      -q:v 4 -frames:v 1 \
      "$OUT_DIR/${slug}-poster.jpg"
  fi
done < <(find "$OUT_DIR" -maxdepth 1 -name '*-web.mp4' -print0 | sort -z)

echo ""
echo "Optimización completada en $OUT_DIR"
