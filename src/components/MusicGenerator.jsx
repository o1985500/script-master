import React, { useState } from "react";
import { Music, Loader2, Play } from "lucide-react";

const AccentButton = ({ children, onClick, disabled, className = "", icon: Icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold 
      ${disabled ? "bg-gray-300" : "bg-orange-600 hover:bg-orange-700 text-white"} ${className}`}
  >
    {Icon && <Icon size={16} />}
    {children}
  </button>
);

export default function MusicGenerator({ userCredit, consumeCredit }) {
  const [genre, setGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [music, setMusic] = useState(null);

  // 📁 คลังเพลงฟรี (Mixkit | Pixabay | CC0)
  const musicLibrary = {
    lofi: [
      "/music/lofi1.mp3",
      "/music/lofi2.mp3"
    ],
    cinematic: ["/music/cinematic1.mp3"],
    vlog: ["/music/vlog1.mp3"],
    pop: ["/music/pop1.mp3"],
  };

  const generateMusic = async () => {
    if (!genre) return alert("เลือกแนวเพลงก่อน");

    setIsLoading(true);
    setMusic(null);

    await new Promise(r => setTimeout(r, 1200)); // fake loading

    const list = musicLibrary[genre];
    const file = list[Math.floor(Math.random() * list.length)];

    setMusic({
      title: `${genre.toUpperCase()} Beat (Free Track)`,
      url: file,
    });

    setIsLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Music className="text-blue-600" />
        โมดูล 2: เพลงฟรีจากคลัง CC0
      </h2>

      <label className="font-semibold text-gray-700 mb-3 block">เลือกแนวเพลง</label>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="p-3 border rounded-lg w-full mb-5"
      >
        <option value="">-- เลือก --</option>
        <option value="lofi">Lofi</option>
        <option value="cinematic">Cinematic</option>
        <option value="vlog">Vlog</option>
        <option value="pop">Pop</option>
      </select>

      <AccentButton 
        disabled={!genre || isLoading} 
        onClick={generateMusic}
        icon={isLoading ? Loader2 : Music}
      >
        {isLoading ? "กำลังสุ่มเพลง..." : "โหลดเพลงฟรี"}
      </AccentButton>

      {music && (
        <div className="mt-6 bg-blue-50 p-4 rounded-xl border">
          <p className="font-bold mb-2">{music.title}</p>

          <audio controls className="w-full">
            <source src={music.url} type="audio/mp3" />
          </audio>

          <a 
            href={music.url} 
            download
            className="inline-block mt-3 bg-blue-600 text-white px-3 py-2 rounded"
          >
            ดาวน์โหลด MP3
          </a>
        </div>
      )}
    </div>
  );
}
