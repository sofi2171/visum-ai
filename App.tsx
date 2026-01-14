
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { GeneratedItem, GeneratorSettings, VisualStyle, GenerationMode } from './types';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ImageCard from './components/ImageCard';
import Loader from './components/Loader';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Sidebar from './components/Sidebar';

const INITIAL_CREDITS = 20;
const IMAGE_COST = 2;
const VIDEO_COST = 15;

const STYLE_PROMPTS: Record<VisualStyle, string> = {
  none: "",
  cinematic: " cinematic film still, anamorphic lens, 35mm film grain, moody lighting, professional color grading, highly detailed, 8k, epic composition",
  realistic: " hyper-realistic professional photography, 85mm lens, f/1.8, high detail, natural textures, sharp focus, ultra-detailed skin and lighting, masterwork",
  anime: " high-end modern anime style, vibrant cel shading, detailed background, crisp linework, studio ghibli and ufotable inspired, aesthetic digital art",
  '3d-render': " intricate 3d octane render, volumetric lighting, subsurface scattering, unreal engine 5 style, raytracing, highly detailed masterpiece",
  minimalist: " modern minimalist vector illustration, flat design style, clean geometric shapes, professional graphic design",
  'oil-painting': " classical impressionist oil painting, thick impasto brushstrokes, textured canvas, vibrant artistic palette, museum quality",
  'neon-punk': " cyberpunk neon aesthetic, glowing light trails, futuristic tech, high contrast, magenta and cyan color palette",
  'vintage-poster': " retro 1950s travel poster style, bold blocky typography, screen print texture, aged paper effect",
  'pencil-sketch': " detailed graphite pencil sketch on heavy paper, delicate cross-hatching, professional charcoal drawing style"
};

const API_RATIO_MAP: Record<string, string> = {
  '1:1': '1:1', '16:9': '16:9', '9:16': '9:16', '4:3': '4:3', '3:4': '3:4', '2:3': '3:4', '3:2': '4:3', '5:4': '4:3'
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [settings, setSettings] = useState<GeneratorSettings>({
    mode: 'image',
    model: 'gemini-2.5-flash-image',
    aspectRatio: '1:1',
    enhancePrompt: true,
    style: 'none'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAuthModal(false);
        const savedHistory = localStorage.getItem(`visum_history_${currentUser.uid}`);
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        
        const today = new Date().toDateString();
        const storageKey = `visum_user_data_${currentUser.uid}`;
        const savedData = localStorage.getItem(storageKey);

        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.lastRefillDate !== today) {
            setCredits(INITIAL_CREDITS);
            localStorage.setItem(storageKey, JSON.stringify({ credits: INITIAL_CREDITS, lastRefillDate: today }));
          } else {
            setCredits(parsed.credits);
          }
        } else {
          setCredits(INITIAL_CREDITS);
          localStorage.setItem(storageKey, JSON.stringify({ credits: INITIAL_CREDITS, lastRefillDate: today }));
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGenerate = async () => {
    const cost = settings.mode === 'image' ? IMAGE_COST : VIDEO_COST;
    if (!prompt.trim() || isGenerating) return;
    if (credits < cost) {
      setError(`Insufficient credits. You need ${cost} CR but have ${credits} CR.`);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let finalPrompt = prompt;

      if (settings.enhancePrompt) {
        try {
          const textRes = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Refine for visual AI: "${prompt}". Be descriptive. Only return the prompt.`,
          });
          finalPrompt = textRes.text || prompt;
        } catch {
          finalPrompt = prompt + STYLE_PROMPTS[settings.style];
        }
      } else {
        finalPrompt = prompt + STYLE_PROMPTS[settings.style];
      }

      if (settings.mode === 'image') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: finalPrompt }] },
          config: { imageConfig: { aspectRatio: (API_RATIO_MAP[settings.aspectRatio] as any) || "1:1" } }
        });

        let base64 = '';
        response.candidates?.[0]?.content?.parts?.forEach(p => { if (p.inlineData) base64 = p.inlineData.data; });

        if (!base64) throw new Error("Generation Failed");

        const newItem: GeneratedItem = {
          id: Date.now().toString(),
          type: 'image',
          url: `data:image/png;base64,${base64}`,
          prompt,
          timestamp: Date.now(),
          config: { model: 'gemini-2.5-flash-image', aspectRatio: settings.aspectRatio, style: settings.style }
        };
        updateState(newItem, cost);
      } else {
        let op = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: finalPrompt,
          config: { numberOfVideos: 1, resolution: '720p', aspectRatio: settings.aspectRatio === '16:9' ? '16:9' : '9:16' }
        });

        while (!op.done) {
          await new Promise(r => setTimeout(r, 8000));
          op = await ai.operations.getVideosOperation({ operation: op });
        }

        const link = op.response?.generatedVideos?.[0]?.video?.uri;
        if (!link) throw new Error("Video Failed");
        const res = await fetch(`${link}&key=${process.env.API_KEY}`);
        const url = URL.createObjectURL(await res.blob());

        const newItem: GeneratedItem = {
          id: Date.now().toString(),
          type: 'video',
          url,
          prompt,
          timestamp: Date.now(),
          config: { model: 'veo-3.1-fast-generate-preview', aspectRatio: settings.aspectRatio, style: settings.style }
        };
        updateState(newItem, cost);
      }
      setPrompt('');
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateState = (item: GeneratedItem, cost: number) => {
    if (!user) return;
    const newHistory = [item, ...history];
    setHistory(newHistory);
    localStorage.setItem(`visum_history_${user.uid}`, JSON.stringify(newHistory));
    const newCredits = credits - cost;
    setCredits(newCredits);
    localStorage.setItem(`visum_user_data_${user.uid}`, JSON.stringify({ credits: newCredits, lastRefillDate: new Date().toDateString() }));
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="bg-[#050505]">
        <LandingPage onStart={() => setShowAuthModal(true)} />
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <Header 
        user={user} 
        credits={credits} 
        onMenuClick={() => setIsMenuOpen(true)} 
      />

      <Sidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onLogout={handleLogout}
        history={history}
        onDelete={(id) => {
          const filtered = history.filter(h => h.id !== id);
          setHistory(filtered);
          localStorage.setItem(`visum_history_${user.uid}`, JSON.stringify(filtered));
        }}
      />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <div className="bg-white/5 p-1.5 rounded-2xl flex gap-1">
              <button 
                onClick={() => setSettings({...settings, mode: 'image'})}
                className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${settings.mode === 'image' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Images
              </button>
              <button 
                onClick={() => setSettings({...settings, mode: 'video'})}
                className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${settings.mode === 'video' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
              >
                Videos
              </button>
            </div>
          </div>

          <div className="glass-morphism rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Type a prompt to generate ${settings.mode === 'image' ? 'stunning visuals' : 'cinematic motion'}...`}
              className="w-full bg-transparent border-none outline-none text-2xl md:text-3xl font-medium placeholder:text-gray-800 min-h-[120px] resize-none"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-white/5 gap-4">
              <button 
                onClick={() => setSettings({...settings, enhancePrompt: !settings.enhancePrompt})}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${settings.enhancePrompt ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : 'bg-white/5 border-white/5 text-gray-500'}`}
              >
                <i className="fas fa-wand-magic-sparkles"></i> Enhance
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full sm:w-auto px-16 py-5 bg-white text-black rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-teal-400 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isGenerating ? 'Processing...' : `Generate ${settings.mode}`}
                {!isGenerating && <span className="px-2 py-0.5 bg-black/10 rounded-lg text-[9px]">-{settings.mode === 'image' ? IMAGE_COST : VIDEO_COST} CR</span>}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl text-xs font-bold flex items-center gap-3">
              <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ControlPanel settings={settings} onSettingsChange={setSettings} />
          </div>

          <div className="pt-12">
            <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-8">Active Studio Gallery</h2>
            {isGenerating && <Loader />}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {history.slice(0, 6).map((item) => (
                <ImageCard key={item.id} image={item} onDelete={(id) => setHistory(history.filter(h => h.id !== id))} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
