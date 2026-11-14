#!/bin/bash
cd "$(dirname "$0")"
echo "=== Membuat video Tiga Larangan Bisnis Islam ==="
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js belum terpasang. Halaman download dibuka: pilih LTS, pasang, lalu buka file ini lagi."
  open https://nodejs.org
  read -p "Tekan Enter untuk menutup"; exit 1
fi
if [ ! -d node_modules ]; then
  echo "[1/2] Memasang bahan-bahan (2-5 menit, perlu internet)..."
  npm install || { echo "GAGAL memasang."; read -p "Enter"; exit 1; }
fi
echo "[2/2] Membuat video (sekitar 10-20 menit, jangan ditutup)..."
npm run build || { echo "GAGAL. Foto layar ini dan kirim ke Claude."; read -p "Enter"; exit 1; }
echo "SELESAI! Videonya ada di folder out (tiga-larangan.mp4)."
open out
read -p "Tekan Enter untuk menutup"
