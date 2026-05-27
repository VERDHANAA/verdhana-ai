# Verdhana AI — Panduan Pemasangan di Android (Termux)

> Panduan ini khusus untuk pengguna Android yang memakai Termux.
> Ikuti urutan langkahnya, jangan dilewat satu pun.

---

## Apa itu Termux?

Termux adalah aplikasi Android yang berfungsi seperti terminal/command prompt
di komputer. Dengan Termux, kamu bisa menjalankan aplikasi berbasis kode
langsung dari HP Android.

---

## BAGIAN 1 — Siapkan Termux

### Langkah 1 · Install Termux yang Benar

> ⚠️ Jangan install Termux dari Play Store — versinya sudah usang dan
> tidak diupdate lagi. Pakai F-Droid.

1. Buka browser di HP-mu, pergi ke **f-droid.org**
2. Download aplikasi F-Droid, install (izinkan "install dari sumber tidak dikenal")
3. Buka F-Droid → cari **"Termux"**
4. Install Termux dari F-Droid

---

### Langkah 2 · Update Termux Setelah Pertama Kali Dibuka

Buka Termux, lalu ketik perintah ini dan tekan Enter:

```bash
pkg update && pkg upgrade
```

Kalau muncul pertanyaan `[Y/n]` → ketik `Y` lalu Enter.
Tunggu sampai selesai (bisa 2–5 menit tergantung internet).

---

### Langkah 3 · Izinkan Termux Akses Penyimpanan HP

Supaya Termux bisa baca/tulis file di HP-mu:

```bash
termux-setup-storage
```

Akan muncul popup izin di HP → pilih **"Izinkan"** / **"Allow"**.

---

### Langkah 4 · Install Node.js dan Git

Dua alat ini wajib ada. Ketik perintah berikut:

```bash
pkg install nodejs git
```

Kalau muncul pertanyaan `[Y/n]` → ketik `Y` lalu Enter.
Tunggu sampai selesai.

**Cek apakah berhasil:**
```bash
node --version
git --version
```

Kalau muncul angka versi seperti `v20.x.x` dan `git version 2.x.x` → berhasil ✅

---

## BAGIAN 2 — Download Kode Aplikasi

### Langkah 5 · Clone Repository

Ganti `URL_REPO` dengan link GitHub repository-mu:

```bash
git clone URL_REPO
```

Contoh:
```bash
git clone https://github.com/namakamu/verdhana-ai.git
```

Setelah selesai, masuk ke folder aplikasi:

```bash
cd verdhana-ai
```

---

### Langkah 6 · Install Semua Paket

```bash
npm install
```

Tunggu sampai selesai. Di HP proses ini bisa lebih lama dari komputer,
sekitar 3–10 menit. Jangan panik kalau lama.

> Kalau muncul error `ENOMEM` (kehabisan memori), coba tutup semua
> aplikasi lain di HP lalu jalankan ulang `npm install`.

---

## BAGIAN 3 — Buat Akun di Layanan yang Dibutuhkan

Buka browser di HP-mu untuk mendaftar ke layanan-layanan berikut.

---

### Langkah 7 · Buat API Key OpenRouter *(WAJIB — ini yang bikin AI jalan)*

1. Buka **openrouter.ai**
2. Daftar pakai Google atau email
3. Setelah masuk → klik foto profil → **"API Keys"**
4. Klik **"Create Key"** → beri nama bebas → salin kuncinya

Bentuknya: `sk-or-v1-xxxxxxxxxxxxxxxx`

> Tanpa kunci ini, fitur AI tidak akan berfungsi sama sekali.

---

### Langkah 8 · Buat Project Supabase *(untuk Login & Database)*

1. Buka **supabase.com**
2. Daftar pakai GitHub atau email
3. Klik **"New project"**
4. Isi: nama project `verdhana-ai`, buat password database, pilih region **Singapore**
5. Tunggu 1–2 menit sampai project siap
6. Pergi ke **Settings → API**, salin dua hal:
   - **Project URL** → `https://xxxxxx.supabase.co`
   - **anon public** → kunci panjang `eyJxxxx...`

**Buat tabel database:**
1. Di Supabase → klik **"SQL Editor"** → **"New query"**
2. Copy-paste kode ini:

```sql
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamp with time zone default now()
);

alter table public.users enable row level security;

create policy "Users can view own data"
  on public.users for select
  using (auth.uid() = id);
```

3. Klik **"Run"** → muncul "Success" ✅

---

### Langkah 9 · Buat Database Upstash Redis *(untuk Pembatas Penggunaan)*

1. Buka **upstash.com**
2. Daftar pakai Google
3. Klik **"Create database"** → nama `verdhana-ai` → region **Singapore**
4. Setelah dibuat, scroll ke bagian **"REST API"**, salin:
   - **URL** → `https://xxxxx.upstash.io`
   - **Token** → kunci panjang

---

### Langkah 10 · Buat API Key Resend *(untuk Kirim Email Otomatis)*

1. Buka **resend.com**
2. Daftar pakai GitHub atau email
3. Klik **"API Keys"** → **"Create API Key"**
4. Salin kuncinya → bentuknya `re_xxxxxxxx`

---

## BAGIAN 4 — Isi Kunci Rahasia

### Langkah 11 · Buat File `.env.local` di Termux

Kembali ke Termux. Pastikan kamu sudah di dalam folder `verdhana-ai`.
Kalau belum, ketik dulu:

```bash
cd verdhana-ai
```

Buat file `.env.local` menggunakan editor `nano`:

```bash
nano .env.local
```

Layar akan berubah menjadi editor teks. Ketik atau paste isinya:

```
OPENROUTER_API_KEY=sk-or-v1-xxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYxxxxx
RESEND_API_KEY=re_xxxxx
```

Ganti semua `xxxxx` dengan kunci milikmu.

**Cara paste di Termux:** tahan layar beberapa detik → pilih **"Paste"**

**Cara simpan file di nano:**
1. Tekan `Ctrl + X`
2. Muncul pertanyaan "Save?" → tekan `Y`
3. Tekan `Enter`

File tersimpan ✅

---

## BAGIAN 5 — Jalankan Aplikasi

### Langkah 12 · Jalankan di HP (Mode Development)

```bash
npm run dev
```

Tunggu sampai muncul:
```
▲ Next.js 14.x.x
- Local:   http://localhost:3000
```

Sekarang buka browser di HP-mu, ketik:
```
localhost:3000
```

Aplikasinya jalan di HP-mu! 🎉

**Untuk menghentikan:** tekan `Ctrl + C` di Termux.

> **Catatan:** Selama `npm run dev` berjalan, jangan tutup Termux.
> Kalau Termux tertutup, aplikasi berhenti. Untuk membiarkan berjalan
> di background, geser Termux ke belakang (jangan tutup).

---

## BAGIAN 6 — Upload ke Internet (Deploy ke Vercel)

Supaya orang lain bisa mengakses aplikasimu, deploy ke Vercel.

### Langkah 13 · Siapkan Akun GitHub dan Push Kode

Kalau belum punya akun GitHub:
1. Buka **github.com** → daftar
2. Buat repository baru bernama `verdhana-ai` (pilih Private)

Konfigurasi Git di Termux (ganti dengan data milikmu):

```bash
git config --global user.email "emailkamu@gmail.com"
git config --global user.name "Nama Kamu"
```

Hubungkan dan upload kode:

```bash
git remote set-url origin https://github.com/USERNAME/verdhana-ai.git
git add .
git commit -m "first deploy"
git push -u origin main
```

Saat diminta username/password GitHub:
- Username: username GitHub-mu
- Password: **bukan password biasa** — kamu perlu buat **Personal Access Token**

**Cara buat Personal Access Token GitHub:**
1. Di GitHub → klik foto profil → **Settings**
2. Scroll paling bawah → **Developer settings**
3. **Personal access tokens → Tokens (classic)**
4. Klik **"Generate new token (classic)"**
5. Centang **repo**, scroll bawah → **"Generate token"**
6. Salin tokennya (hanya muncul sekali!)
7. Gunakan token ini sebagai "password" saat git push

---

### Langkah 14 · Deploy ke Vercel

1. Buka **vercel.com** di browser HP
2. Login dengan GitHub
3. Klik **"Add New → Project"**
4. Pilih repository `verdhana-ai` → klik **"Import"**
5. Klik **"Deploy"** (biarkan semua default)

---

### Langkah 15 · Tambahkan Kunci Rahasia ke Vercel

1. Di dashboard Vercel → klik proyek `verdhana-ai`
2. Klik **"Settings"** → **"Environment Variables"**
3. Tambahkan satu per satu:

| Name | Value |
|---|---|
| `OPENROUTER_API_KEY` | kunci OpenRouter-mu |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase-mu |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key Supabase-mu |
| `UPSTASH_REDIS_REST_URL` | URL Upstash-mu |
| `UPSTASH_REDIS_REST_TOKEN` | token Upstash-mu |
| `RESEND_API_KEY` | kunci Resend-mu |

4. Klik **"Save"**
5. Kembali ke **"Deployments"** → klik **"..."** → **"Redeploy"**

Aplikasimu sekarang bisa diakses siapa saja lewat link Vercel! 🌐

---

## Masalah Umum di Termux

**`npm install` error: `ENOMEM`**
→ HP kehabisan RAM. Tutup semua aplikasi lain, coba lagi.

**`npm install` sangat lama atau hang**
→ Tambahkan flag ini: `npm install --legacy-peer-deps`

**`git push` minta password terus**
→ Simpan kredensial agar tidak ditanya terus:
```bash
git config --global credential.helper store
```
Lalu push sekali lagi dengan memasukkan username + token. Selanjutnya tidak akan ditanya lagi.

**Termux tertutup sendiri saat `npm run dev`**
→ Aktifkan "Acquire Wakelock" di notifikasi Termux agar tidak dimatikan sistem.

**Layar Termux terlalu kecil, susah ketik**
→ Instal keyboard **Hacker's Keyboard** dari Play Store — ada tombol Ctrl, Tab, dan tanda baca lengkap.

---

## Ringkasan Perintah Penting

```bash
# Masuk ke folder proyek
cd verdhana-ai

# Jalankan aplikasi
npm run dev

# Buka aplikasi di browser HP
# → ketik localhost:3000 di browser

# Upload perubahan ke GitHub
git add .
git commit -m "pesan perubahan"
git push
```

---

*Verdhana AI · Dibuat untuk para marketer di seluruh dunia.*
