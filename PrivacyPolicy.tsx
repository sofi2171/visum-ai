
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Privacy <span className="text-teal-400">Policy</span></h1>
      <div className="glass-morphism rounded-3xl p-10 space-y-8 border border-white/5 text-gray-400 leading-relaxed">
        <p>Visionary AI respects your privacy. We do not store your personal data on our servers. All generated content history is stored locally in your browser's memory.</p>
        <h2 className="text-xl font-bold text-teal-400">Data Processing</h2>
        <p>Your prompts are sent to Google Gemini API for processing. Please refer to Google's AI Privacy Policy for details on how they handle processing data.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
