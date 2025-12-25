import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Loader2 } from 'lucide-react';

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

const FormInput = ({ label, value, onChange, placeholder, type = 'text', className = '' }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">{label}</label>
    <input value={value} onChange={onChange} placeholder={placeholder} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 placeholder-gray-400 bg-white" />
  </div>
);

export default function ThumbnailGenerator({ userCredit, consumeCredit, user }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const THUMB_COST = 2; // default cost per thumbnail

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('กรุณาป้อน prompt สำหรับ thumbnail');
      return;
    }

    if (userCredit !== null && userCredit < THUMB_COST) {
      alert(`เครดิตไม่พอ! คุณมี ${userCredit} เครดิต แต่ต้องใช้ ${THUMB_COST}`);
      return;
    }

    const consumed = await (consumeCredit ? consumeCredit(THUMB_COST) : Promise.resolve(true));
    if (!consumed) {
      alert('ไม่สามารถหักเครดิตได้');
      return;
    }

    setIsLoading(true);
    setResultUrl(null);

    try {
      // Simulate image generation
      await new Promise((r) => setTimeout(r, 2500));
      setResultUrl('https://placehold.co/600x400/ef4444/ffffff?text=Thumbnail+AI');
    } catch (e) {
      console.error(e);
      alert('เกิดข้อผิดพลาดในการสร้างภาพ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 mb-6">
        <Image size={24} className="text-emerald-600" />
        โมดูล 4: สร้าง Thumbnail AI
      </h2>

      <div className="space-y-4">
        <FormInput label="คำอธิบายภาพ (Thumbnail Prompt)" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="เช่น: หนุ่มสาวยืนบนริมทะเล แสงทองยามเย็น ตัวอักษรใหญ่: 'สร้างรายได้จาก AI'" />

        <div className="flex justify-end mt-4">
          <AccentButton onClick={handleGenerate} disabled={!prompt.trim() || isLoading} icon={isLoading ? Loader2 : Image}>
            {isLoading ? 'กำลังสร้าง...' : `สร้าง Thumbnail (ใช้ ${THUMB_COST} เครดิต)`}
          </AccentButton>
        </div>

        {resultUrl && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="font-semibold text-emerald-700 mb-2">ภาพ Thumbnail พร้อมแล้ว</p>
            <div className="w-full bg-white rounded overflow-hidden border">
              <img src={resultUrl} alt="generated thumbnail" className="w-full h-auto block" />
            </div>
            <div className="flex justify-end mt-3">
              <AccentButton className="!bg-emerald-600">ดาวน์โหลด</AccentButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ThumbnailGenerator.propTypes = {
  userCredit: PropTypes.number,
  consumeCredit: PropTypes.func,
  user: PropTypes.object,
};
