# Misi Luar Angkasa: Game Edukasi Coding SD Kelas 2

Aplikasi edukasi coding berbasis web (SPA) menggunakan **Next.js (App Router)**, **React (TypeScript)**, dan **Tailwind CSS**. Game ini dirancang khusus untuk dimainkan di kelas melalui layar proyektor guna mengenalkan konsep algoritma sekuensial kepada siswa sekolah dasar (SD kelas 2).

---

## 🎮 5 Slide dengan Variasi Posisi Roket & Tingkat Kesulitan

Agar permainan semakin dinamis dan menantang, setiap slide memiliki penempatan titik awal astronot dan posisi roket yang berbeda:

1. **Slide 1: Langkah Pertama (Level 1: Sangat Mudah - Grid 5x5)**
   - **Posisi Awal Astronot**: Pojok Kiri Bawah `(5, 1)`
   - **Posisi Target Roket**: **Pojok Kanan Atas** `(1, 5)`
   - **Rintangan**: 1 meteor di tengah luar jalur utama `(3, 3)`.
   - **Fokus Pembelajaran**: Mengenal pergerakan ke Kanan dan ke Atas. Terdapat tombol **NEXT SLIDE 2** di header dan dialog kemenangan.

2. **Slide 2: Mendarat ke Bawah (Level 2: Mudah - Grid 5x5)**
   - **Posisi Awal Astronot**: Pojok Kiri Atas `(1, 1)`
   - **Posisi Target Roket**: **Pojok Kanan Bawah** `(5, 5)`
   - **Rintangan**: 2 meteor penghalang `(2, 3)` dan `(4, 3)`.
   - **Fokus Pembelajaran**: Siswa belajar mengarahkan astronot bergerak ke **BAWAH** dan ke Kanan.

3. **Slide 3: Menjelajah ke Kiri (Level 3: Menengah - Grid 6x6)**
   - **Posisi Awal Astronot**: Pojok Kanan Bawah `(6, 6)`
   - **Posisi Target Roket**: **Pojok Kiri Atas** `(1, 1)`
   - **Rintangan**: 3 meteor statis `(5, 4)`, `(3, 4)`, dan `(2, 2)`.
   - **Fokus Pembelajaran**: Melatih siswa menggunakan tombol arah **KIRI** dan Atas (arah berlawanan).

4. **Slide 4: Pendaratan Orbit Utara (Level 4: Menantang - Grid 6x6)**
   - **Posisi Awal Astronot**: Pojok Kiri Bawah `(6, 1)`
   - **Posisi Target Roket**: **Tengah Baris Atas** `(1, 4)` *(bukan di pojok!)*
   - **Rintangan**: 4 meteor membentuk celah `(5, 2)`, `(4, 5)`, `(3, 3)`, dan `(2, 4)`.
   - **Fokus Pembelajaran**: Siswa belajar menghitung jumlah langkah kolom secara presisi agar tidak terlewat dari roket.

5. **Slide 5: Pusat Stasiun Antariksa (Level 5: Master - Grid 7x7)**
   - **Posisi Awal Astronot**: Pojok Kiri Bawah `(7, 1)`
   - **Posisi Target Roket**: **Pusat Inti Grid / Tengah-Tengah** `(4, 4)`
   - **Rintangan**: Cincin 6 meteor yang mengelilingi stasiun roket dengan celah pintu masuk.
   - **Bintang**: 4 bintang kristal energi di sudut-sudut terluar galaksi.
   - **Fokus Pembelajaran**: Rute labirin di mana target berada di tengah pulau asteroid. Siswa mencari gerbang masuk menuju stasiun utama. Dilengkapi piala emas selebrasi tamat.

---

## 📂 Struktur Berkas Komponen

Halaman utama [`app/page.tsx`](file:///home/bezethade/Documents/project/materi-kelas/app/page.tsx) terjaga ringkas dengan hanya **84 baris**:

- [`components/types.ts`](file:///home/bezethade/Documents/project/materi-kelas/components/types.ts): Konfigurasi 5 slide/level (`MISSION_LAYOUTS`).
- [`components/useSpaceGame.ts`](file:///home/bezethade/Documents/project/materi-kelas/components/useSpaceGame.ts): Logika antrean langkah, jeda waktu 500ms, suara, dan validasi.
- [`components/Header.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/Header.tsx): Navigasi slide (Next/Prev dan tab 1-5), suara, jeda kecepatan, dan fullscreen.
- [`components/GameBoard.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/GameBoard.tsx): Grid responsif (5x5, 6x6, 7x7), astronot, roket, meteor, dan bintang.
- [`components/CommandQueue.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/CommandQueue.tsx): Visualisasi deretan perintah dan tombol hapus 1 langkah (*undo*).
- [`components/DirectionPad.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/DirectionPad.tsx): 4 tombol arah berukuran besar.
- [`components/ActionButtons.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/ActionButtons.tsx): Tombol JALANKAN dan RESET.
- [`components/FeedbackBanner.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/FeedbackBanner.tsx): Umpan balik status misi.
- [`components/WinModal.tsx`](file:///home/bezethade/Documents/project/materi-kelas/components/WinModal.tsx): Pop-up selebrasi dan tombol menuju slide berikutnya.
- [`components/sound.ts`](file:///home/bezethade/Documents/project/materi-kelas/components/sound.ts): Audio sintetis Web Audio API dan efek konfeti.

---

## 🚀 Cara Menjalankan

```bash
npm run dev
```

Buka `http://localhost:3000` di peramban dan hubungkan ke proyektor kelas.
