import os
import requests
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("LINKEDIN_ACCESS_TOKEN", "").strip()

print(f"Token length: {len(token)}")
print(f"Token preview: {token[:10]}...{token[-5:]}")

# Test ke endpoint userinfo
res = requests.get(
    "https://api.linkedin.com/v2/userinfo",
    headers={"Authorization": f"Bearer {token}"}
)

print("\nHTTP Status:", res.status_code)
print("Response:", res.text)