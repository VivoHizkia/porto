# Spec Desain: Website Portofolio Vivo Hizkia Imanuel

Tanggal: 2026-11-12
Status: menunggu review

## 1. Tujuan

Website portofolio satu halaman untuk melamar kerja sebagai Full-Stack Developer.
Pembacanya recruiter dan tech lead. Dalam waktu singkat mereka harus bisa melihat:
siapa pemiliknya, apa yang bisa dibangun, bukti berupa proyek nyata, dan cara menghubungi.

Kriteria berhasil:

- Dalam satu layar pertama terbaca nama, role, dan tombol menuju proyek dan kontak.
- Setiap proyek unggulan punya deskripsi jelas, daftar teknologi, dan link ke GitHub (dan live demo bila ada).
- Situs tampil baik di desktop dan HP, dan tetap bisa dipakai bila 3D dimatikan.
- `npm run build` lolos tanpa error.

## 2. Keputusan yang sudah disepakati

| Hal | Keputusan |
|---|---|
| Lokasi | folder `portofolio/` |
| Tujuan | melamar kerja |
| Bahasa teks situs | Inggris |
| Role di hero | Full-Stack Developer |
| Sumber proyek | repo publik GitHub `VivoHizkia` |
| Kontak | telepon/WhatsApp 0812-1121-1030, email, GitHub |

Asumsi (belum dikonfirmasi eksplisit): tema gelap, satu halaman, tanpa backend, deploy ke Vercel.

## 3. Stack

- Vite + React 19 + TypeScript
- Three.js lewat `@react-three/fiber` (dan `@react-three/drei` bila perlu)
- CSS biasa dengan custom properties (tanpa framework CSS; satu halaman tidak membutuhkannya)
- Tanpa router, tanpa state management, tanpa backend

Alternatif yang ditolak: Next.js (terlalu berat untuk satu halaman statis) dan
HTML polos + Three.js (kurang menunjukkan kemampuan React).

## 4. Struktur halaman

Navigasi atas menempel (sticky): nama di kiri, link ke About, Projects, Contact di kanan.

### 4.1 Hero

- Nama: "Vivo Hizkia Imanuel"
- Role: "Full-Stack Developer"
- Satu kalimat ringkas tentang apa yang dibangun (web app full-stack dan otomasi berbasis AI dengan TypeScript).
- Tombol: "View projects" (scroll ke Projects) dan "Contact me" (scroll ke Contact).
- Latar: scene Three.js. Satu bentuk geometris wireframe (icosahedron) yang berputar pelan,
  dikelilingi partikel. Kamera bergeser sedikit mengikuti posisi mouse.

### 4.2 About

- Paragraf singkat. Hanya memuat hal yang terbukti dari repo; tidak ada klaim pengalaman kerja
  atau pendidikan kecuali pemilik memberikannya.
- Skill per kelompok, diambil dari stack yang benar-benar dipakai di repo:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS, Vite
  - Backend: Node.js, Hono, Express, Prisma
  - Database: PostgreSQL, SQLite
  - AI & Automation: Gemini API, Claude API, retrieval BM25, bot trading rule-based
  - Lainnya: Python, Git, Vercel

### 4.3 Featured projects (kartu besar)

| Proyek | Repo | Ringkasan | Teknologi | Live |
|---|---|---|---|---|
| Trading Floor | Ai-agent-trading | Bot futures crypto rule-based (Binance USDT-M) dengan backtest walk-forward, Risk Engine, notifikasi Telegram, dan dashboard "kantor virtual" isometrik | TypeScript, Next.js, Node.js | - |
| TemplateBin | TEMPLATEBIN | Marketplace multi-vendor template website: seller menulis HTML/CSS, buyer mengisi konten lewat editor dengan preview langsung, lalu bayar untuk publish | Next.js 16, Prisma, SQLite, Tailwind | - |
| PlacidWay Knowledge Chatbot | Built-chatbot-assessment | Chatbot yang hanya menjawab dari halaman sumber, selalu menyertakan link sumber, dan menolak menebak bila tidak ada jawabannya | Next.js 16, TypeScript, BM25, Gemini | https://built-chatbot-assessment.vercel.app |
| Accounting System | accounting-system | Sistem akuntansi full-stack dengan autentikasi JWT | Hono, Prisma, React, PostgreSQL | - |

### 4.4 More projects (kartu kecil)

| Proyek | Repo | Ringkasan | Teknologi |
|---|---|---|---|
| Klipin | klipin | Tool konten media sosial berbasis AI: generator, hashtag, library, dan penjadwal dengan ekspor kalender | React, Express, Claude API |
| Saham Detections | sahamdetections | Deteksi sinyal saham dari indikator teknikal | Python |
| Todo Undo/Redo | todolist | Todo list dengan riwayat undo dan redo | React, TypeScript |
| Invoice App | frontend | Aplikasi invoice dengan mode gelap/terang | React, Vite |
| Task System | testcode | Sistem penjadwalan dan eksekusi task | Python |

Tidak ditampilkan: repo fork (invoice-internal-fe, invoice-internal-be, BlockNest, BengkelOnline),
`porto` (portofolio lama), dan `Fishing-Tycon` (kosong).

Sebelum menulis deskripsi final, kode Klipin, Saham Detections, Invoice App, dan Task System
dibaca dulu supaya ringkasannya akurat. Ringkasan di tabel ini berasal dari struktur file saja.

### 4.5 Contact

- Email: `mailto:` (alamat perlu dikonfirmasi, lihat bagian 9)
- WhatsApp/telepon: +62 812-1121-1030, link `https://wa.me/6281211211030`
- GitHub: https://github.com/VivoHizkia

### 4.6 Footer

Nama dan tahun.

## 5. Arah visual

- Tema gelap: latar hampir hitam kebiruan, teks terang, satu warna aksen (cyan/teal) yang juga
  dipakai di scene 3D.
- Tipografi: satu font sans untuk isi, font mono untuk label kecil dan tag teknologi.
- Kartu proyek dengan border tipis; saat hover border berubah ke warna aksen dan kartu naik sedikit.
- Tiap bagian muncul dengan animasi fade + geser halus saat masuk viewport.

## 6. Struktur kode

```
portofolio/
  index.html
  package.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    styles/global.css          token warna, tipografi, layout dasar
    data/profile.ts            nama, role, tagline, kontak, skill
    data/projects.ts           daftar proyek (featured + lainnya)
    components/
      Nav.tsx
      Hero.tsx
      HeroScene.tsx            scene Three.js, dimuat lazy
      About.tsx
      Projects.tsx
      ProjectCard.tsx
      Contact.tsx
      Footer.tsx
      Reveal.tsx               pembungkus animasi muncul saat scroll
    hooks/
      usePrefersReducedMotion.ts
```

Batas tanggung jawab:

- `data/*` adalah satu-satunya sumber konten. Komponen tidak menyimpan teks proyek sendiri,
  jadi menambah proyek cukup dengan mengubah satu file.
- `HeroScene` tidak tahu apa pun tentang konten; hanya menggambar latar.
- `Reveal` hanya mengurus animasi muncul lewat IntersectionObserver.

Data proyek ditulis manual di `projects.ts`, tidak diambil dari API GitHub saat runtime.
Alasannya: repo tidak punya deskripsi di GitHub, jadi teksnya memang harus ditulis sendiri,
dan situs tidak bergantung pada rate limit API.

## 7. Kinerja, aksesibilitas, dan kegagalan

- `HeroScene` dimuat dengan `React.lazy`; teks hero tampil lebih dulu tanpa menunggu Three.js.
- Bila `prefers-reduced-motion` aktif: scene 3D tidak berputar dan animasi scroll dimatikan.
- Bila WebGL tidak tersedia atau scene gagal dimuat: hero memakai latar gradien statis.
  Error boundary membungkus scene supaya kegagalan 3D tidak merusak halaman.
- Di layar kecil jumlah partikel dikurangi dan pixel ratio dibatasi maksimal 2.
- HTML semantik (`header`, `main`, `section`, `footer`), heading berurutan, kontras teks cukup,
  semua link bisa dijangkau keyboard dengan fokus yang terlihat. Canvas diberi `aria-hidden`.
- Link keluar memakai `target="_blank"` dengan `rel="noreferrer"`.
- Meta dasar: title, description, Open Graph, favicon.

## 8. Verifikasi

- `npm run build` dan pemeriksaan TypeScript lolos.
- Dicek di browser pada lebar desktop (1440px) dan HP (390px): tidak ada scroll horizontal,
  semua bagian terbaca, semua link menuju tujuan yang benar.
- Dicek dengan reduced motion aktif.

Tidak ada unit test: situs ini hanya menampilkan konten statis dan tidak punya logika bisnis
yang layak diuji secara terpisah.

## 9. Di luar cakupan

- Blog, CMS, form kontak dengan backend, mode terang, dua bahasa.
- Deploy ke Vercel dan domain (bisa dikerjakan setelah situs jadi).
- Foto profil dan CV unduhan (bisa ditambahkan bila filenya diberikan).

## 10. Hal yang masih perlu dikonfirmasi

1. **Alamat email.** Yang diberikan `vivoianuel22@gmail.com`; kemungkinan maksudnya
   `vivoimanuel22@gmail.com` (dengan huruf "m"). Spec ini memakai yang kedua sampai dikonfirmasi.
2. Bio tambahan (pendidikan, pengalaman, lokasi) bila ingin ditampilkan di About.
