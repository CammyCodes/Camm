import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="w-full max-w-[320px] aspect-[9/19] bg-[#0F172A] rounded-[2.5rem] p-3.5 shadow-2xl border-4 border-slate-800/80 relative overflow-hidden flex flex-col transform-gpu">
      {/* Ear Speaker/Dynamic Island Area Graphic */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#0F172A] rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-12 h-1 bg-slate-800 rounded-full mb-1" />
      </div>

      {/* Internal Phone Workspace OS Screen Layer */}
      <div className="w-full h-full bg-white rounded-[1.85rem] overflow-hidden relative flex flex-col pt-6 font-sans select-none">
        {/* Status Bar */}
        <div className="w-full px-5 pt-1 pb-2 flex justify-between items-center text-[11px] font-mono font-bold text-slate-400 border-b border-slate-50">
          <span>12:00</span>
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true">5G</span>
            <div className="w-5 h-2.5 border border-slate-300 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Dynamic Display Area Components */}
        <div className="flex-1 overflow-hidden relative p-4 bg-slate-50/60">
          {children}
        </div>
      </div>
    </div>
  );
}