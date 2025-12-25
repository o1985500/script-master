// ScriptGenerator.jsx
import { 
    Loader2, Sparkles, X, Clock, Layers, Film, ArrowUp, ChevronDown, ChevronUp, Settings2, 
    Palette, Ban, Search, FileText, Copy, Check, LogOut, Home, Music, Mic, Image 
} from "lucide-react"; 
import { useState, useEffect, useRef } from 'react';

import MusicGenerator from './components/MusicGenerator'; 
import VoiceoverGenerator from './components/VoiceoverGenerator';
import ThumbnailGenerator from './components/ThumbnailGenerator';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 🔑 เปลี่ยนชื่อ API Key ให้ตรงตามที่คุณตั้งใน .env (ฝั่ง Vite ต้องมี VITE_ นำหน้า)
const apiKey = import.meta.env.VITE_MISTRAL_API_KEY; 

// --- Component Helpers (เหมือนเดิม) ---
const AccentButton = ({ children, onClick, disabled, className = '', icon: Icon, type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98] whitespace-nowrap ${
            disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-300/50'
        } ${className}`}
    >
        {Icon && <Icon size={16} />}
        {children}
    </button>
);

const FormInput = ({ label, value, onChange, placeholder, type = 'text', step, min, max, icon: Icon, className = '' }) => (
    <div className={`flex flex-col space-y-2 ${className}`}>
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            {Icon && <Icon size={16} className="text-orange-500" />}
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 bg-white"
        />
    </div>
);

const DropdownSelect = ({ label, value, onChange, items, placeholder, icon: Icon, showDropdown, setShowDropdown, dropdownRef, className = '' }) => {
    const [searchTerm, setSearchTerm] = useState(value);
    useEffect(() => { setSearchTerm(value); }, [value]);
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, setShowDropdown]);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                {Icon && <Icon size={16} className="text-orange-500" />}
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => { onChange(e); setSearchTerm(e.target.value); }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={placeholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 bg-white cursor-pointer"
                />
                <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            {showDropdown && (
                <div className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {filteredItems.map((item, index) => (
                        <div key={index} onClick={() => { onChange({ target: { value: item } }); setShowDropdown(false); }} className="px-3 py-2 text-gray-800 hover:bg-orange-50 cursor-pointer text-sm">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const _CopyButton = ({ content, className = '' }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = (e) => {
        e.stopPropagation(); 
        navigator.clipboard.writeText(content); 
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={handleCopy} className={`p-1.5 rounded-full text-white transition-all active:scale-[0.9] ${copied ? 'bg-green-500' : 'bg-orange-600'} ${className}`}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
    );
};

// --- ScriptDisplay Component ---
const ScriptDisplay = ({ script, index, isOpen, toggleOpen, handleDownload }) => {
    const scriptRef = useRef(null); 
    const [shotLang, setShotLang] = useState('th');
    const [thumbLang, setThumbLang] = useState('th');

    const calculateDuration = (shotPrompts) => {
        if (!shotPrompts || shotPrompts.length === 0) return 'N/A';
        const lastShot = shotPrompts[shotPrompts.length - 1].th;
        const match = lastShot.match(/\[(\d+)-(\d+)s\]/);
        return match ? `${match[2]}s` : `${(shotPrompts.length * 4) + 3}s`;
    }

    const currentClipDuration = calculateDuration(script.shot_prompts);
    const color = (index % 3 === 0) ? 'bg-blue-600' : (index % 3 === 1) ? 'bg-teal-600' : 'bg-red-600';
    const safeHashtags = script.hashtags.map(tag => tag.startsWith('#') ? tag : `#${tag}`).join(' ');

    useEffect(() => {
        if (isOpen && scriptRef.current) {
            setTimeout(() => { scriptRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); 
        }
    }, [isOpen]);

    return (
        <div ref={scriptRef} className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl scroll-mt-24 mb-4">
            <div className={`p-4 md:p-5 flex justify-between items-center cursor-pointer ${isOpen ? 'bg-orange-50' : 'hover:bg-gray-50'}`} onClick={toggleOpen}>
                <div className="flex items-start gap-4 flex-grow pr-4"> 
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold text-sm flex-shrink-0 ${color}`}>{index + 1}</div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug break-words">{script.title || "Untitled Script"}</h3>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <Clock size={16} className="text-orange-500"/>{currentClipDuration}
                    </span>
                    {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </div>
            </div>

            {isOpen && (
                <div className="p-4 md:p-6 border-t border-gray-200">
                    <div className="flex justify-end mb-6">
                        <AccentButton onClick={(e) => { e.stopPropagation(); handleDownload(script, index); }} icon={FileText}>ดาวน์โหลดสคริปต์ (.txt)</AccentButton>
                    </div>
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">สรุปคอนเซปต์</h4>
                        <div className="p-4 rounded-xl bg-orange-50 text-sm leading-relaxed whitespace-pre-wrap">{script.description}</div>
                    </div>
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">บทพูด (Voice Over)</h4>
                        <div className="p-4 bg-gray-50 rounded-xl font-mono text-sm shadow-inner">{script.voice_over_script}</div>
                    </div>
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-700 mb-2 border-b pb-1">Shot List (Prompt)</h4>
                        <ul className="space-y-3">
                            {script.shot_prompts.map((shot, i) => (
                                <li key={i} className="p-3 border rounded-lg bg-white text-sm">
                                    <p className="font-bold text-orange-600 mb-1">SHOT {i + 1}</p>
                                    <p>{shotLang === 'th' ? shot.th : shot.en}</p>
                                    <p className="text-xs text-gray-400 mt-1 italic">{shotLang === 'th' ? `EN: ${shot.en}` : `TH: ${shot.th}`}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Component ---
const ScriptGenerator = ({ user, onLogout, userCredit, consumeCredit, defaultModule }) => {
    const [activeModule, setActiveModule] = useState(defaultModule || "home");
    const [topic, setTopic] = useState('');
    const [style, setStyle] = useState(''); 
    const [duration, setDuration] = useState("15");
    const [shotCount, setShotCount] = useState(5); 
    const [isFormExpanded, setIsFormExpanded] = useState(true);
    const [showStyleDropdown, setShowDropdown] = useState(false);
    const [scriptList, setScriptList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false); 
    const [error, setError] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [progress, setProgress] = useState(0); 

    const styleDropdownRef = useRef(null);
    const abortControllerRef = useRef(null);
    const intervalRef = useRef(null);

    const CREDIT_COST = 10; 
    const popularStyles = ["😂 ตลก", "📈 การลงทุน", "✈️ ท่องเที่ยว", "👻 เล่าเรื่องผี", "🎓 How-to", "🥘 รีวิวอาหาร", "🛍️ ขายของ"];

    // 🔑 ฟังก์ชันสำคัญ: เรียก Mistral API
    const handleGenerateScript = async () => {
        if (!apiKey) { setError('⚠️ ไม่พบ Mistral API Key ในไฟล์ .env'); return; }
        if (!topic.trim()) { setError('กรุณาป้อนหัวข้อก่อนครับ'); return; }
        if (userCredit < CREDIT_COST) { setError('เครดิตไม่พอ'); return; }

        const CLIP_COUNT = 5; 
        const success = await consumeCredit(CREDIT_COST);
        if (!success) return;

        setIsLoading(true);
        setError(null);
        setProgress(5);
        setScriptList([]);
        setIsFormExpanded(false);

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        // จำลอง Progress
        intervalRef.current = setInterval(() => {
            setProgress(p => Math.min(p + 2, 95));
        }, 1000);

        // 🔑 1. นิยามโครงสร้าง JSON ที่ต้องการให้ Mistral ตอบกลับ (เพราะ Mistral ไม่มี SchemaType)
        const jsonInstruction = `ตอบกลับเป็น JSON Array เสมอ ห้ามมีข้อความอื่น โดยใน Array มี 5 Object แต่ละ Object มีโครงสร้างดังนี้:
        {
          "title": "ชื่อคลิปภาษาไทย",
          "description": "คำอธิบายคอนเซปต์",
          "voice_over_script": "บทพูดภาษาไทยสั้นๆ",
          "shot_prompts": [
             {"th": "คำอธิบายภาพไทย [0-3s]", "en": "English Prompt"}
          ],
          "thumbnail_prompt": {"th": "คำอธิบายปกไทย", "en": "Thumbnail English Prompt"},
          "hashtags": ["tag1", "tag2"]
        }`;

        const systemMessage = `คุณคือทีม Content Factory AI (Marketer, Psychologist, Scriptwriter) 
        สร้างสคริปต์วิดีโอสั้น 5 คลิป ความยาวคลิปละ ${duration} วินาที สไตล์ "${style || 'ทั่วไป'}" 
        ${jsonInstruction}`;

        try {
            // 🔑 2. เรียก Mistral API (โดยตรง หรือผ่าน Backend ของคุณ)
            // ถ้าคุณต้องการเรียกตรงๆ จาก Frontend:
            const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "mistral-large-latest",
                    messages: [
                        { role: "system", content: systemMessage },
                        { role: "user", content: `สร้างสคริปต์ 5 คลิป หัวข้อ: "${topic}"` }
                    ],
                    response_format: { type: "json_object" }
                }),
                signal: signal
            });

            if (!response.ok) throw new Error(`Mistral API Error: ${response.status}`);

            const data = await response.json();
            const contentText = data.choices[0].message.content;
            
            // 🔑 3. Parse JSON (Mistral มักจะตอบกลับเป็น Object ที่มี key ห่อหุ้มไว้)
            const parsedData = JSON.parse(contentText);
            // ตรวจสอบว่าผลลัพธ์เป็น Array หรืออยู่ใน Key อื่น (เช่น { "scripts": [...] })
            const finalScripts = Array.isArray(parsedData) ? parsedData : (parsedData.scripts || Object.values(parsedData)[0]);

            setScriptList(finalScripts);
            setActiveModule('script');
            setProgress(100);
            setIsFinished(true);
            setExpandedIndex(0);

        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(`เกิดข้อผิดพลาด: ${err.message}`);
                await consumeCredit(-CREDIT_COST); // คืนเครดิต
            }
        } finally {
            setIsLoading(false);
            clearInterval(intervalRef.current);
        }
    };

    const handleClearTopic = () => {
        setTopic(''); setScriptList([]); setIsFinished(false); setIsFormExpanded(true);
    };

    const handleDownload = (scriptData, index) => {
        const content = `TITLE: ${scriptData.title}\nVOICE OVER:\n${scriptData.voice_over_script}`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = `script-${index + 1}.txt`;
        element.click();
    };

    const renderModuleContent = () => {
        if (activeModule === 'script') {
            return (
                <>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
                        <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => setIsFormExpanded(!isFormExpanded)}>
                            <h2 className="text-xl font-bold flex items-center gap-2"><Settings2 size={20}/> สร้างสคริปต์ (Mistral AI)</h2>
                            {isFormExpanded ? <ChevronUp/> : <ChevronDown/>}
                        </div>
                        {isFormExpanded && (
                            <div className="space-y-4 animate-fade-in">
                                <FormInput label="หัวข้อ" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="เช่น: รีวิวสินค้า..." icon={Sparkles} />
                                <DropdownSelect label="สไตล์" value={style} items={popularStyles} onChange={(e) => setStyle(e.target.value)} icon={Palette} showDropdown={showStyleDropdown} setShowDropdown={setShowDropdown} dropdownRef={styleDropdownRef} />
                            </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <AccentButton onClick={handleGenerateScript} disabled={isLoading || !topic} icon={Sparkles}>เริ่มสร้างสคริปต์</AccentButton>
                        </div>
                    </div>
                    {scriptList.map((s, i) => (
                        <ScriptDisplay key={i} script={s} index={i} isOpen={expandedIndex === i} toggleOpen={() => setExpandedIndex(i)} handleDownload={handleDownload} />
                    ))}
                </>
            );
        }
        if (activeModule === 'home') return <div className="p-10 text-center bg-white rounded-xl shadow">หน้า Dashboard: เครดิตคงเหลือ {userCredit} CR</div>;
        return <div className="p-10 text-center">โมดูลนี้กำลังพัฒนา</div>;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-20 bg-white shadow-sm px-4 py-3 flex justify-between items-center">
                <h1 className="font-black text-lg">CONTENT <span className="text-orange-600">FACTORY</span></h1>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-orange-600">{userCredit} CR</span>
                    <button onClick={onLogout} className="text-sm text-gray-500 hover:text-red-500">Logout</button>
                </div>
            </header>
            
            <nav className="bg-white border-b overflow-x-auto flex gap-2 p-2 justify-center">
                <button onClick={() => setActiveModule('home')} className={`px-4 py-2 rounded-lg text-sm ${activeModule==='home'?'bg-orange-100 text-orange-600':'text-gray-600'}`}>Home</button>
                <button onClick={() => setActiveModule('script')} className={`px-4 py-2 rounded-lg text-sm ${activeModule==='script'?'bg-orange-100 text-orange-600':'text-gray-600'}`}>สร้างสคริปต์</button>
            </nav>

            <main className="max-w-4xl mx-auto p-4 md:p-6">
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm font-bold border border-red-200">{error}</div>}
                {isLoading && (
                    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6">
                        <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
                        <div className="w-full max-w-xs bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-orange-600 h-full transition-all" style={{width: `${progress}%`}}></div>
                        </div>
                        <p className="mt-4 font-bold text-gray-700">กำลังประมวลผลด้วย Mistral AI... {progress}%</p>
                    </div>
                )}
                {renderModuleContent()}
            </main>
        </div>
    );
};

export default ScriptGenerator;