import os
import requests
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("LINKEDIN_ACCESS_TOKEN", "").strip()

# Meminta data info user berdasarkan token Anda
res = requests.get(
    "https://api.linkedin.com/v2/userinfo",
    headers={"Authorization": f"Bearer {token}"}
)

if res.status_code == 200:
    sub_id = res.json().get("sub")
    print("\n" + "="*40)
    print("Salin baris ini ke file .env Anda:")
    print(f"LINKEDIN_PERSON_URN=urn:li:person:{sub_id}")
    print("="*40 + "\n")
else:
    print(f"Gagal mengambil ID ({res.status_code}):", res.text)