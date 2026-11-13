export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Position {
  r: number;
  c: number;
}

export interface MissionLayout {
  id: number;
  name: string;
  badge: string;
  difficulty: "Sangat Mudah" | "Mudah" | "Menengah" | "Menantang" | "Master";
  gridSize: number;
  startPos: Position;
  rocketPos: Position;
  targetDescription: string;
  meteors: Position[];
  stars: Position[];
  description: string;
  hint: string;
}

export const DIRECTION_INFO: Record<
  Direction,
  { label: string; icon: string; color: string; bg: string; border: string }
> = {
  UP: {
    label: "ATAS",
    icon: "⬆️",
    color: "text-sky-300",
    bg: "bg-sky-600 hover:bg-sky-500 active:bg-sky-700",
    border: "border-sky-400",
  },
  DOWN: {
    label: "BAWAH",
    icon: "⬇️",
    color: "text-blue-300",
    bg: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700",
    border: "border-blue-400",
  },
  LEFT: {
    label: "KIRI",
    icon: "⬅️",
    color: "text-amber-300",
    bg: "bg-amber-600 hover:bg-amber-500 active:bg-amber-700",
    border: "border-amber-400",
  },
  RIGHT: {
    label: "KANAN",
    icon: "➡️",
    color: "text-indigo-300",
    bg: "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700",
    border: "border-indigo-400",
  },
};

export const MISSION_LAYOUTS: MissionLayout[] = [
  {
    id: 1,
    name: "Slide 1: Langkah Pertama",
    badge: "Level 1: Sangat Mudah (5x5)",
    difficulty: "Sangat Mudah",
    gridSize: 5,
    startPos: { r: 4, c: 0 }, // Pojok Kiri Bawah
    rocketPos: { r: 0, c: 4 }, // Pojok KANAN ATAS
    targetDescription: "Pojok Kanan Atas",
    meteors: [{ r: 2, c: 2 }],
    stars: [{ r: 4, c: 2 }],
    description: "Target roket ada di Kanan Atas. Pandu astronot melangkah maju dan ke atas!",
    hint: "Gunakan arah Kanan dan Atas menuju roket.",
  },
  {
    id: 2,
    name: "Slide 2: Mendarat ke Bawah",
    badge: "Level 2: Mudah (5x5)",
    difficulty: "Mudah",
    gridSize: 5,
    startPos: { r: 0, c: 0 }, // Pojok Kiri Atas
    rocketPos: { r: 4, c: 4 }, // Pojok KANAN BAWAH
    targetDescription: "Pojok Kanan Bawah",
    meteors: [
      { r: 1, c: 2 },
      { r: 3, c: 2 },
    ],
    stars: [
      { r: 0, c: 3 },
      { r: 4, c: 1 },
    ],
    description: "Posisi roket berpindah ke Kanan Bawah! Ayo gunakan tombol Bawah dan Kanan!",
    hint: "Astronot mulai dari Kiri Atas dan meluncur turun ke Kanan Bawah.",
  },
  {
    id: 3,
    name: "Slide 3: Menjelajah ke Kiri",
    badge: "Level 3: Menengah (6x6)",
    difficulty: "Menengah",
    gridSize: 6,
    startPos: { r: 5, c: 5 }, // Pojok Kanan Bawah
    rocketPos: { r: 0, c: 0 }, // Pojok KIRI ATAS
    targetDescription: "Pojok Kiri Atas",
    meteors: [
      { r: 4, c: 3 },
      { r: 2, c: 3 },
      { r: 1, c: 1 },
    ],
    stars: [
      { r: 5, c: 2 },
      { r: 2, c: 1 },
    ],
    description: "Sekarang roket berada di Kiri Atas! Pandu astronot berjalan ke Kiri dan Atas!",
    hint: "Astronot mulai dari Kanan Bawah menuju sudut Kiri Atas.",
  },
  {
    id: 4,
    name: "Slide 4: Pendaratan Orbit Utara",
    badge: "Level 4: Menantang (6x6)",
    difficulty: "Menantang",
    gridSize: 6,
    startPos: { r: 5, c: 0 }, // Pojok Kiri Bawah
    rocketPos: { r: 0, c: 3 }, // TENGAH ATAS (Bukan di pojok!)
    targetDescription: "Tengah Baris Atas",
    meteors: [
      { r: 4, c: 1 },
      { r: 3, c: 4 },
      { r: 2, c: 2 },
      { r: 1, c: 3 },
    ],
    stars: [
      { r: 5, c: 4 },
      { r: 2, c: 0 },
      { r: 1, c: 1 },
    ],
    description: "Roket tidak berada di pojok, melainkan di Tengah Atas galaksi!",
    hint: "Hitung kolom dengan teliti agar astronot berhenti tepat di roket.",
  },
  {
    id: 5,
    name: "Slide 5: Pusat Stasiun Antariksa",
    badge: "Level 5: Master (7x7)",
    difficulty: "Master",
    gridSize: 7,
    startPos: { r: 6, c: 0 }, // Pojok Kiri Bawah
    rocketPos: { r: 3, c: 3 }, // PUSAT INTI GRID (Tepat di tengah-tengah!)
    targetDescription: "Pusat Inti Galaksi (Tengah)",
    meteors: [
      { r: 2, c: 2 },
      { r: 2, c: 4 },
      { r: 4, c: 2 },
      { r: 4, c: 4 },
      { r: 5, c: 1 },
      { r: 1, c: 5 },
    ],
    stars: [
      { r: 6, c: 6 },
      { r: 0, c: 6 },
      { r: 0, c: 0 },
      { r: 6, c: 3 },
    ],
    description: "Misi Utama: Roket adalah Stasiun Pusat di tengah galaksi yang dikelilingi meteor!",
    hint: "Cari pintu masuk barat atau utara di antara cincin meteor menuju pusat stasiun.",
  },
];
