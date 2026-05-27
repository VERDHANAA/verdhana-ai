# Verdhana AI — Panduan Pemasangan Lengkap

> Panduan ini ditulis sesederhana mungkin. Ikuti satu per satu, jangan dilewat.

---

## Sebelum Mulai — Apa yang Kamu Butuhkan?

Bayangkan kamu mau masak. Sebelum masak, kamu perlu bahan-bahan dulu.
Nah, sebelum menjalankan aplikasi ini, kamu perlu **4 bahan** berikut:

| Bahan | Untuk apa | Biaya |
|---|---|---|
| **Node.js** | "Mesin" yang menjalankan aplikasi ini di komputermu | Gratis |
| **OpenRouter** | Layanan AI yang menghasilkan copy/teks | Ada free tier |
| **Supabase** | Tempat menyimpan data pengguna (login, daftar, dll) | Gratis |
| **Vercel** | Tempat "upload" aplikasimu ke internet | Gratis |

---

## BAGIAN 1 — Siapkan Komputer Kamu

### Langkah 1 · Pasang Node.js

Node.js itu ibarat "mesin" — tanpa ini aplikasinya tidak bisa jalan sama sekali.

1. Buka browser, pergi ke **nodejs.org**
2. Klik tombol besar bertuliskan **"LTS"** (jangan yang "Current")
3. Download file-nya, lalu buka dan install seperti install aplikasi biasa
4. Klik Next → Next → Install → Finish

**Cara cek apakah berhasil:**
Buka Terminal (Mac/Linux) atau Command Prompt (Windows), ketik:
```
node --version
```
Kalau muncul angka seperti `v20.11.0`, berarti berhasil. ✅

---

### Langkah 2 · Download Kode Aplikasinya

Kamu perlu mengambil kode aplikasi ini ke komputermu.

**Cara paling mudah — pakai Git:**

1. Buka Terminal / Command Prompt
2. Ketik perintah berikut (ganti `URL_REPO` dengan link repository GitHub-mu):

```bash
git clone URL_REPO
```

3. Setelah selesai, masuk ke folder-nya:

```bash
cd verdhana-ai
```

> **Tidak tahu cara pakai Terminal?**
> Di Windows: tekan tombol `Windows + R`, ketik `cmd`, tekan Enter.
> Di Mac: tekan `Command + Spasi`, ketik `terminal`, tekan Enter.

---

### Langkah 3 · Install Semua Paket yang Dibutuhkan

Masih di dalam Terminal, ketik:

```bash
npm install
```

Tunggu sampai selesai. Ini akan mendownload semua "bahan pendukung" aplikasi.
Prosesnya sekitar 1–3 menit tergantung kecepatan internet.

Kalau sudah selesai, lanjut ke bagian berikutnya.

---

## BAGIAN 2 — Buat Akun di Layanan yang Dibutuhkan

Aplikasi ini butuh beberapa layanan luar. Masing-masing harus kamu daftar sendiri
dan ambil "kunci API"-nya. Kunci API itu seperti **password rahasia** yang
membuktikan bahwa kamu punya izin pakai layanan itu.

---

### Langkah 4 · Buat API Key OpenRouter (WAJIB — ini yang bikin AI-nya jalan)

OpenRouter adalah "jembatan" antara aplikasimu dan berbagai model AI.

1. Buka **openrouter.ai** di browser
2. Klik **"Sign In"** → daftar pakai Google atau email
3. Setelah masuk, klik foto profil di pojok kanan atas
4. Pilih **"API Keys"**
5. Klik tombol **"Create Key"**
6. Beri nama bebas, misalnya `verdhana-ai`
7. **Salin kuncinya** — bentuknya seperti `sk-or-v1-xxxxxxxx`

> ⚠️ Simpan kunci ini baik-baik. Kalau hilang, kamu harus buat yang baru.
> Jangan bagikan kunci ini ke siapapun.

**Isi saldo OpenRouter (opsional untuk mulai):**
- Buka menu **"Credits"**
- Isi saldo minimal $5 untuk mulai (bisa pakai kartu kredit/PayPal)
- Tanpa saldo, AI-nya tidak akan menjawab

---

### Langkah 5 · Buat Project Supabase (untuk Login & Database)

Supabase adalah tempat menyimpan data pengguna — siapa saja yang sudah daftar,
password mereka, dll. Ibaratnya ini adalah "lemari arsip" aplikasimu.

1. Buka **supabase.com** di browser
2. Klik **"Start your project"** → daftar pakai GitHub atau email
3. Setelah masuk, klik **"New project"**
4. Isi formulir:
   - **Organization**: nama organisasimu (bebas)
   - **Name**: `verdhana-ai` (bebas)
   - **Database Password**: buat password yang kuat, **simpan baik-baik**
   - **Region**: pilih yang paling dekat denganmu (misal: Singapore)
5. Klik **"Create new project"**
6. Tunggu sekitar 1–2 menit sampai proyeknya siap

**Ambil kunci Supabase:**
1. Di sidebar kiri, klik ikon gerigi ⚙️ **"Project Settings"**
2. Klik **"API"**
3. Kamu akan melihat dua hal yang perlu disalin:
   - **Project URL** → bentuknya `https://xxxxxx.supabase.co`
   - **anon public** → kunci panjang yang dimulai dengan `eyJ...`

---

### Langkah 6 · Buat Database Table di Supabase

Ini ibarat membuat "laci-laci" di dalam lemari arsip tadi.

1. Di Supabase, klik menu **"SQL Editor"** di sidebar kiri
2. Klik **"New query"**
3. Copy-paste kode SQL berikut ke dalam kolom editor:

```sql
-- Tabel untuk menyimpan data pengguna
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamp with time zone default now()
);

-- Izin akses
alter table public.users enable row level security;

create policy "Users can view own data"
  on public.users for select
  using (auth.uid() = id);
```

4. Klik tombol **"Run"** (atau tekan `Ctrl + Enter`)
5. Kalau muncul tulisan "Success", berarti berhasil ✅

---

### Langkah 7 · Buat Akun Upstash Redis (untuk Membatasi Penggunaan)

Upstash digunakan agar satu pengguna tidak bisa pakai AI berkali-kali tanpa batas
(rate limiting). Ibaratnya ini adalah "petugas antrian".

1. Buka **upstash.com** di browser
2. Klik **"Sign Up"** → daftar pakai Google
3. Setelah masuk, klik **"Create database"**
4. Pilih:
   - **Name**: `verdhana-ai`
   - **Type**: Regional
   - **Region**: pilih yang dekat (misal: `ap-southeast-1` untuk Asia Tenggara)
5. Klik **"Create"**
6. Setelah database terbuat, scroll ke bawah ke bagian **"REST API"**
7. Salin dua hal:
   - **UPSTASH\_REDIS\_REST\_URL** → link `https://...upstash.io`
   - **UPSTASH\_REDIS\_REST\_TOKEN** → kunci panjang

---

### Langkah 8 · Buat Akun Resend (untuk Kirim Email Otomatis)

Resend digunakan untuk kirim email selamat datang ke pengguna baru.

1. Buka **resend.com** di browser
2. Klik **"Sign Up"** → daftar pakai GitHub atau email
3. Setelah masuk, klik **"API Keys"** di sidebar
4. Klik **"Create API Key"**
5. Beri nama `verdhana-ai`, klik **"Add"**
6. Salin kuncinya — bentuknya `re_xxxxxxxx`

> Kalau kamu belum punya domain sendiri, Resend hanya bisa kirim ke
> email kamu sendiri (mode testing). Itu sudah cukup untuk tahap awal.

---

## BAGIAN 3 — Hubungkan Semua Kunci ke Aplikasi

### Langkah 9 · Buat File `.env.local`

File ini adalah tempat menyimpan semua "kunci rahasia" tadi.
Aplikasi akan membaca file ini setiap kali dijalankan.

1. Di dalam folder `verdhana-ai`, buat file baru bernama **`.env.local`**
   (perhatikan ada titik di depan nama file)

2. Isi file tersebut seperti ini — ganti bagian `xxxxx` dengan kunci milikmu:

```
# Kunci OpenRouter (AI)
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Kunci Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx

# Kunci Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYxxxxx

# Kunci Resend (email)
RESEND_API_KEY=re_xxxxx
```

3. Simpan file-nya

> ⚠️ File `.env.local` JANGAN di-upload ke GitHub atau dibagikan ke siapapun.
> File ini sudah otomatis diabaikan oleh Git (ada di `.gitignore`).

---

## BAGIAN 4 — Jalankan Aplikasinya!

### Langkah 10 · Jalankan di Komputer (Mode Development)

Ini untuk melihat tampilan aplikasimu di komputer sendiri dulu,
sebelum di-upload ke internet.

1. Buka Terminal, pastikan kamu masih di folder `verdhana-ai`
2. Ketik:

```bash
npm run dev
```

3. Tunggu beberapa detik sampai muncul tulisan:
   ```
   ▲ Next.js 14.x.x
   - Local:   http://localhost:3000
   ```

4. Buka browser, ketik **`localhost:3000`** di address bar
5. Aplikasimu sudah jalan! 🎉

**Untuk menghentikan aplikasi:** tekan `Ctrl + C` di Terminal.

---

## BAGIAN 5 — Upload ke Internet (Deploy ke Vercel)

Sejauh ini aplikasi hanya bisa diakses dari komputermu sendiri.
Agar orang lain bisa mengaksesnya, kamu perlu "upload" ke Vercel.

### Langkah 11 · Upload Kode ke GitHub

Kalau kodenya belum ada di GitHub:

1. Buka **github.com** → Login → Klik tombol **"+"** di pojok kanan atas
2. Pilih **"New repository"**
3. Beri nama `verdhana-ai`, pilih **Private**, klik **"Create repository"**
4. Di Terminal, jalankan perintah berikut satu per satu:

```bash
git remote add origin https://github.com/USERNAME_KAMU/verdhana-ai.git
git branch -M main
git push -u origin main
```

Ganti `USERNAME_KAMU` dengan username GitHub-mu.

---

### Langkah 12 · Deploy ke Vercel

1. Buka **vercel.com** di browser
2. Klik **"Sign Up"** → Login dengan GitHub
3. Klik **"Add New → Project"**
4. Cari repository `verdhana-ai` → klik **"Import"**
5. Di halaman konfigurasi, **jangan ubah apapun dulu**
6. Klik **"Deploy"**

Vercel akan mulai proses build. Tunggu sekitar 2–3 menit.

> Kalau build **GAGAL** karena missing environment variables — itu normal!
> Lanjut ke langkah berikutnya.

---

### Langkah 13 · Tambahkan Kunci Rahasia ke Vercel

Ini penting — tanpa ini aplikasinya tidak akan bekerja di internet.

1. Setelah deploy selesai (sukses atau gagal), buka **dashboard Vercel**
2. Klik proyek `verdhana-ai`
3. Klik tab **"Settings"** di menu atas
4. Di sidebar kiri, klik **"Environment Variables"**
5. Tambahkan satu per satu semua kunci dari file `.env.local` tadi:

| Name | Value |
|---|---|
| `OPENROUTER_API_KEY` | `sk-or-v1-xxxxx` (isi kunci-mu) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxxxx` |
| `UPSTASH_REDIS_REST_URL` | `https://xxxxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN` | `AYxxxxx` |
| `RESEND_API_KEY` | `re_xxxxx` |

6. Setelah semua diisi, klik **"Save"**
7. Kembali ke tab **"Deployments"**
8. Klik tombol **"..."** di deployment terbaru → pilih **"Redeploy"**
9. Tunggu sampai selesai

Sekarang aplikasimu sudah online dengan URL seperti:
`https://verdhana-ai-xxxx.vercel.app` 🌐

---

## Selesai! Ringkasan Akhir

Kalau semua langkah sudah dilakukan, ini yang sudah kamu punya:

- ✅ Aplikasi jalan di komputer (`localhost:3000`)
- ✅ Aplikasi live di internet (link Vercel)
- ✅ AI bisa menghasilkan copy marketing (OpenRouter)
- ✅ Pengguna bisa daftar dan login (Supabase)
- ✅ Email selamat datang terkirim otomatis (Resend)
- ✅ Ada pembatas penggunaan (Upstash Redis)

---

## Pertanyaan yang Sering Ditanyakan

**Q: Muncul error "Module not found" saat `npm install`**
A: Hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.

**Q: AI tidak menjawab, muncul error**
A: Cek apakah `OPENROUTER_API_KEY` sudah diisi dengan benar di file `.env.local`.
Cek juga saldo di dashboard OpenRouter.

**Q: Halaman login/signup tidak bisa dipakai**
A: Pastikan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah diisi dengan benar.

**Q: Perubahan di kode tidak muncul di Vercel**
A: Jalankan `git add . && git commit -m "update" && git push`. Vercel otomatis rebuild setiap kali ada push ke GitHub.

---

*Verdhana AI · Dibuat untuk para marketer di seluruh dunia.*
