/**
 * ============================================================
 *  DATA WAKTU ADEGAN — EDIT DI SINI
 * ============================================================
 * Tidak ada file SRT, jadi pembagian waktu dihitung otomatis:
 * durasi audio dibagi ke setiap shot sebanding dengan panjang teks
 * (karakter + jeda per kalimat).
 *
 * Untuk mengunci waktu manual: isi `startSec` pada shot yang kamu mau
 * (detik di audio narasi saat shot itu mulai). Shot di antara dua
 * "jangkar" akan dibagi ulang secara proporsional.
 * Jalankan `npm run pauses` untuk melihat daftar jeda di audio
 * sebagai bantuan menentukan startSec.
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const NARRATION_FILE = "narasi.mp3";
/** Cadangan saja. Durasi asli dibaca otomatis dari audio (Root.tsx). */
export const NARRATION_SEC = 130.43;
export const TAIL_SEC = 1; // jeda diam di akhir video

/** Kalau audio diawali hening, isi detik mulai bicara di sini. */
export const SPEECH_START_SEC = 0;
/** Detik narasi selesai. null = sampai akhir audio. */
export const SPEECH_END_SEC: number | null = null;

export const TRANSITION_FRAMES = 10;

/** Naskah .txt memuat salam pembuka & penutup. Ubah ke false kalau audio tidak membacanya. */
export const INCLUDE_SALAM = true;

export const MUSIC_FILE = "bgm.mp3";
export const MUSIC_VOLUME = 0.11; // jauh di bawah narasi (1.0)

export type TopicKey = "riba" | "maysir" | "risywah";
export type ViewKey =
  | "greeting"
  | "market"
  | "triple"
  | "topicIntro"
  | "topicSolution"
  | "ribaStory"
  | "partnerStory"
  | "maysirStory"
  | "symbolStory"
  | "tradeStory"
  | "bribeStory"
  | "fairStory"
  | "conclusion"
  | "closing";

export interface ShotDef {
  id: string;
  view: ViewKey;
  topic?: TopicKey;
  /** Subtitle — satu per baris tampil, berurutan. */
  captions: string[];
  /** Jangkar waktu manual (detik di audio). */
  startSec?: number;
  /** Bobot manual (default: panjang teks). */
  weight?: number;
}

const SALAM_OPEN = INCLUDE_SALAM ? ["Assalamu'alaikum warahmatullahi wabarakatuh."] : [];
const SALAM_CLOSE = INCLUDE_SALAM ? ["Wassalamu'alaikum warahmatullahi wabarakatuh."] : [];

export const SHOTS: ShotDef[] = [
  // ---- ADEGAN 1: PEMBUKAAN ----
  {
    id: "s1-greeting",
    view: "greeting",
    captions: [
      ...SALAM_OPEN,
      "Dalam kegiatan bisnis, Islam tidak hanya mengatur cara memperoleh keuntungan,",
    ],
  },
  {
    id: "s1-market",
    view: "market",
    captions: ["tetapi juga memperhatikan bagaimana keuntungan tersebut didapatkan."],
  },
  // ---- ADEGAN 2: TIGA LARANGAN ----
  {
    id: "s2-triple",
    view: "triple",
    captions: ["Ada tiga praktik yang dilarang dalam Islam,", "yaitu riba, maysir, dan risywah."],
  },
  // ---- ADEGAN 3: RIBA ----
  {
    id: "s3-riba-intro",
    view: "topicIntro",
    topic: "riba",
    captions: ["Pertama, riba.", "Riba merupakan tambahan yang disyaratkan dalam transaksi pinjaman."],
  },
  {
    id: "s3-riba-story",
    view: "ribaStory",
    captions: [
      "Contohnya, seorang pengusaha meminjam uang sebesar Rp10 juta,",
      "tetapi harus mengembalikan Rp12 juta karena adanya bunga.",
    ],
  },
  {
    id: "s3-riba-solution",
    view: "topicSolution",
    topic: "riba",
    captions: ["Solusinya, bisnis Islam menawarkan sistem kerja sama seperti mudharabah dan musyarakah,"],
  },
  {
    id: "s3-riba-partner",
    view: "partnerStory",
    captions: ["dengan pembagian keuntungan berdasarkan kesepakatan."],
  },
  // ---- ADEGAN 4: MAYSIR ----
  {
    id: "s4-maysir-intro",
    view: "topicIntro",
    topic: "maysir",
    captions: ["Kedua, maysir.", "Maysir adalah praktik perjudian atau memperoleh keuntungan"],
  },
  {
    id: "s4-maysir-luck",
    view: "symbolStory",
    topic: "maysir",
    captions: ["dengan mengandalkan keberuntungan dan pertaruhan."],
  },
  {
    id: "s4-maysir-story",
    view: "maysirStory",
    captions: [
      "Contohnya, investasi yang menjanjikan keuntungan besar",
      "tanpa kegiatan usaha yang jelas",
      "dan hanya mengandalkan spekulasi.",
    ],
  },
  {
    id: "s4-maysir-solution",
    view: "topicSolution",
    topic: "maysir",
    captions: ["Solusinya adalah menjalankan bisnis dengan transaksi yang nyata,"],
  },
  {
    id: "s4-maysir-trade",
    view: "tradeStory",
    captions: ["objek yang jelas, serta perencanaan dan pengelolaan risiko yang baik."],
  },
  // ---- ADEGAN 5: RISYWAH ----
  {
    id: "s5-risywah-intro",
    view: "topicIntro",
    topic: "risywah",
    captions: ["Ketiga, risywah.", "Risywah merupakan tindakan suap untuk memperoleh keuntungan"],
  },
  {
    id: "s5-risywah-shortcut",
    view: "symbolStory",
    topic: "risywah",
    captions: ["atau kemudahan secara tidak benar."],
  },
  {
    id: "s5-risywah-story",
    view: "bribeStory",
    captions: [
      "Contohnya, seorang pengusaha memberikan uang kepada panitia tender",
      "agar perusahaannya memenangkan proyek.",
    ],
  },
  {
    id: "s5-risywah-solution",
    view: "topicSolution",
    topic: "risywah",
    captions: ["Solusinya adalah menerapkan kejujuran, transparansi,", "dan persaingan bisnis yang sehat"],
  },
  {
    id: "s5-risywah-fair",
    view: "fairStory",
    captions: ["tanpa suap maupun penyalahgunaan wewenang."],
  },
  // ---- ADEGAN 6: KESIMPULAN ----
  {
    id: "s6-conclusion",
    view: "conclusion",
    captions: [
      "Dari ketiga larangan tersebut, dapat disimpulkan bahwa bisnis Islam",
      "tidak hanya berorientasi pada keuntungan,",
      "tetapi juga mengutamakan keadilan, kejujuran, dan keberkahan.",
    ],
  },
  {
    id: "s6-closing",
    view: "closing",
    captions: [
      "Sebab, bisnis yang baik bukan hanya bisnis yang menghasilkan banyak keuntungan,",
      "melainkan bisnis yang diperoleh dengan cara halal dan tidak merugikan orang lain.",
      ...SALAM_CLOSE,
    ],
  },
];

/** Efek suara sederhana. `at` = posisi 0..1 di dalam shot. */
export interface SfxCue {
  shot: string;
  at: number;
  file: "pop.wav" | "coin.wav" | "whoosh.wav" | "ding.wav" | "buzz.wav";
  volume?: number;
}

export const SFX_CUES: SfxCue[] = [
  {shot: "s2-triple", at: 0.6, file: "pop.wav"},
  {shot: "s2-triple", at: 0.74, file: "pop.wav"},
  {shot: "s2-triple", at: 0.88, file: "pop.wav"},
  {shot: "s3-riba-story", at: 0.16, file: "coin.wav"},
  {shot: "s3-riba-story", at: 0.56, file: "pop.wav"},
  {shot: "s3-riba-story", at: 0.8, file: "buzz.wav", volume: 0.18},
  {shot: "s3-riba-partner", at: 0.3, file: "pop.wav"},
  {shot: "s3-riba-partner", at: 0.68, file: "coin.wav"},
  {shot: "s3-riba-partner", at: 0.82, file: "ding.wav", volume: 0.25},
  {shot: "s4-maysir-luck", at: 0.5, file: "coin.wav"},
  {shot: "s5-risywah-shortcut", at: 0.52, file: "whoosh.wav", volume: 0.2},
  {shot: "s5-risywah-shortcut", at: 0.74, file: "buzz.wav", volume: 0.18},
  {shot: "s4-maysir-story", at: 0.22, file: "coin.wav"},
  {shot: "s4-maysir-story", at: 0.32, file: "coin.wav"},
  {shot: "s4-maysir-story", at: 0.42, file: "coin.wav"},
  {shot: "s4-maysir-story", at: 0.9, file: "buzz.wav", volume: 0.18},
  {shot: "s4-maysir-trade", at: 0.2, file: "coin.wav"},
  {shot: "s4-maysir-trade", at: 0.55, file: "pop.wav"},
  {shot: "s5-risywah-story", at: 0.5, file: "whoosh.wav", volume: 0.2},
  {shot: "s5-risywah-story", at: 0.86, file: "buzz.wav", volume: 0.18},
  {shot: "s5-risywah-fair", at: 0.3, file: "pop.wav"},
  {shot: "s5-risywah-fair", at: 0.8, file: "ding.wav", volume: 0.25},
  {shot: "s6-conclusion", at: 0.58, file: "pop.wav"},
  {shot: "s6-conclusion", at: 0.72, file: "pop.wav"},
  {shot: "s6-conclusion", at: 0.86, file: "ding.wav", volume: 0.25},
];

// ------------------------------------------------------------------
//  Penghitung timeline (tidak perlu diedit)
// ------------------------------------------------------------------
export interface CaptionTiming {
  start: number;
  end: number;
  text: string;
}
export interface Shot extends ShotDef {
  index: number;
  startFrame: number;
  durationFrames: number;
  captionTimings: CaptionTiming[];
}
export interface Timeline {
  shots: Shot[];
  captions: CaptionTiming[];
  totalFrames: number;
}

const weightOf = (s: ShotDef) =>
  s.weight ?? s.captions.reduce((a, c) => a + c.length + 8, 0);

export function buildTimeline(audioSec: number, fps: number = FPS): Timeline {
  const n = SHOTS.length;
  const t0 = SPEECH_START_SEC;
  const t1 = SPEECH_END_SEC ?? audioSec;

  const anchors: {i: number; t: number}[] = [{i: 0, t: t0}];
  SHOTS.forEach((s, i) => {
    if (i > 0 && s.startSec !== undefined) anchors.push({i, t: s.startSec});
  });
  anchors.push({i: n, t: t1});

  const times: number[] = new Array(n + 1).fill(0);
  for (let a = 0; a < anchors.length - 1; a++) {
    const A = anchors[a];
    const B = anchors[a + 1];
    let total = 0;
    for (let i = A.i; i < B.i; i++) total += weightOf(SHOTS[i]);
    let acc = 0;
    for (let i = A.i; i < B.i; i++) {
      times[i] = A.t + ((B.t - A.t) * acc) / total;
      acc += weightOf(SHOTS[i]);
    }
  }
  times[n] = t1;

  const totalFrames = Math.ceil((audioSec + TAIL_SEC) * fps);
  const shots: Shot[] = [];
  const captions: CaptionTiming[] = [];

  for (let i = 0; i < n; i++) {
    const def = SHOTS[i];
    const startFrame = i === 0 ? 0 : Math.round(times[i] * fps);
    const endFrame = i === n - 1 ? totalFrames : Math.round(times[i + 1] * fps);

    const cw = def.captions.map((c) => c.length + 8);
    const cwTotal = cw.reduce((a, b) => a + b, 0);
    const span = times[i + 1] - times[i];
    let acc = 0;
    const captionTimings: CaptionTiming[] = def.captions.map((text, k) => {
      const s = times[i] + (span * acc) / cwTotal;
      acc += cw[k];
      const e = times[i] + (span * acc) / cwTotal;
      return {start: Math.round(s * fps), end: Math.round(e * fps), text};
    });
    captions.push(...captionTimings);

    shots.push({
      ...def,
      index: i,
      startFrame,
      durationFrames: Math.max(1, endFrame - startFrame),
      captionTimings,
    });
  }
  return {shots, captions, totalFrames};
}
