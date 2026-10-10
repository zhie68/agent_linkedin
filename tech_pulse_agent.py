import os
import time
import requests
import feedparser
from google import genai
from google.genai import errors, types
from dotenv import load_dotenv

load_dotenv()

import re

# --- 1. Aggregator: Ambil Berita Teknologi Terkini ---
RSS_FEEDS = [
    # Global Tech & Business Media
    {"name": "TechCrunch", "url": "https://techcrunch.com/feed/"},
    {"name": "The Verge", "url": "https://www.theverge.com/rss/index.xml"},
    {"name": "Hacker News", "url": "https://news.ycombinator.com/rss"},
    {"name": "Wired Tech", "url": "https://www.wired.com/feed/rss"},
    {"name": "Ars Technica", "url": "https://feeds.arstechnica.com/arstechnica/index"},
    
    # Software Engineering & Developer Ecosystem
    {"name": "DEV Community", "url": "https://dev.to/feed"},
    {"name": "GitHub Blog", "url": "https://github.blog/feed/"},
    
    # Indonesian Technology & Startup Media
    {"name": "DailySocial ID", "url": "https://dailysocial.id/feed"},
    {"name": "Detikinet", "url": "https://inet.detik.com/rss"}
]

def clean_html(text: str) -> str:
    """Bersihkan tag HTML dari teks ringkasan berita."""
    clean = re.sub(r'<[^>]+>', '', text)
    return " ".join(clean.split())

def fetch_tech_news(limit_per_feed=2) -> list[dict]:
    articles = []
    seen_links = set()

    for feed_info in RSS_FEEDS:
        url = feed_info["url"] if isinstance(feed_info, dict) else feed_info
        source = feed_info["name"] if isinstance(feed_info, dict) else url.split("/")[2]

        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:limit_per_feed]:
                link = entry.get("link", "")
                title = entry.get("title", "").strip()
                if not link or link in seen_links or not title:
                    continue
                
                seen_links.add(link)
                raw_summary = entry.get("summary", "") or entry.get("description", "")
                summary = clean_html(raw_summary)[:280]

                articles.append({
                    "source": source,
                    "title": title,
                    "link": link,
                    "summary": summary
                })
        except Exception as e:
            print(f"⚠️ Gagal mengambil feed ({source}): {e}")

    return articles

# --- 2. AI Agent: Filter & Tulis Postingan LinkedIn ---
def generate_linkedin_post(articles: list[dict], max_retries: int = 4, return_metadata: bool = False):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

    articles_context = "\n\n".join(
        [f"- [{a.get('source', 'Tech News')}] Judul: {a['title']}\n  Link: {a['link']}\n  Ringkasan: {a['summary']}" for a in articles]
    )

    prompt = f"""
    Peran: Kamu adalah seorang software engineer / tech practitioner senior di Indonesia.
    Kamu menulis catatan santai tapi berbobot di LinkedIn untuk sesama praktisi, tech lead, dan developer.

    Konteks Berita:
    {articles_context}

    Tugas:
    Pilih 2 isu paling relevan dari konteks di atas, lalu tulis postingan LinkedIn berbahasa Indonesia dengan gaya mengalir, tajam, dan realistis.

    Aturan Penulisan (PENTING):
    1. Gaya Bahasa & Nada:
    - Gunakan sudut pandang orang pertama jamak ("kita" atau "tim kita").
    - Bahasa semi-formal profesional, natural seperti obrolan teknis di kantor (bukan gaya artikel berita formal atau motivator). Istilah teknis biarkan dalam bahasa Inggris (italic/apa adanya).
    - Variasikan panjang kalimat. Hindari kalimat yang terlalu berbunga-bunga atau puitis.

    2. Struktur & Alur:
    - Pembuka: Mulai langsung ke observasi konkret atau kontras masalah di industri saat ini. JANGAN gunakan kalimat pembuka klise seperti "Kemajuan teknologi bergerak lebih cepat daripada...", "Di era disrupsi...", dsb.
    - Isi: Jabarkan 2 isu tersebut secara mengalir. Sambungkan fakta berita langsung dengan dampaknya di lapangan/sistem produksi.
    - JANGAN gunakan template berulang seperti "👉 Mengapa ini penting:" atau format sub-judul yang kaku dan simetris di setiap poin.
    - Hapus kutipan/punchline bergaya quotes motivasi (misal: "High-tech threats are exploiting low-tech mistakes"). Sampaikan esensi pesannya dengan bahasa kerja biasa.

    3. Penutup:
    - Akhiri dengan 1 refleksi atau pertanyaan diskusi praktis yang santai (bukan pertanyaan formal template HR/marketing seperti "Bagaimana strategi organisasi Anda saat ini?").
    - Maksimal 3 hashtag relevan di baris paling bawah.
    - JANGAN gunakan format markdown seperti bintang satu (*) untuk italic atau bintang dua (**) untuk bold. Tulis istilah teknis apa adanya sebagai teks biasa tanpa tanda bintang karena akan diposting langsung ke LinkedIn.

    Output:
    Keluarkan HANYA teks draf postingan tanpa komentar pengantar atau penutup.
    """

    candidate_models = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-2.5-flash"]
    last_error = None

    for model_name in candidate_models:
        for attempt in range(1, max_retries + 1):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                draft_text = response.text.strip()

                # Extract token usage metadata from Gemini response
                usage_meta = getattr(response, "usage_metadata", None)
                prompt_tokens = getattr(usage_meta, "prompt_token_count", 0) if usage_meta else 0
                candidates_tokens = getattr(usage_meta, "candidates_token_count", 0) if usage_meta else 0
                thoughts_tokens = getattr(usage_meta, "thoughts_token_count", 0) if usage_meta else 0
                total_tokens = getattr(usage_meta, "total_token_count", 0) if usage_meta else 0

                # Fallback estimation if usage_metadata is missing
                if not total_tokens:
                    prompt_tokens = int(len(prompt.split()) * 1.3)
                    candidates_tokens = int(len(draft_text.split()) * 1.3)
                    total_tokens = prompt_tokens + candidates_tokens

                if return_metadata:
                    return {
                        "draft": draft_text,
                        "model_used": model_name,
                        "usage": {
                            "prompt_tokens": prompt_tokens,
                            "completion_tokens": candidates_tokens,
                            "thoughts_tokens": thoughts_tokens,
                            "total_tokens": total_tokens
                        }
                    }
                return draft_text
            except (errors.ServerError, errors.APIError, Exception) as e:
                last_error = e
                err_msg = str(e)
                if "503" in err_msg or "UNAVAILABLE" in err_msg or "capacity" in err_msg or "high demand" in err_msg:
                    wait_time = attempt * 2
                    print(f"⚠️ Model {model_name} sedang sibuk (503 UNAVAILABLE). Mencoba lagi dalam {wait_time}s... ({attempt}/{max_retries})")
                    time.sleep(wait_time)
                else:
                    break

    if last_error:
        raise last_error
    raise RuntimeError("Gagal menghasilkan postingan dengan model Gemini.")

# --- 3. LinkedIn Publisher: Post ke Feed Pribadi ---
def post_to_linkedin(post_content: str) -> None:
    access_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    author_urn = os.getenv("LINKEDIN_PERSON_URN") # Format: urn:li:person:sub_id_anda

    url = "https://api.linkedin.com/v2/ugcPosts"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202401"
    }

    payload = {
        "author": author_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": post_content
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    resp = requests.post(url, headers=headers, json=payload)
    if resp.status_code == 201:
        msg = "✅ Berhasil dipublikasikan ke LinkedIn!"
        print(msg)
        return {"success": True, "message": msg, "data": resp.json()}
    else:
        msg = f"Gagal posting ({resp.status_code}): {resp.text}"
        print(msg)
        return {"success": False, "message": msg, "error": resp.text, "status_code": resp.status_code}

# --- Eksekusi Pipeline ---
if __name__ == "__main__":
    print("Mengumpulkan berita...")
    news = fetch_tech_news()

    print("Menganalisis & menyusun konten...")
    draft = generate_linkedin_post(news)
    print("\n--- DRAF POSTINGAN ---\n")
    print(draft)
    print("\n-----------------------\n")

    # Mode konfirmasi manual sebelum tayang otomatis:
    confirm = input("Kirim ke LinkedIn sekarang? (y/n): ")
    if confirm.lower() == "y":
        post_to_linkedin(draft)
    else:
        print("Pengiriman dibatalkan.")
