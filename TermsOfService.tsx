
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Terms of <span className="text-teal-400">Service</span></h1>
      <div className="glass-morphism rounded-3xl p-10 space-y-8 border border-white/5 text-gray-400">
        <p>By using Visionary AI, you agree not to generate illegal, harmful, or sexually explicit content. You retain ownership of the visuals you create, subject to the license terms of the underlying AI models used.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
