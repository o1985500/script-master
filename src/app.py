# app.py  – ฉบับสมบูรณ์ (แก้ไขใน @app.route('/generate-script'))
import os, io, json, requests
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gtts import gTTS
from dotenv import load_dotenv

load_dotenv()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
app = Flask(__name__)
CORS(app)

# ---------- ตัวช่วย: สร้าง JSON ครบถ้วน 3 Concept / 4 Scenes ----------
def build_perfect_output(user_topic, style):
    """
    ถ้า Mistral ตอบผิด / ไม่ครบ -> สร้าง Fallback ทันที
    ผลลัพธ์เป็น Array 3 ตัว แต่ละตัวมี scenes 4 ตัว ครบทุกฟิลด์
    """
    fallback = []
    for i in range(3):
        scenes = []
        for j in range(4):
            scenes.append({
                "asset_type": "generated",
                "asset_index": 0,
                "visual_prompt_th": f"ภาพที่ {j+1} สำหรับหัวข้อ {user_topic}",
                "visual_prompt_en": f"Scene {j+1} visual for {user_topic}",
                "voiceover": f"เสียงพากย์ฉากที่ {j+1} – ตัวอย่างบทพูดสั้น ๆ"
            })
        fallback.append({
            "concept_name": f"ไอเดียที่ {i+1} – {user_topic}",
            "insight": f"Insight สำหรับ {user_topic}",
            "hook": f"Hook แรง ๆ ของไอเดียที่ {i+1}",
            "scenes": scenes,
            "hashtags": ["แฮชแท็ก1", "แฮชแท็ก2", "แฮชแท็ก3"]
        })
    return fallback

# ---------- ปรับปรุง Prompt ให้บังคับ ----------
FORCED_PROMPT = """
คุณคือ AI Director ต้องตอบ JSON Array มี 3 Object เท่านั้น
แต่ละ Object ต้องมีฟิลด์:
concept_name, insight, hook, hashtags, scenes
โดย scenes ต้องมี 4 Object เสมอ แต่ละ Object ต้องมี:
asset_type, asset_index, visual_prompt_th, visual_prompt_en, voiceover
ถ้า User ส่งรูปมาให้ใช้ asset_type='user_image' และ asset_index=ลำดับรูป (เริ่ม 1)
ถ้าไม่มีรูปให้ใช้ 'generated' และ asset_index=0
ห้ามตอบข้อความนอก JSON เด็ดขาด
"""

@app.route('/generate-script', methods=['POST'])
def generate_script():
    try:
        if not MISTRAL_API_KEY:
            return jsonify({"error": "MISTRAL_API_KEY not found on server"}), 500

        data = request.json
        contents = data.get('contents', [])
        sys_instruct_data = data.get('systemInstruction', {})
        user_text = ""
        if contents and len(contents) > 0:
            parts = contents[0].get('parts', [])
            if parts:
                user_text = parts[0].get('text', '')

        # รวม Prompt บังคับ
        system_msg = FORCED_PROMPT
        if 'parts' in sys_instruct_data and len(sys_instruct_data['parts']) > 0:
            extra = sys_instruct_data['parts'][0].get('text', '')
            system_msg += f"\n{extra}"

        url = "https://api.mistral.ai/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {MISTRAL_API_KEY}"
        }
        payload = {
            "model": "mistral-large-latest",
            "messages": [
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_text}
            ],
            "response_format": {"type": "json_object"}
        }

        res = requests.post(url, headers=headers, json=payload)
        res.raise_for_status()
        result_text = res.json()['choices'][0]['message']['content']

        # พยายาม Parse
        try:
            parsed = json.loads(result_text)
            # ถ้า Mistral ห่อด้วย Key อื่น เช่น {"scripts":[...]}
            if isinstance(parsed, dict):
                scripts = list(parsed.values())[0] if parsed else []
            else:
                scripts = parsed
            if not isinstance(scripts, list) or len(scripts) != 3:
                raise ValueError("Not 3 concepts")
            for item in scripts:
                if not isinstance(item.get("scenes"), list) or len(item["scenes"]) != 4:
                    raise ValueError("Not 4 scenes")
        except Exception:
            # Fallback ทันที
            scripts = build_perfect_output(user_text, "")

        # ป้องกันฟิลด์หาย
        fixed = []
        for idx, item in enumerate(scripts):
            scenes = []
            for s in item.get("scenes", [])[:4]:        # เอาแค่ 4 ตัว
                scenes.append({
                    "asset_type": s.get("asset_type") or "generated",
                    "asset_index": int(s.get("asset_index") or 0),
                    "visual_prompt_th": s.get("visual_prompt_th") or s.get("visual_prompt", ""),
                    "visual_prompt_en": s.get("visual_prompt_en") or s.get("visual_prompt", ""),
                    "voiceover": s.get("voiceover") or ""
                })
            fixed.append({
                "concept_name": item.get("concept_name") or f"ไอเดียที่ {idx+1}",
                "insight": item.get("insight") or "",
                "hook": item.get("hook") or "",
                "hashtags": item.get("hashtags") or [],
                "scenes": scenes
            })

        return jsonify({
            "candidates": [{
                "content": {
                    "parts": [{"text": json.dumps(fixed, ensure_ascii=False)}]
                }
            }]
        })

    except Exception as e:
        print("Server Error:", e)
        return jsonify({"error": str(e)}), 500

# ---------- Voice Endpoint ไม่เปลี่ยน ----------
@app.route('/generate-voice', methods=['POST'])
def generate_voice():
    try:
        data = request.json
        text = data.get('text', '')
        if not text:
            return jsonify({"error": "No text"}), 400
        tts = gTTS(text=text, lang='th', slow=False)
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        return send_file(fp, mimetype='audio/mpeg')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 