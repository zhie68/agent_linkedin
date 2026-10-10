import os
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

if __name__ == "__main__":
    print("Starting 2D Virtual Office Server on http://localhost:5000 ...")
    app.run(host="0.0.0.0", port=5000, debug=True)
