// Bantuan opsional: menampilkan jeda hening di narasi.mp3 untuk membantu mengisi `startSec`
// di src/data/timing.ts. Hanya MEMBACA audio (tidak mengubahnya). Butuh ffmpeg di PATH.
import {spawnSync} from "node:child_process";

const file = process.argv[2] ?? "public/narasi.mp3";
const r = spawnSync("ffmpeg", ["-i", file, "-af", "silencedetect=noise=-35dB:d=0.35", "-f", "null", "-"], {
  encoding: "utf8",
});
const out = (r.stderr ?? "") + (r.stdout ?? "");
const lines = out.split("\n").filter((l) => l.includes("silence_start") || l.includes("silence_end"));
if (!lines.length) {
  console.log("Tidak ada jeda terdeteksi (atau ffmpeg tidak ditemukan).");
} else {
  console.log("Jeda di audio (detik):");
  lines.forEach((l) => console.log(l.replace(/^.*\] /, "")));
  console.log("\nGunakan akhir jeda (silence_end) sebagai `startSec` shot berikutnya.");
}
