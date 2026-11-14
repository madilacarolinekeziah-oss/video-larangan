# Tiga Larangan dalam Bisnis Islam — Video Remotion 9:16

Animasi 2D flat-vector (SVG) 1080×1920, 30 FPS, MP4. Presenter chibi berhijab abu-abu + karakter pendukung,
adegan contoh kasus untuk **riba, maysir, risywah**, subtitle sinkron, musik latar lembut, dan efek suara sederhana.

## Menjalankan

```bash
npm install            # pasang dependensi (butuh internet, termasuk font Baloo 2 via @remotion/google-fonts)
npm run start          # preview di Remotion Studio (composition: TigaLarangan)
npm run build          # render -> out/tiga-larangan.mp4
npm run typecheck      # npx tsc --noEmit
```

Render manual: `npx remotion render src/index.ts TigaLarangan out/tiga-larangan.mp4`

## Struktur

```
public/narasi.mp3            suara narasi final (hanya dibaca durasinya, tidak diproses)
public/bgm.mp3               musik latar instrumental (disintesis, boleh diganti)
public/sfx/*.wav             pop, coin, whoosh, ding, buzz
src/data/timing.ts           <-- SEMUA waktu adegan, subtitle, dan cue efek suara ada di sini
src/Root.tsx                 Composition; durasi = durasi narasi + 1 detik (dibaca otomatis dari mp3)
src/MainVideo.tsx            menyusun shot, transisi, subtitle, audio
src/components/characters/   Presenter.tsx (tokoh utama), Person.tsx (karakter pendukung)
src/components/backgrounds/  latar pasar, kantor, toko, wahana permainan, ruang tender, dst.
src/components/props/        uang, amplop, dadu, timbangan, perisai, grafik, dst.
src/components/              Subtitle, AudioTrack, ShotFrame (transisi), Stage
src/scenes/                  satu komponen per jenis adegan + registry.ts
scripts/detect-pauses.mjs    bantuan opsional untuk menentukan startSec
```

## Mengatur waktu adegan

Tidak ada file SRT, jadi durasi setiap shot dihitung otomatis dari panjang teks (proporsional terhadap durasi audio).
Karena ini perkiraan, beberapa pergantian adegan bisa meleset beberapa detik dari suara.
Cara menyetel (tanpa mengubah kode lain), di `src/data/timing.ts`:

1. Lihat di Studio kapan sebuah kalimat mulai diucapkan (atau jalankan `npm run pauses` untuk daftar jeda hening).
2. Tambahkan `startSec: <detik>` pada shot yang bersangkutan. Shot di antara dua jangkar dibagi ulang otomatis.
3. `weight` bisa dipakai untuk memperpanjang/memperpendek satu shot tanpa jangkar.

Pengaturan lain di file yang sama: `INCLUDE_SALAM` (naskah .txt memuat salam pembuka/penutup; set `false`
kalau audio tidak membacanya), `SPEECH_START_SEC`, `TAIL_SEC`, `MUSIC_VOLUME`, `SFX_CUES`.

## Catatan konten

- Subtitle mengikuti `narasi_tiga_larangan.txt`. Contoh maysir di sana adalah investasi yang menjanjikan untung besar
  tanpa kegiatan usaha jelas dan hanya spekulasi; ilustrasinya dibuat sebagai mesin permainan "UNTUNG BESAR!" dengan
  poster janji untung dan tulisan SPEKULASI, jadi tetap terbaca sebagai perjudian/untung-untungan.
- Kata kunci RIBA, MAYSIR, RISYWAH, MUDHARABAH, MUSYARAKAH otomatis disorot kuning di subtitle.

## Cara paling mudah (pemula)
- Windows: klik dua kali `RENDER-WINDOWS.bat`
- Mac: klik dua kali `RENDER-MAC.command` (kalau diblokir: klik kanan > Open)
Videonya muncul di folder `out`.
