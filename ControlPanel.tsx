
import React, { useState, useRef, useEffect } from 'react';
import { GeneratorSettings, AspectRatio, VisualStyle } from '../types';

interface ControlPanelProps {
  settings: GeneratorSettings;
  onSettingsChange: (settings: GeneratorSettings) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onSettingsChange }) => {
  const [activeDropdown, setActiveDropdown] = useState<'horizontal' | 'vertical' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const horizontalRatios: { label: string; value: AspectRatio; icon: string }[] = [
    { label: 'Square (1:1)', value: '1:1', icon: 'fa-square' },
    { label: 'Widescreen (16:9)', value: '16:9', icon: 'fa-tv' },
    { label: 'Classic (4:3)', value: '4:3', icon: 'fa-window-maximize' },
    { label: 'Photo (3:2)', value: '3:2', icon: 'fa-image' },
    { label: 'Print (5:4)', value: '5:4', icon: 'fa-file-image' },
  ];

  const verticalRatios: { label: string; value: AspectRatio; icon: string }[] = [
    { label: 'Social (9:16)', value: '9:16', icon: 'fa-mobile-alt' },
    { label: 'Portrait (3:4)', value: '3:4', icon: 'fa-portrait' },
    { label: 'Story (2:3)', value: '2:3', icon: 'fa-rectangle-portrait' },
  ];

  const styles: { label: string; value: VisualStyle; icon: string }[] = [
    { label: 'Cinematic', value: 'cinematic', icon: 'fa-film' },
    { label: 'Realistic', value: 'realistic', icon: 'fa-camera' },
    { label: 'Anime Art', value: 'anime', icon: 'fa-palette' },
    { label: '3D Render', value: '3d-render', icon: 'fa-cube' },
    { label: 'Oil Painting', value: 'oil-painting', icon: 'fa-paint-brush' },
    { label: 'Neon Punk', value: 'neon-punk', icon: 'fa-bolt' },
  ];

  const isVerticalSelected = verticalRatios.some(r => r.value === settings.aspectRatio);
  const currentRatio = [...horizontalRatios, ...verticalRatios].find(r => r.value === settings.aspectRatio);

  return (
    <div className="flex flex-col gap-6" ref={dropdownRef}>
      {/* Ratio Selection */}
      <div className="glass-morphism rounded-[2.5rem] p-6 md:p-8 border border-white/5 space-y-6 relative">
        <div className="flex items-center justify-between">
           <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Frame Geometry</label>
           <div className="flex items-center gap-2 bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20">
             <i className={`fas ${currentRatio?.icon || 'fa-vector-square'} text-[10px] text-teal-400`}></i>
             <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">{currentRatio?.label || settings.aspectRatio}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Horizontal / Square Selector */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'horizontal' ? null : 'horizontal')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${!isVerticalSelected ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
            >
              <div className="flex items-center gap-3">
                <i className="fas fa-arrows-left-right text-xs"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Landscape / Square</span>
              </div>
              <i className={`fas fa-chevron-${activeDropdown === 'horizontal' ? 'up' : 'down'} text-[10px] opacity-50`}></i>
            </button>

            {activeDropdown === 'horizontal' && (
              <div className="absolute top-full left-0 right-0 mt-3 z-[100] bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2">
                {horizontalRatios.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => {
                      onSettingsChange({ ...settings, aspectRatio: r.value });
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-none ${settings.aspectRatio === r.value ? 'bg-white/5 text-teal-400' : 'text-gray-400'}`}
                  >
                    <i className={`fas ${r.icon} w-4 text-xs`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
                    {settings.aspectRatio === r.value && <i className="fas fa-check ml-auto text-[10px]"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vertical / Portrait Selector */}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === 'vertical' ? null : 'vertical')}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isVerticalSelected ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}
            >
              <div className="flex items-center gap-3">
                <i className="fas fa-arrows-up-down text-xs"></i>
                <span className="text-[10px] font-black uppercase tracking-widest">Portrait Modes</span>
              </div>
              <i className={`fas fa-chevron-${activeDropdown === 'vertical' ? 'up' : 'down'} text-[10px] opacity-50`}></i>
            </button>

            {activeDropdown === 'vertical' && (
              <div className="absolute top-full left-0 right-0 mt-3 z-[100] bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2">
                {verticalRatios.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => {
                      onSettingsChange({ ...settings, aspectRatio: r.value });
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-none ${settings.aspectRatio === r.value ? 'bg-white/5 text-teal-400' : 'text-gray-400'}`}
                  >
                    <i className={`fas ${r.icon} w-4 text-xs`}></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">{r.label}</span>
                    {settings.aspectRatio === r.value && <i className="fas fa-check ml-auto text-[10px]"></i>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Style Direction */}
      <div className="glass-morphism rounded-[2.5rem] p-6 md:p-8 border border-white/5">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] block mb-6">Visual Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {styles.map((s) => (
            <button
              key={s.value}
              onClick={() => onSettingsChange({ ...settings, style: s.value })}
              className={`py-4 px-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all duration-500 flex flex-col items-center justify-center gap-3 ${settings.style === s.value ? 'bg-teal-500/10 border-teal-500/40 text-teal-400 shadow-lg shadow-teal-500/5' : 'bg-white/5 border-transparent text-gray-500 hover:bg-white/10'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${settings.style === s.value ? 'bg-teal-400 text-black scale-110 shadow-lg' : 'bg-white/10 text-gray-400'}`}>
                <i className={`fas ${s.icon}`}></i>
              </div>
              <span className="text-center truncate w-full">{s.label}</span>
            </button>
          ))}
          <button
            onClick={() => onSettingsChange({ ...settings, style: 'none' })}
            className={`py-4 px-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-3 ${settings.style === 'none' ? 'bg-teal-500/10 border-teal-500/40 text-teal-400' : 'bg-white/5 border-transparent text-gray-500 hover:bg-white/10'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${settings.style === 'none' ? 'bg-teal-400 text-black scale-110' : 'bg-white/10 text-gray-400'}`}>
              <i className="fas fa-ban"></i>
            </div>
            <span>None</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
