# Panduan Menjalankan & Hosting Website Portofolio (InfinityFree)

Website portofolio ini dibangun menggunakan **React.js + Vite + Tailwind CSS + Three.js + GSAP + Lenis** dengan estetika **Glassmorphism**.

---

## 🚀 1. Menjalankan di Komputer Lokal (Development)

1. Buka terminal di folder project `d:\portofolio`:
   ```bash
   npm install
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   ```
3. Buka URL yang muncul di browser (biasanya `http://localhost:5173`).

---

## 📦 2. Membangun File Statis untuk InfinityFree (Build)

Karena InfinityFree adalah hosting statis (Apache/cPanel), kita cukup menghasilkan file statis yang telah diminifikasi dan dioptimasi oleh Vite:

1. Jalankan perintah build:
   ```bash
   npm run build
   ```
2. Setelah selesai, Vite akan membuat folder baru bernama **`dist/`**.
   Di dalam folder `dist/` terdapat:
   - `index.html`
   - `.htaccess` (Konfigurasi otomatis untuk Apache InfinityFree)
   - `assets/` (kumpulan script JavaScript, CSS, dan aset yang sudah di-bundle)

---

## 🌐 3. Langkah Upload ke InfinityFree

1. Login ke akun [InfinityFree](https://www.infinityfree.com/) Anda dan buka **Control Panel (cPanel)** atau **Client Area**.
2. Masuk ke **Online File Manager** (atau hubungkan menggunakan **FileZilla** dengan kredensial FTP akun Anda).
3. Buka folder **`htdocs/`**.
   *(Catatan: Hapus file default bawaan seperti `index2.html` jika ada).*
4. **Unggah (Upload) seluruh isi di dalam folder `dist/`** langsung ke dalam folder `htdocs/`.
   - Pastikan file `index.html` berada persis di root `htdocs/` (misal: `htdocs/index.html`).
   - Folder `assets/` dan file `.htaccess` juga harus ikut terunggah.
5. Selesai! Buka domain / subdomain InfinityFree Anda di browser, dan website portofolio profesional Anda akan langsung tampil dengan efek 3D Three.js dan animasi GSAP 60 FPS.
