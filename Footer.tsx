
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-24 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-3 mb-8">
           <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
            <i className="fas fa-eye text-white text-sm"></i>
          </div>
          <h3 className="text-xl font-black tracking-tighter text-white">VISUM <span className="text-teal-400">AI</span></h3>
        </div>
        <p className="text-gray-600 text-sm max-w-md mx-auto mb-12 font-medium">
          Empowering creators through frontier AI models. Built for the high-end visual standard of the next generation.
        </p>
        <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
          <a href="#" className="hover:text-teal-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-teal-400 transition-colors">Support</a>
        </div>
        <p className="mt-16 text-[9px] font-bold text-gray-800 uppercase tracking-[0.5em]">
          &copy; 2026 Visum Labs Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
