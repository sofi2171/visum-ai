
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '2:3' | '3:2' | '5:4';
export type ImageFormat = 'png' | 'jpeg' | 'webp';
export type ModelType = 'gemini-2.5-flash-image' | 'veo-3.1-fast-generate-preview';
export type VisualStyle = 'none' | 'cinematic' | 'realistic' | 'anime' | '3d-render' | 'minimalist' | 'oil-painting' | 'neon-punk' | 'vintage-poster' | 'pencil-sketch';
export type GenerationMode = 'image' | 'video';

export interface GeneratedItem {
  id: string;
  type: GenerationMode;
  url: string;
  prompt: string;
  timestamp: number;
  config: {
    model: ModelType;
    aspectRatio: AspectRatio;
    style: VisualStyle;
  };
}

export interface GeneratorSettings {
  mode: GenerationMode;
  model: ModelType;
  aspectRatio: AspectRatio;
  enhancePrompt: boolean;
  style: VisualStyle;
}
