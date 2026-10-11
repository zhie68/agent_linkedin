import os
import random
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
from tech_pulse_agent import fetch_tech_news, generate_linkedin_post, post_to_linkedin

load_dotenv()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/favicon.ico")
def favicon():
    return app.response_class("", status=204, mimetype="image/x-icon")

# Global Token Tracker for Gemini AI (Standard Free Tier / Daily Quota: 1,000,000 tokens)
TOKEN_QUOTA_DEFAULT = 1_000_000

token_tracker = {
    "quota": TOKEN_QUOTA_DEFAULT,
    "total_used": 0,
    "last_prompt_tokens": 0,
    "last_completion_tokens": 0,
    "last_total_tokens": 0,
    "last_model": "gemini-3.8-flash",
    "requests_count": 0
}

@app.route("/api/status", methods=["GET"])
def get_status():
    gemini_key = os.getenv("GEMINI_API_KEY")
    linkedin_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    person_urn = os.getenv("LINKEDIN_PERSON_URN")
    
    remaining = max(0, token_tracker["quota"] - token_tracker["total_used"])
    pct_used = round((token_tracker["total_used"] / token_tracker["quota"]) * 100, 2)

    return jsonify({
        "status": "online",
        "agent": "Tech Pulse AI - Virtual Office Agent v2.0",
        "has_gemini": bool(gemini_key and len(gemini_key) > 5),
        "has_linkedin": bool(linkedin_token and len(linkedin_token) > 5),
        "person_urn": person_urn or "urn:li:person:Not Configured",
        "tokens": {
            "quota": token_tracker["quota"],
            "total_used": token_tracker["total_used"],
            "remaining": remaining,
            "last_prompt": token_tracker["last_prompt_tokens"],
            "last_completion": token_tracker["last_completion_tokens"],
            "last_total": token_tracker["last_total_tokens"],
            "last_model": token_tracker["last_model"],
            "requests_count": token_tracker["requests_count"],
            "percentage_used": pct_used
        }
    })

@app.route("/api/news", methods=["GET"])
def api_fetch_news():
    try:
        limit = request.args.get("limit", default=3, type=int)
        articles = fetch_tech_news(limit_per_feed=limit)
        return jsonify({"success": True, "count": len(articles), "articles": articles})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/generate", methods=["POST"])
def api_generate_post():
    try:
        data = request.get_json() or {}
        articles = data.get("articles")
        
        # If articles not provided, fetch fresh news
        if not articles:
            articles = fetch_tech_news(limit_per_feed=3)
            
        gen_result = generate_linkedin_post(articles, return_metadata=True)
        draft = gen_result["draft"]
        model_used = gen_result["model_used"]
        usage = gen_result["usage"]

        # Update token tracker
        token_tracker["requests_count"] += 1
        token_tracker["last_prompt_tokens"] = usage["prompt_tokens"]
        token_tracker["last_completion_tokens"] = usage["completion_tokens"]
        token_tracker["last_thoughts_tokens"] = usage.get("thoughts_tokens", 0)
        token_tracker["last_total_tokens"] = usage["total_tokens"]
        token_tracker["total_used"] += usage["total_tokens"]
        token_tracker["last_model"] = model_used

        remaining = max(0, token_tracker["quota"] - token_tracker["total_used"])
        pct_used = round((token_tracker["total_used"] / token_tracker["quota"]) * 100, 2)

        return jsonify({
            "success": True,
            "draft": draft,
            "articles_used": len(articles),
            "model_used": model_used,
            "tokens": {
                "prompt_tokens": usage["prompt_tokens"],
                "completion_tokens": usage["completion_tokens"],
                "thoughts_tokens": usage.get("thoughts_tokens", 0),
                "total_tokens": usage["total_tokens"],
                "session_total_tokens": token_tracker["total_used"],
                "quota": token_tracker["quota"],
                "remaining_tokens": remaining,
                "percentage_used": pct_used
            }
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/publish", methods=["POST"])
def api_publish_post():
    try:
        data = request.get_json() or {}
        content = data.get("content")
        if not content:
            return jsonify({"success": False, "error": "Post content is required"}), 400
            
        result = post_to_linkedin(content)
        return jsonify(result)
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# In-Memory Collaborative Sticky Memos
pinned_memos = [
    {
        "id": "memo-1",
        "author": "Sarah (Editor)",
        "color": "#fef08a",
        "text": "Tolong cek draf jam 10 pagi ☕ — Pastikan tone profesional untuk audience enterprise.",
        "time": "08:30 WIB",
        "signed": True
    },
    {
        "id": "memo-2",
        "author": "Budi (DevOps)",
        "color": "#bae6fd",
        "text": "Latency Gemini 3.8 Flash stabil ~1.2s. Kuota token aman terkendali 🚀",
        "time": "09:15 WIB",
        "signed": True
    }
]

@app.route("/api/memos", methods=["GET", "POST"])
def handle_memos():
    if request.method == "POST":
        data = request.get_json() or {}
        text = data.get("text", "").strip()
        author = data.get("author", "Guest Member").strip()
        color = data.get("color", "#fef08a")
        if not text:
            return jsonify({"success": False, "error": "Memo text cannot be empty"}), 400
        new_memo = {
            "id": f"memo-{len(pinned_memos) + 1}-{int(request.date.timestamp() if request.date else 1)}",
            "author": author,
            "color": color,
            "text": text,
            "time": "Baru saja",
            "signed": True
        }
        pinned_memos.insert(0, new_memo)
        return jsonify({"success": True, "memo": new_memo, "memos": pinned_memos})
    return jsonify({"success": True, "memos": pinned_memos})

@app.route("/api/memos/<memo_id>", methods=["DELETE"])
def delete_memo(memo_id):
    global pinned_memos
    pinned_memos = [m for m in pinned_memos if m.get("id") != memo_id]
    return jsonify({"success": True, "memos": pinned_memos})

# God Mode Spatial Intercom Processor
@app.route("/api/intercom", methods=["POST"])
def api_intercom():
    data = request.get_json() or {}
    cmd = data.get("command", "").strip()
    if not cmd:
        return jsonify({"success": False, "error": "Perintah tidak boleh kosong"}), 400

    cmd_lower = cmd.lower()
    target_agent = "boss"
    reply = ""
    action_type = "directive"

    if "scout" in cmd_lower or "radar" in cmd_lower or "berita" in cmd_lower or "scrap" in cmd_lower:
        target_agent = "scout"
        if "kripto" in cmd_lower or "crypto" in cmd_lower or "open-source" in cmd_lower or "ai" in cmd_lower:
            reply = "Copy that! Filter berita kripto ditangguhkan, memprioritaskan kurasi Open-Source AI hari ini! 📡🫡"
            action_type = "filter_update"
        else:
            reply = "Roger! Direktori radar disesuaikan dengan instruksi baru. 📡"
    elif "pulse" in cmd_lower or "gemini" in cmd_lower or "draf" in cmd_lower or "draft" in cmd_lower or "ringkas" in cmd_lower:
        target_agent = "pulse"
        if "150" in cmd_lower or "pendek" in cmd_lower or "singkat" in cmd_lower:
            reply = "Roger, bos! Target panjang naskah diperketat maksimal 150 kata dengan hook punchy! ✂️✨"
            action_type = "length_constraint"
        elif "formal" in cmd_lower:
            reply = "Siap! Mengarahkan gaya bahasa ke level C-Suite Enterprise Formal. 👔✨"
            action_type = "tone_formal"
        else:
            reply = "Menerima prompt khusus. Parameter Gemini disesuaikan seketika! ✨"
    elif "link" in cmd_lower or "publish" in cmd_lower or "post" in cmd_lower:
        target_agent = "link"
        if "dry-run" in cmd_lower or "simulasi" in cmd_lower or "tahan" in cmd_lower:
            reply = "Mode Dry-Run diaktifkan! Gateway LinkedIn beralih ke simulasi aman tanpa posting live. 💼🛡️"
            action_type = "dry_run"
        else:
            reply = "LinkedIn Gateway standby, siap broadcast sesuai otorisasi naskah! 💼"
    else:
        target_agent = "boss"
        reply = "Instruksi HQ diterima dan dicatat dalam log komando Chief Editor! 👑📋"

    return jsonify({
        "success": True,
        "target_agent": target_agent,
        "action": action_type,
        "reply": reply,
        "original_command": cmd
    })

# War Room Fallback & Incident Resolution Endpoint
@app.route("/api/warroom/fallback", methods=["POST"])
def api_warroom_fallback():
    data = request.get_json() or {}
    action = data.get("action", "switch_model")

    if action == "switch_model":
        token_tracker["last_model"] = "gemini-2.5-flash-fallback"
        token_tracker["total_used"] = max(0, token_tracker["total_used"] - 200000)
        return jsonify({
            "success": True,
            "action": "switch_model",
            "message": "Fallback Provider diaktifkan: gemini-2.5-flash (Secondary Tier). Kuota dipulihkan!",
            "active_model": "gemini-2.5-flash-fallback"
        })
    elif action == "refresh_oauth":
        return jsonify({
            "success": True,
            "action": "refresh_oauth",
            "message": "OAuth Token LinkedIn berhasil di-refresh & handshake REST v2 terverifikasi!",
            "token_valid": True
        })
    elif action == "retry_scraper":
        return jsonify({
            "success": True,
            "action": "retry_scraper",
            "message": "Scraper RSS di-restart dengan bypass Cloudflare proxy & rotasi user-agent!",
            "scraper_ready": True
        })
    else:
        return jsonify({
            "success": True,
            "action": "emergency_resolve",
            "message": "Seluruh alarm darurat dimatikan, sistem kembali ke status normal."
        })

# ==========================================
# 1. MATRIX RAG MEMORY VAULT DATA & API
# ==========================================
rag_vault_data = {
    "collection": "tech_ai_embeddings_v2",
    "total_vectors": 14820,
    "vector_dim": 768,
    "embedding_model": "text-embedding-004",
    "status": "ONLINE & SYNCHRONIZED",
    "recent_chunks": [
        {
            "id": "chunk-7681",
            "similarity": 0.942,
            "source": "techcrunch_feed_2026.json",
            "title": "Anthropic Claude 3.7 Hybrid Reasoning",
            "text": "Anthropic launches Claude 3.7 Sonnet with hybrid reasoning capabilities, combining instantaneous response tokens with token-efficient internal chain-of-thought scratchpad.",
            "timestamp": "12m ago"
        },
        {
            "id": "chunk-7682",
            "similarity": 0.895,
            "source": "deepmind_research_vault.md",
            "title": "Gemini 2.5 Flash Multimodal Latency",
            "text": "Google DeepMind benchmarks reveal Gemini 2.5 Flash demonstrates sub-200ms latency on dense vector embeddings retrieval while preserving long-context fidelities up to 1M tokens.",
            "timestamp": "28m ago"
        },
        {
            "id": "chunk-7683",
            "similarity": 0.847,
            "source": "viral_post_formulas.json",
            "title": "LinkedIn Engagement Algorithms 2026",
            "text": "LinkedIn algorithm prioritizes actionable technical insights, concise formatting, and organic discussion hooks over outbound redirect hyperlinks.",
            "timestamp": "45m ago"
        },
        {
            "id": "chunk-7684",
            "similarity": 0.812,
            "source": "agentic_patterns.md",
            "title": "Autonomous Human-in-the-Loop Orchestration",
            "text": "Multi-agent workflows exhibit 68% higher reliability when autonomous execution is paired with dedicated review staging desks for approval validation.",
            "timestamp": "1h ago"
        }
    ]
}

@app.route("/api/rag/vault", methods=["GET", "POST"])
def api_rag_vault():
    if request.method == "POST":
        data = request.get_json() or {}
        query = data.get("query", "Latest breakthrough in generative AI & agentic automation")
        # Simulate retrieval beam query
        new_chunk = {
            "id": f"chunk-{random.randint(8000, 9999)}",
            "similarity": round(random.uniform(0.91, 0.98), 3),
            "source": "live_news_radar_cache.bin",
            "title": f"Retrieved Context: {query[:35]}...",
            "text": f"High-confidence embedding vector match retrieved from Matrix Vault: '{query}'. Context injected into Gemini AI prompt window.",
            "timestamp": "Just now"
        }
        rag_vault_data["recent_chunks"].insert(0, new_chunk)
        if len(rag_vault_data["recent_chunks"]) > 6:
            rag_vault_data["recent_chunks"].pop()
        return jsonify({
            "success": True,
            "query": query,
            "retrieved_chunk": new_chunk,
            "vault": rag_vault_data
        })
    return jsonify({"success": True, "vault": rag_vault_data})

# ==========================================
# 2. TOKEN BURN-RATE & COST TICKER API
# ==========================================
financial_tracker = {
    "session_cost": 0.042,
    "burn_rate": 120, # tokens/sec
    "budget_limit": 5.00, # USD
    "is_circuit_breaker_tripped": False,
    "daily_tokens_used": 142050,
    "pricing_tier": "Gemini 2.5 Flash ($0.075 / 1M tokens)",
    "currency": "USD"
}

@app.route("/api/financial/metrics", methods=["GET", "POST"])
def api_financial_metrics():
    global financial_tracker
    if request.method == "POST":
        data = request.get_json() or {}
        if "budget_limit" in data:
            financial_tracker["budget_limit"] = float(data["budget_limit"])
        if "toggle_breaker" in data:
            financial_tracker["is_circuit_breaker_tripped"] = not financial_tracker["is_circuit_breaker_tripped"]
        if "reset_breaker" in data:
            financial_tracker["is_circuit_breaker_tripped"] = False
        if "trip_breaker" in data:
            financial_tracker["is_circuit_breaker_tripped"] = True
        if "add_tokens" in data:
            tok = int(data["add_tokens"])
            financial_tracker["daily_tokens_used"] += tok
            # Approximate calculation: $0.075 per 1M tokens
            cost_inc = (tok / 1000000.0) * 0.075
            financial_tracker["session_cost"] = round(financial_tracker["session_cost"] + cost_inc, 4)
            if financial_tracker["session_cost"] >= financial_tracker["budget_limit"]:
                financial_tracker["is_circuit_breaker_tripped"] = True
        return jsonify({"success": True, "financial": financial_tracker})
    return jsonify({"success": True, "financial": financial_tracker})

# ==========================================
# 3. AGENT EVOLUTION & RPG SKILL LEVELING API
# ==========================================
agent_rpg_state = {
    "scout": {
        "name": "Scout",
        "role": "RSS Radar Scraper",
        "title": "Senior Scraper",
        "level": 4,
        "xp": 82,
        "next_xp": 100,
        "tasks_completed": 48,
        "temperature": 0.3,
        "persona": "Data-Driven Analyst",
        "badge_color": "#3b82f6",
        "perks": [
            {"name": "Multi-threaded Crawling", "unlocked": True, "desc": "Scrape up to 8 RSS news endpoints simultaneously"},
            {"name": "Anti-Hallucination Guardrail", "unlocked": True, "desc": "Cross-reference facts against primary web sources"},
            {"name": "Deep-Web Scraper", "unlocked": False, "desc": "Unlock at Level 5: Bypass aggressive JS payload walls"}
        ]
    },
    "pulse": {
        "name": "Pulse",
        "role": "Gemini AI Synthesizer",
        "title": "Prompt Alchemist",
        "level": 5,
        "xp": 64,
        "next_xp": 100,
        "tasks_completed": 76,
        "temperature": 0.7,
        "persona": "Visionary AI Evangelist",
        "badge_color": "#a855f7",
        "perks": [
            {"name": "Concise Summarizer", "unlocked": True, "desc": "Restrain output strictly below 150 punchy words"},
            {"name": "Chain-of-Thought Boost", "unlocked": True, "desc": "Structured 3-layer reasoning before final output"},
            {"name": "Creative Hook Generator", "unlocked": False, "desc": "Unlock at Level 6: 10x viral click-through hooks"}
        ]
    },
    "boss": {
        "name": "Boss",
        "role": "Chief Editor & QA",
        "title": "Chief Strategist",
        "level": 6,
        "xp": 91,
        "next_xp": 100,
        "tasks_completed": 112,
        "temperature": 0.4,
        "persona": "Authoritative C-Suite Leader",
        "badge_color": "#10b981",
        "perks": [
            {"name": "Editorial Veto", "unlocked": True, "desc": "Instant rejection filter for low-signal or duplicate news"},
            {"name": "Tone Customizer", "unlocked": True, "desc": "Adaptive tone modulation for executive viral reach"},
            {"name": "Auto-Publisher Delegation", "unlocked": False, "desc": "Unlock at Level 7: Hands-free batch approval"}
        ]
    },
    "link": {
        "name": "Link",
        "role": "LinkedIn REST v2 Gateway",
        "title": "Viral Catalyst",
        "level": 3,
        "xp": 45,
        "next_xp": 100,
        "tasks_completed": 35,
        "temperature": 0.5,
        "persona": "Growth Hacker Marketer",
        "badge_color": "#06b6d4",
        "perks": [
            {"name": "Smart Hashtag Injection", "unlocked": True, "desc": "Auto-select top 3 trending tags for peak reach"},
            {"name": "Viral Timing Optimizer", "unlocked": True, "desc": "Auto-sync publish timing with LinkedIn peak hours"},
            {"name": "Multi-Account Relay", "unlocked": False, "desc": "Unlock at Level 4: Broadcast across company pages"}
        ]
    }
}

@app.route("/api/agents/skills", methods=["GET", "POST"])
def api_agents_skills():
    global agent_rpg_state
    if request.method == "POST":
        data = request.get_json() or {}
        agent_key = data.get("agent_key")
        if agent_key in agent_rpg_state:
            agent = agent_rpg_state[agent_key]
            if "temperature" in data:
                agent["temperature"] = float(data["temperature"])
            if "persona" in data:
                agent["persona"] = str(data["persona"])
            if "add_xp" in data:
                xp_gain = int(data["add_xp"])
                agent["xp"] += xp_gain
                agent["tasks_completed"] += 1
                if agent["xp"] >= agent["next_xp"]:
                    agent["level"] += 1
                    agent["xp"] = agent["xp"] - agent["next_xp"]
                    # Unlock perks if eligible
                    for p in agent["perks"]:
                        if not p["unlocked"] and agent["level"] >= 4:
                            p["unlocked"] = True
                            break
            return jsonify({"success": True, "agent": agent, "all_agents": agent_rpg_state})
    return jsonify({"success": True, "agents": agent_rpg_state})

# ==========================================
# 4. LIVE PRODUCTION FEED & LINKEDIN ANALYTICS
# ==========================================
linkedin_live_stats = {
    "likes": 14,
    "comments": 3,
    "reposts": 2,
    "impressions": 342,
    "engagement_rate": 5.6,
    "ctr": 2.4,
    "viral_score": 88,
    "last_broadcast_time": "18m ago",
    "last_post_title": "Anthropic Claude 3.7 & Autonomous Multi-Agent Workflows in 2026",
    "hourly_impressions": [
        {"hour": "09:00", "impr": 24},
        {"hour": "10:00", "impr": 68},
        {"hour": "11:00", "impr": 120},
        {"hour": "12:00", "impr": 195},
        {"hour": "13:00", "impr": 270},
        {"hour": "14:00", "impr": 342}
    ]
}

@app.route("/api/analytics/linkedin", methods=["GET", "POST"])
def api_analytics_linkedin():
    global linkedin_live_stats
    if request.method == "POST":
        data = request.get_json() or {}
        action = data.get("action", "simulate_engagement")
        if action == "simulate_spike":
            linkedin_live_stats["likes"] += random.randint(15, 35)
            linkedin_live_stats["comments"] += random.randint(3, 8)
            linkedin_live_stats["reposts"] += random.randint(2, 6)
            linkedin_live_stats["impressions"] += random.randint(120, 280)
            linkedin_live_stats["viral_score"] = min(99, linkedin_live_stats["viral_score"] + 4)
        elif action == "broadcast_pulse":
            linkedin_live_stats["last_broadcast_time"] = "Just now"
            if "title" in data:
                linkedin_live_stats["last_post_title"] = data["title"]
        return jsonify({"success": True, "analytics": linkedin_live_stats})
    return jsonify({"success": True, "analytics": linkedin_live_stats})

if __name__ == "__main__":
    print("Starting 2D Virtual Office Server on http://localhost:5000 ...")
    app.run(host="0.0.0.0", port=5000, debug=True)


