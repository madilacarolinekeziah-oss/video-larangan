import type {Shot} from "../data/timing";

export type ShotProps = {shot: Shot};

/** Lebar tag/chip kira-kira dari panjang teks. */
export const chipWidth = (text: string, size = 44) => Math.round(text.length * size * 0.62 + 70);
