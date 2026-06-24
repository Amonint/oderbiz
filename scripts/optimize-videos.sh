#!/usr/bin/env bash
# Comprime videos de /assets/hero y /assets/aboutus para web.
# Calidad visual alta (CRF 20), máx. 1080px de ancho, sin audio (los clips van mute).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/videos/optimized"
CRF="${CRF:-20}"
PRESET="${PRESET:-slow}"
MAX_WIDTH="${MAX_WIDTH:-1080}"
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

  echo "ENCODE $slug"
  ffmpeg -hide_banner -loglevel error -nostdin -y -i "$input" \
    -vf "scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos" \
    -c:v libx264 -crf "$CRF" -preset "$PRESET" \
    -profile:v high -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$output"

  ffmpeg -hide_banner -loglevel error -nostdin -y \
    -ss 00:00:01 -i "$output" \
    -vf "scale=540:-2" \
    -q:v 3 -frames:v 1 \
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

echo ""
echo "Optimización completada en $OUT_DIR"
