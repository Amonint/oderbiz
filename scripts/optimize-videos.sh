#!/usr/bin/env bash
# Comprime videos de /assets/hero y /assets/aboutus para web.
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
  local slug
  slug="$(basename "$input" | sed -E 's/\.[Mm][Oo][Vv]$//; s/\.[Mm][Pp]4$//')"
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

while IFS= read -r -d '' file; do
  encode_one "$file"
done < <(find "$ROOT/public/assets/hero" "$ROOT/public/assets/aboutus" \
  -type f \( -iname '*.mov' -o -iname '*.mp4' \) -print0 | sort -z)

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
