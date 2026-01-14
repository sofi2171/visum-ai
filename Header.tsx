
import React from 'react';
import { User } from 'firebase/auth';

interface HeaderProps {
  user?: User | null;
  credits?: number;
  onMenuClick?: () => void;
  onLaunch?: () => void;
  canInstall?: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, credits, onMenuClick, onLaunch, canInstall }) => {
  return (
    <header className="border-b border-white/10 bg-[#050505] sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Name & Identity */}
        <div className="flex items-center gap-3 md:gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105 group-hover:rotate-6">
            <i className="fas fa-eye text-black text-xl md:text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
              VISUM <span className="text-teal-400">AI</span>
            </h1>
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mt-1 hidden xs:block">
              Premium Studio
            </span>
          </div>
        </div>
        
        {/* User Interaction Area */}
        <div className="flex items-center gap-3 md:gap-6">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              {/* Credits Section */}
              <div className="flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl bg-teal-500/5 border border-teal-500/10 text-teal-400 shadow-inner group">
                <i className="fas fa-bolt text-[10px] md:text-[12px] animate-pulse"></i>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm md:text-base font-black tracking-tight leading-none">
                    {credits ?? 0}
                  </span>
                  <span className="text-[8px] md:text-[9px] font-bold uppercase opacity-50 tracking-widest">Credits</span>
                </div>
              </div>

              {/* Sidebar Toggle */}
              <button 
                onClick={onMenuClick}
                title="Menu"
                className="w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center gap-1.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <span className="w-5 h-0.5 bg-white rounded-full group-hover:w-7 transition-all"></span>
                <span className="w-7 h-0.5 bg-white rounded-full group-hover:bg-teal-400 transition-all"></span>
                <span className="w-5 h-0.5 bg-white rounded-full group-hover:w-7 transition-all"></span>
              </button>
            </div>
          ) : (
            <button 
              onClick={onLaunch}
              className="px-6 md:px-8 py-3.5 md:py-4.5 bg-white text-black rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-teal-400 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              {canInstall ? 'Install App' : 'Access Studio'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
