@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ==============================================
echo   Membuat video Tiga Larangan Bisnis Islam
echo ==============================================
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js belum terpasang di komputer ini.
  echo Halaman download akan dibuka. Pilih tombol LTS, pasang,
  echo lalu klik dua kali file ini lagi.
  start https://nodejs.org
  pause
  exit /b
)
if not exist node_modules (
  echo.
  echo [1/2] Memasang bahan-bahan, tunggu 2-5 menit. Pastikan internet aktif...
  call npm install
  if errorlevel 1 (
    echo GAGAL memasang. Cek internet lalu coba lagi.
    pause
    exit /b
  )
)
echo.
echo [2/2] Membuat video, tunggu sekitar 10-20 menit. Jangan ditutup...
call npm run build
if errorlevel 1 (
  echo GAGAL membuat video. Foto/screenshot layar ini lalu kirim ke Claude.
  pause
  exit /b
)
echo.
echo SELESAI! Videonya ada di folder "out" (tiga-larangan.mp4).
if exist out explorer out
pause
