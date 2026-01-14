
import React, { useState, useEffect } from 'react';

const Loader: React.FC = () => {
  const [msg, setMsg] = useState("Initializing neural engine...");
  const messages = [
    "Synthesizing visual concepts...",
    "Refining neural pathways...",
    "Optimizing pixels...",
    "Balancing light and shadow...",
    "Applying artistic styles...",
    "Finalizing masterpiece...",
    "Generating creative vision...",
    "Rendering high-quality details..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setMsg(messages[i]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 py-10">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <i className="fas fa-infinity text-teal-500 text-2xl animate-pulse"></i>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight px-4">{msg}</h3>
        <p className="text-[10px] text-teal-400/60 uppercase tracking-[0.4em] font-black">AI Imaging Engine</p>
      </div>
    </div>
  );
};

export default Loader;
