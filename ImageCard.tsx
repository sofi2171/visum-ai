
import React, { useState } from 'react';
import { GeneratedItem, ImageFormat, AspectRatio } from '../types';

interface ImageCardProps {
  image: GeneratedItem;
  onDelete: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const getAspectClass = (ratio: AspectRatio) => {
    switch (ratio) {
      case '1:1': return 'aspect-square';
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '4:3': return 'aspect-[4/3]';
      case '3:4': return 'aspect-[3/4]';
      case '2:3': return 'aspect-[2/3]';
      case '3:2': return 'aspect-[3/2]';
      case '5:4': return 'aspect-[5/4]';
      default: return 'aspect-square';
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `visionary-${image.id}.${image.type === 'image' ? 'png' : 'mp4'}`;
    link.click();
  };

  return (
    <div className="group relative glass-morphism rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-teal-500/30 transition-all duration-700 hover:shadow-2xl h-fit break-inside-avoid mb-8">
      <div className={`${getAspectClass(image.config.aspectRatio)} bg-[#0a0a0a] relative overflow-hidden`}>
        {image.type === 'image' ? (
          <img src={image.url} alt={image.prompt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        ) : (
          <video src={image.url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <div className="space-y-3">
            <div className="flex gap-1.5 mb-2">
              <span className="text-[8px] font-black bg-white text-black px-2 py-0.5 rounded-full uppercase tracking-widest">{image.config.aspectRatio}</span>
              <span className="text-[8px] font-black bg-teal-500 text-black px-2 py-0.5 rounded-full uppercase tracking-widest">{image.type}</span>
            </div>
            <p className="text-white text-[10px] font-medium leading-relaxed italic line-clamp-2">"{image.prompt}"</p>
            <div className="flex gap-2 pt-2">
              <button onClick={handleDownload} className="flex-1 py-2 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-teal-400 transition-colors">Download</button>
              <button onClick={() => onDelete(image.id)} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><i className="fas fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
