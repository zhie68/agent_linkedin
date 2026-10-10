# 🏢 Tech Pulse AI — 2D Autonomous Office & LinkedIn Content Pipeline

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-Web%20Framework-000000.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-3.8%20Flash-8E75B2.svg?logo=google&logoColor=white)](https://ai.google.dev/)
[![LinkedIn API](https://img.shields.io/badge/LinkedIn-REST%20v2%20ugcPosts-0A66C2.svg?logo=linkedin&logoColor=white)](https://developer.linkedin.com/)
[![Canvas 2D](https://img.shields.io/badge/Frontend-Vanilla%20Canvas%202D-f59e0b.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> **Tech Pulse AI** adalah dashboard simulasi kantor virtual 2D bergaya *cyberpunk pixel-art* yang mengotomatisasi seluruh siklus kurasi berita teknologi, penulisan konten dengan Google Gemini AI, moderasi editorial *Human-in-the-Loop*, dan penerbitan langsung ke LinkedIn via REST API v2.

---

## 🌟 Highlight Fitur Utama

### 1. 👥 Tim Agen Otonom (The 4 Office Agents)
Setiap meja kerja di kantor virtual 2D diisi oleh agen khusus dengan peran dan perilaku unik:
* 📡 **Station 1: Scout (RSS Radar Scanner)**: Mengumpulkan dan memfilter berita teknologi terkini dari 9 portal global & lokal (TechCrunch, The Verge, Hacker News, Wired, Ars Technica, DEV Community, GitHub Blog, DailySocial, Detikinet).
* ✨ **Station 2: Pulse (Gemini AI Studio)**: Menggunakan model `gemini-3.8-flash` / `gemini-2.5-flash` untuk menganalisis tren, merangkum fakta utama, dan menyusun draf postingan LinkedIn yang profesional dan berbobot.
* 👑 **Station 4: Boss (Chief Editor Desk)**: *Human-in-the-Loop Approval Gate*. Naskah ditahan di meja Chief Editor untuk ditinjau, diedit secara langsung, dan disetujui oleh editor manusia sebelum disiarkan.
* 💼 **Station 3: Link (LinkedIn Gateway Hub)**: Mengelola otorisasi OAuth 2.0 dan menyiarkan naskah terotorisasi langsung ke profil LinkedIn pengguna melalui endpoint REST v2 `ugcPosts`.

---

### 2. ⏪ "Time-Travel Replay" (Scrubber Riwayat Pipeline)
* **Investigasi & Audit DVR**: Baris waktu di atas terminal log memungkinkan pengguna menggeser slider mundur (-30m, -18m, -10m, -5m, hingga LIVE).
* **Retro CCTV Viewfinder**: Menampilkan efek visual rekaman investigasi lengkap dengan scanlines CRT, indikator berkedip `REC [PLAY/PAUSED] CAM 04`, serta merekonstruksi posisi agen dan aliran data pada momen tersebut.
* **Kontrol Playback**: Mendukung tombol Play/Pause serta pengaturan kecepatan `1x` dan `2x`.

---

### 3. 🔍 Live Infinite Canvas Zoom, Pan & Retro Radar Minimap
* **Smooth Infinite Canvas**:
  * **Zoom**: Scroll mouse (wheel) dengan titik anchor otomatis berpusat pada kursor.
  * **Pan**: Drag kanvas untuk menggeser ruangan kantor.
  * **Toolbar Kamera**: Tombol cepat `➕`, `➖`, dan `🔍 100% Reset` di pojok kanan atas kanvas.
* **Retro Radar Minimap (Gaya RTS)**:
  * Terletak di pojok kiri bawah dengan grid radar berputar.
  * Menampilkan titik koordinat (*blips*) seluruh agen secara real-time.
  * Menampilkan kotak *wireframe* bidang pandang kamera yang interaktif (dapat diklik untuk melompat ke area tertentu).

---

### 4. 🏗️ Interactive Node-Graph Mode (Spatial Workflow Builder)
* **Koneksi Kabel Bebas**: Mengaktifkan tombol `🏗️ Builder` akan membuka soket `PORT [IN/OUT] 🔌` pada setiap stasiun. Pengguna dapat mengklik dan menarik kabel neon antar meja untuk memodifikasi topologi alur kerja.
* **Furniture Inventory Palette**: Tambahkan stasiun kerja baru secara modular:
  * 🎨 **Station 5: Imagen 3 Studio** (AI Visual Generator)
  * 💬 **Station 6: Discord Hub** (Webhook Relay & Notifikasi Komunitas)
  * 🐦 **Station 7: Twitter / X Broadcaster** (Multi-platform Publishing)
  * 🔄 **Reset Topologi**: Mengembalikan kabel dan stasiun ke alur default 4-stasiun.

---

### 5. 💬 Dinamika "Co-Working" & Gamifikasi Mendalam
* **Contextual Speech Bubble Chatter**:
  * Ketika kuota token menipis (>90%): Pulse memperingatkan: *"Token tipis, bos! Tolong hemat prompt! 🪙💦"*
  * Saat scraping gagal: Scout menampilkan dialog: *"Target website dilindungi Cloudflare, retrying... 🛡️💧"*
  * Saat limit LinkedIn 429 tercapai: Link memperingatkan: *"Rate limit LinkedIn 429! Cooldown protokol aktif ⏳"*
* **Autonomous Lounge Break**: Saat tidak ada pekerjaan pipeline selama beberapa menit, para agen otomatis berjalan ke coffee lounge dan water cooler untuk beristirahat.

---

### 6. 🛡️ Human-in-the-Loop Content Approval Drawer
* **Side-by-Side Split View Drawer**: Drawer interaktif selebar 510px menampilkan ringkasan artikel sumber di sebelah kiri dan editor draf LinkedIn di sebelah kanan.
* **Inline Editor & Auto Counter**: Dilengkapi dengan penghitung karakter, estimasi waktu baca, serta preview tampilan kartu LinkedIn yang realistis.

---

## 📁 Struktur Direktori

```text
linkedin/
├── app.py                     # Server backend Flask & API routes
├── tech_pulse_agent.py        # Core agent: RSS scraper, Gemini client, & LinkedIn publisher
├── generateurn.py             # Script utilitas untuk mengecek profil & URN LinkedIn
├── cek.py                     # Script verifikasi koneksi REST API LinkedIn
├── templates/
│   └── index.html             # Antarmuka dashboard kantor 2D virtual & modul HUD
├── static/
│   ├── css/
│   │   └── office.css         # Styling cyberpunk dark-mode, pixel-art tiles, & drawer
│   └── js/
│       └── office.js          # Canvas 2D engine, state machine agen, replay, & builder
├── .env.example               # Template environment variables
├── .gitignore                 # Konfigurasi file yang diabaikan git
└── README.md                  # Dokumentasi proyek
```

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat
* **Python 3.10+** terinstal di sistem Anda.
* Akun **Google AI Studio** untuk mendapatkan `GEMINI_API_KEY`.
* Akun **LinkedIn Developer** dengan akses aplikasi untuk `Share on LinkedIn` (`r_liteprofile` / `w_member_social`).

### 2. Kloning Repositori
```bash
git clone https://github.com/zhie68/agent_linkedin.git
cd agent_linkedin
```

### 3. Buat dan Aktifkan Virtual Environment
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 4. Instalasi Dependensi
```bash
pip install flask python-dotenv google-genai feedparser requests
```

### 5. Konfigurasi Environment (`.env`)
Buat file `.env` di root direktori proyek:
```env
# Google Gemini AI API Key
GEMINI_API_KEY=AIzaSy...

# LinkedIn OAuth 2.0 Credentials
LINKEDIN_ACCESS_TOKEN=AQV...
LINKEDIN_PERSON_URN=urn:li:person:YOUR_PERSON_ID
```

> **Tips Mendapatkan Person URN:**
> Jalankan script pembantu:
> ```bash
> python generateurn.py
> ```
> Script ini akan memanggil endpoint LinkedIn `/v2/userinfo` dan menampilkan `sub` (ID person) akun Anda.

### 6. Jalankan Aplikasi
```bash
python app.py
```
Buka browser dan akses antarmuka dashboard pada:
👉 **`http://127.0.0.1:5000`**

---

## 📡 API Endpoints

| Metode | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/status` | Mengambil status koneksi API, status agen, dan metrik kuota token Gemini. |
| `GET` | `/api/news` | Mengambil berita terbaru yang telah difilter dari 9 portal RSS. |
| `POST` | `/api/generate` | Meminta Gemini AI merumuskan draf konten LinkedIn dari artikel terpilih. |
| `POST` | `/api/publish` | Menerbitkan konten final yang telah disetujui ke LinkedIn REST API v2. |

---

## 🛠️ Teknologi yang Digunakan

* **Backend**: Python, Flask, `google-genai` SDK, `feedparser`, `requests`, `python-dotenv`.
* **Frontend**: HTML5 Semantic, Canvas 2D API, Modern Vanilla JavaScript (ES6+), Vanilla CSS (Cyberpunk dark mode, Glassmorphism).
* **Audio FX**: Web Audio API (efek suara langkah kaki, sinyal radar, beep klik, dan lonceng suksesi tanpa aset audio eksternal).

---

## 📜 Lisensi
Didistribusikan di bawah lisensi MIT. Silakan gunakan dan kembangkan untuk kebutuhan pribadi maupun komersial.
