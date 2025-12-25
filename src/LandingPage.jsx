import { Sparkles, Brain, Target, Clapperboard, CheckCircle, ArrowRight, Zap, Play } from "lucide-react";

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100">
      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
           <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2 rounded-lg shadow-md">
              <Sparkles size={20}/>
           </div>
           <span className="text-xl font-black tracking-tighter">CONTENT <span className="text-orange-600">FACTORY</span></span>
        </div>
        <button onClick={onStart} className="text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50">
          เข้าสู่ระบบ
        </button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-orange-100 shadow-sm hover:shadow-md transition-all cursor-default">
           <Zap size={14} className="fill-orange-500"/> NEW: GEN V5.0 ENGINE
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight text-slate-900">
          เลิก "เดา" วิธีขาย <br/>
          ให้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">AI อัจฉริยะ</span> ช่วยคิด
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          เปลี่ยนไอเดียเป็น <strong>Storyboard คลิปสั้น</strong> ที่ทรงพลัง ด้วยระบบ <strong>3-Role Intelligence™</strong> ผสานจิตวิทยา การตลาด และการกำกับภาพ ไว้ในคลิกเดียว
        </p>
        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-full hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          เริ่มสร้าง Storyboard ฟรี <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
        </button>
        <p className="mt-4 text-xs text-gray-400 font-medium">✨ ไม่ต้องใช้บัตรเครดิต • ใช้งานได้ทันที</p>
      </header>

      {/* The 3-Role Engine (Core Feature) */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">ไม่ใช่แค่ "เขียนบท" แต่คือ "ทีมงานเบื้องหลัง"</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">ระบบ Tri-Core Engine™ ทำงานประสานกัน 3 ขั้นตอน เพื่อผลลัพธ์ที่เหนือกว่าการเขียน Prompt ทั่วไป</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Role 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain size={36}/>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. The Analyst</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                <strong>"นักจิตวิทยา"</strong> สแกนรูปภาพและโจทย์ของคุณ เพื่อขุดหา Insight และ Pain Point ที่ซ่อนอยู่ในใจลูกค้า (สิ่งที่คุณอาจมองข้าม)
              </p>
            </div>

            {/* Role 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-orange-100 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden group ring-1 ring-orange-100">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-50"></div>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-orange-200 shadow-md">
                <Target size={36}/>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. The Marketer</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>"นักการตลาด"</strong> รับข้อมูลมาปั้นเป็น <em>"Hook"</em> ประโยคเปิดที่หยุดนิ้วโป้งใน 3 วินาที และวางแผน Call-to-Action ให้ปิดการขายได้จริง
              </p>
            </div>

            {/* Role 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clapperboard size={36}/>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. The Director</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                <strong>"ผู้กำกับ"</strong> แปลงกลยุทธ์เป็นภาพและเสียง เขียนบทพากย์ภาษาพูดที่เป็นธรรมชาติ และลำดับภาพ (Sequencing) ให้คลิปไม่น่าเบื่อ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-white text-center md:text-left relative overflow-hidden shadow-2xl">
           {/* Decorative bg */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 blur-[120px] opacity-30 rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
           
           <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">ทำไมต้องใช้ <br/><span className="text-orange-500">Content Factory?</span></h2>
                <ul className="space-y-5 mb-10">
                  {[
                    "ประหยัดเวลาคิดงานจาก 2 ชม. เหลือ 2 นาที",
                    "ได้สคริปต์ที่ผ่านการคิดมาแล้วว่า 'ขายได้'",
                    "รองรับ 8 สไตล์ (ตลก, ขายดุดัน, Vlog ฯลฯ)",
                    "ใช้งานง่ายบนมือถือ ไม่ยุ่งยาก",
                    "ระบบ Auto-Fix แก้ไขข้อผิดพลาดอัตโนมัติ"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle size={14} className="text-green-400"/> 
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={onStart} className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                  ทดลองใช้งานเลย
                </button>
              </div>
              
              {/* Visual Mockup */}
              <div className="hidden md:flex justify-center perspective-1000">
                 <div className="w-72 bg-white rounded-3xl border-4 border-gray-800 p-4 relative shadow-2xl rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
                    {/* Mockup Content */}
                    <div className="flex items-center gap-2 mb-4 opacity-50">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="w-full aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                            <Play size={24} className="text-gray-300 fill-gray-300"/>
                        </div>
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-20 bg-orange-50 rounded-xl border border-orange-100 p-2 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-200"></div>
                            <div className="h-2 bg-orange-200 rounded w-20"></div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100 bg-gray-50">
        <p className="font-bold text-gray-600 mb-2">Content Factory AI</p>
        <p>© 2025 All rights reserved. Designed for Creators.</p>
      </footer>
    </div>
  );
};

export default LandingPage;