
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-black text-white mb-8 uppercase tracking-tighter">Contact <span className="text-teal-400">Us</span></h1>
      <div className="glass-morphism rounded-3xl p-10 border border-white/5">
        <p className="text-gray-400 mb-6">For support or inquiries, please reach out to us:</p>
        <a href="mailto:support@visionary-ai.pro" className="text-2xl font-bold text-teal-400 hover:text-teal-300">support@visionary-ai.pro</a>
      </div>
    </div>
  );
};

export default Contact;
