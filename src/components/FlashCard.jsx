import React from "react";
import parse from "html-react-parser";

const FlashCard = ({ flipped, frontContent, backContent, onFlip, index }) => {
  return (
    <div className={`card-container ${flipped ? "flipped" : ""} group`}>
      <div className="card-content">
        {/* Front Face */}
        <div
          onClick={onFlip}
          className="card-face card-front bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 border border-white/10 overflow-hidden cursor-pointer"
        >
          {/* Subtle patterns/glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 mb-8 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <i
                data-feather={index === 0 ? "zap" : index === 1 ? "activity" : "award"}
                className="w-8 h-8 text-yellow-300"
              />
            </div>
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase opacity-70 mb-2">Thẻ số</h2>
            <div className="text-6xl font-black font-playfair mb-6 tracking-tighter">0{index + 1}</div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md opacity-60 group-hover:opacity-100 transition-opacity">
              <i data-feather="mouse-pointer" className="w-3 h-3 text-white"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Nhấn để xem</span>
            </div>
          </div>

          {/* Bottom badge */}
          <div className="absolute bottom-6 flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-8 h-1 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Back Face */}
        <div className="card-face card-back glass border-2 border-indigo-50/50">
          <div className="absolute top-6 left-6 opacity-5">
            <i data-feather="message-circle" className="w-12 h-12 text-indigo-900" />
          </div>

          <div className="w-full text-center font-medium text-slate-800 leading-relaxed overflow-y-auto max-h-[300px] scroll-hide px-2">
            <div className="prose prose-sm prose-slate prose-img:rounded-xl prose-img:shadow-sm">
              {parse(backContent || "Đang tải lời khuyên...")}
            </div>
          </div>

          <div className="mt-8 pt-6 w-full border-t border-slate-100 flex justify-center">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Lời khuyên dành cho bạn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
