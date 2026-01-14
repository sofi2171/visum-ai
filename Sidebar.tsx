
import React from 'react';
import { GeneratedItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  history: GeneratedItem[];
  onDelete: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogout, history, onDelete }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/5 z-[101] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">Menu</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Account</h3>
            <div className="space-y-2">
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                <span className="text-sm font-bold text-white uppercase tracking-tight">Billing & Quota</span>
                <i className="fas fa-external-link-alt text-xs text-gray-600 group-hover:text-teal-400"></i>
              </a>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all text-red-500"
              >
                <span className="text-sm font-bold uppercase tracking-tight">Sign Out</span>
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Project History</h3>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-500 uppercase">{history.length} ITEMS</span>
            </div>
            
            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="p-8 border border-dashed border-white/5 rounded-3xl text-center">
                  <p className="text-[10px] font-bold text-gray-700 uppercase">No projects found</p>
                </div>
              ) : (
                history.map(item => (
                  <div key={item.id} className="group relative flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                      {item.type === 'image' ? (
                        <img src={item.url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <video src={item.url} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <p className="text-[10px] text-white font-medium truncate mb-1">"{item.prompt}"</p>
                      <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{item.type} • {item.config.aspectRatio}</p>
                    </div>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-all"
                    >
                      <i className="fas fa-trash-can text-[10px]"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 bg-black/50">
          <p className="text-[8px] font-black text-gray-700 uppercase tracking-[0.3em] text-center">Local Storage Sync Active</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
