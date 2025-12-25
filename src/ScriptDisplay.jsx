import React from 'react';
import { Film, Clock, Mic, Image, MessageSquare } from 'lucide-react';

const ScriptDisplay = ({ data }) => {
    // 1. เช็คเบื้องต้นว่ามี data ไหม (Safety Check)
    if (!data || data.status !== 'success') return null;

    // 2. ดึงข้อมูลออกมาอย่างระมัดระวัง (Safe Access)
    // ถ้า data.script ไม่มีค่า ให้ใช้ [] (อาเรย์ว่าง) แทน เพื่อไม่ให้ map พัง
    const scripts = data.script || []; 

    return (
        <div className="space-y-6">
            
            {/* 1. Hook & Title */}
            <div className="bg-dark-accent p-4 rounded-xl border-l-4 border-brand-pink shadow-md">
                <h4 className="text-xl font-extrabold text-brand-pink mb-1">🔥 HOOK (ประโยคเปิด)</h4>
                <p className="text-2xl font-black text-white leading-tight">
                    {data.hook || "ไม่มีข้อมูล Hook"}
                </p>
            </div>

            {/* 2. Script Shots (จุดที่เคย Error) */}
            <div className="space-y-5">
                {/* เช็คความยาวก่อนแสดงผล */}
                {scripts.length > 0 ? (
                    scripts.map((shot, index) => (
                        <div key={index} className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-800 transition-shadow duration-300 hover:shadow-brand-purple/20 hover:border-brand-purple/50">
                            
                            <div className="flex items-center justify-between mb-3 border-b border-gray-700/50 pb-2">
                                <h5 className="flex items-center gap-2 text-lg font-bold text-gray-100">
                                    <Film size={18} className="text-brand-purple" />
                                    SHOT #{index + 1}
                                </h5>
                                <span className="flex items-center text-sm font-medium text-yellow-400">
                                    <Clock size={14} className="mr-1" />
                                    {shot.duration} วินาที
                                </span>
                            </div>

                            {/* Audio */}
                            <div className="mb-3">
                                <p className="flex items-start gap-2 text-sm text-gray-400 font-semibold mb-1">
                                    <Mic size={16} className="text-cyan-400 flex-shrink-0 mt-1" />
                                    <span className="text-cyan-300">AUDIO:</span>
                                </p>
                                <p className="text-white ml-6 -mt-1">{shot.audio}</p>
                            </div>

                            {/* Visual */}
                            <div className="mb-3">
                                <p className="flex items-start gap-2 text-sm text-gray-400 font-semibold mb-1">
                                    <Image size={16} className="text-pink-400 flex-shrink-0 mt-1" />
                                    <span className="text-pink-300">VISUAL:</span>
                                </p>
                                <p className="text-white ml-6 -mt-1">{shot.visual}</p>
                            </div>

                            {/* Text On Screen */}
                            <div>
                                <p className="flex items-start gap-2 text-sm text-gray-400 font-semibold mb-1">
                                    <MessageSquare size={16} className="text-red-400 flex-shrink-0 mt-1" />
                                    <span className="text-red-300">TEXT ON SCREEN:</span>
                                </p>
                                <p className="bg-red-900/30 text-yellow-100 font-black p-2 rounded-lg text-center ml-6 -mt-1 border border-red-800">
                                    {shot.text_on_screen}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    // กรณีไม่มี Script Shots ส่งกลับมา
                    <div className="p-4 bg-gray-800 rounded-lg text-center text-gray-400 border border-gray-700">
                        ไม่พบรายละเอียดช็อตวิดีโอ (AI อาจส่งข้อมูลไม่ครบถ้วน)
                    </div>
                )}
            </div>

            {/* 3. Call to Action */}
            <div className="bg-dark-accent p-4 rounded-xl border-l-4 border-green-500 shadow-md">
                <h4 className="text-xl font-extrabold text-green-500 mb-1">🎯 CALL TO ACTION</h4>
                <p className="text-lg font-bold text-white leading-tight">
                    {data.call_to_action || "-"}
                </p>
            </div>
            
            <p className="text-xs text-gray-600 pt-4 text-center">หัวข้อ: {data.title}</p>
        </div>
    );
};

export default ScriptDisplay;