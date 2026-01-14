
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LandingPageProps {
  onStart: () => void;
  canInstall?: boolean;
  onInstall?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, canInstall, onInstall }) => {
  const articles = [
    {
      title: "Mastering YouTube Thumbnails with AI",
      category: "Growth",
      desc: "Learn how to generate high-contrast, emotive characters and vibrant backgrounds that increase your CTR by 300%.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      tag: "Viral Strategy"
    },
    {
      title: "Cinematic Realism: Lighting & Prompts",
      category: "Tutorial",
      desc: "A deep dive into using anamorphic lens settings and volumetric lighting prompts for photorealistic human portraits.",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
      tag: "Pro Tips"
    },
    {
      title: "The Future of Digital Character Design",
      category: "Art",
      desc: "How Visum AI's Anime engine allows artists to draft complex character sheets in seconds rather than hours.",
      image: "https://images.unsplash.com/photo-1578632738980-43312b54da44?q=80&w=1000&auto=format&fit=crop",
      tag: "Creative Flow"
    }
  ];

  return (
    <div className="bg-[#050505] text-white selection:bg-teal-500/30">
      <Header onLaunch={canInstall ? onInstall : onStart} canInstall={canInstall} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125"
            src="https://player.vimeo.com/external/494252666.sd.mp4?s=7402633096e237305d21c8340d04c0f3c5b525d8&profile_id=165&oauth2_token_id=57447761"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="z-10 text-center max-w-5xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-morphism border-white/5">
             <i className="fas fa-sparkles text-teal-400 text-[10px] animate-pulse"></i>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Frontier AI Visual Engine</span>
          </div>

          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white leading-[0.85] uppercase italic">
            Visual <br />
            <span className="text-gradient">Autonomy</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            The world's most intuitive engine for hyper-fidelity images and motion video. Professional aesthetics at the speed of thought.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={onStart}
              className="group relative px-16 py-7 bg-white text-black rounded-3xl font-black uppercase tracking-[0.2em] text-sm transition-all hover:scale-105 active:scale-95 glow"
            >
              Start Creating Now
              <i className="fas fa-arrow-right ml-4 group-hover:translate-x-1 transition-transform"></i>
            </button>
            <button 
              onClick={() => document.getElementById('articles')?.scrollIntoView({behavior: 'smooth'})} 
              className="px-10 py-7 glass-morphism rounded-3xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Creation Guides (Articles) Section */}
      <section id="articles" className="py-32 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-teal-500 uppercase tracking-[0.5em]">Creation Guides</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase italic">INSIGHTS & STRATEGY</h3>
          </div>
          <p className="text-gray-500 max-w-sm text-sm font-medium">
            Explore our curated guides on how to leverage the full power of Visum AI for your professional brand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group glass-morphism rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col hover:border-teal-500/20 transition-all duration-500 hover:shadow-2xl">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={article.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  alt={article.title}
                  loading="lazy"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-teal-400 border border-teal-500/20">
                    {article.tag}
                  </span>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">{article.category}</p>
                  <h4 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-teal-400 transition-colors uppercase italic">{article.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{article.desc}</p>
                </div>
                <button onClick={onStart} className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-3 group/btn">
                  Read Full Guide 
                  <i className="fas fa-arrow-right text-teal-500 group-hover/btn:translate-x-2 transition-transform"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Masonry Showcase Section */}
      <section id="showcase" className="py-32 px-4 container mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-[10px] font-black text-teal-500 uppercase tracking-[0.5em]">The Standard</h2>
          <h3 className="text-4xl md:text-7xl font-black tracking-tight text-white uppercase italic">CURATED CREATIONS</h3>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {[
            { type: 'img', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop', label: 'Surreal Landscapes' },
            { type: 'video', url: 'https://player.vimeo.com/external/459389137.sd.mp4?s=88484666f49962e24d6731057790b79318a4a58b&profile_id=165&oauth2_token_id=57447761', label: 'Cinematic Motion' },
            { type: 'img', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', label: 'Abstract Vistas' },
            { type: 'img', url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=1000&auto=format&fit=crop', label: 'Hyper-Realistic Portraits' },
            { type: 'video', url: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231da65c1975e526270b200d724f1141753c2901&profile_id=164&oauth2_token_id=57447761', label: 'Atmospheric Effects' },
            { type: 'img', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop', label: 'Dynamic Textures' }
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 glass-morphism break-inside-avoid shadow-2xl transition-all hover:scale-[1.02]">
              {item.type === 'img' ? (
                <img src={item.url} loading="lazy" className="w-full h-auto object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000" alt={item.label} />
              ) : (
                <video autoPlay loop muted playsInline className="w-full h-auto object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000" src={item.url}></video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section id="features" className="py-40 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                title: "4K High Fidelity", 
                desc: "Every generation is optimized for high-resolution displays using the Gemini 2.5 Flash architecture.",
                icon: "fa-gem"
              },
              { 
                title: "Veo Motion Engine", 
                desc: "Fluid 720p and 1080p video generation with consistent temporal stability.",
                icon: "fa-bolt"
              },
              { 
                title: "Style Context", 
                desc: "Choose from 10+ professional art styles curated for the modern creative standard.",
                icon: "fa-wand-magic-sparkles"
              }
            ].map((f, i) => (
              <div key={i} className="space-y-6 p-12 glass-morphism rounded-[3rem] border border-white/5 hover:border-teal-500/20 transition-all group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <i className={`fas ${f.icon} text-black text-2xl`}></i>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter italic text-white">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 px-4 container mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center -z-10">
           <div className="w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[160px] animate-pulse"></div>
        </div>
        
        <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-10 leading-none uppercase italic">
          UNLEASH <br /><span className="text-gradient">YOUR VISION</span>
        </h2>
        <p className="text-xl text-gray-500 mb-16 max-w-2xl mx-auto font-medium">
          20 Free credits daily. Join 50,000+ creators defining the new visual boundary with Visum AI.
        </p>
        <button 
          onClick={onStart}
          className="px-20 py-8 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm hover:bg-teal-400 transition-all hover:scale-105 shadow-2xl"
        >
          Launch Studio
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
