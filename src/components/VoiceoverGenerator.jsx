import React, { useState } from "react";
import { Mic, Loader2 } from "lucide-react";

export default function VoiceoverGenerator({ userCredit, consumeCredit }) {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("female");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const voiceLibrary = {
    female: "/voices/female1.mp3",
    male: "/voices/male1.mp3",
    robot: "/voices/robot1.mp3",
  };

  const generateVoice = async () => {
    if (!text.trim()) return alert("กรุณากรอกข้อความ");

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    setAudioUrl(voiceLibrary[voice]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4"><Mic /> โมดูล 3: Voiceover ฟรี</h2>

      <textarea
        className="w-full border p-3 rounded-lg h-28"
        placeholder="พิมพ์ข้อความ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select 
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        className="p-3 border rounded-lg w-full mt-4"
      >
        <option value="female">หญิง (Preset)</option>
        <option value="male">ชาย (Preset)</option>
        <option value="robot">Robot (Preset)</option>
      </select>

      <button
        onClick={generateVoice}
        disabled={isLoading}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        {isLoading ? "กำลังโหลดเสียง..." : "สร้างเสียงฟรี"}
      </button>

      {audioUrl && (
        <div className="mt-6 bg-purple-50 p-4 rounded-lg">
          <audio controls src={audioUrl} className="w-full"></audio>
        </div>
      )}
    </div>
  );
}
