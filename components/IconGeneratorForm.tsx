import React, { useState } from 'react';

interface IconGeneratorFormProps {
  onGenerate: (prompt: string, batchSize: number, style: string) => void;
  isLoading: boolean;
}

const batchSizes = [4, 8, 12];
const styles = [
  { key: 'flat', name: 'Flat' },
  { key: 'gradient', name: 'Gradient' },
  { key: '3d', name: '3D Render' },
  { key: 'line-art', name: 'Line Art' },
  { key: 'pixel-art', name: 'Pixel Art' },
  { key: 'claymorphic', name: 'Claymorphic' },
  { key: 'origami', name: 'Origami' },
  { key: 'isometric', name: 'Isometric' },
];

const IconGeneratorForm: React.FC<IconGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [batchSize, setBatchSize] = useState<number>(8);
  const [style, setStyle] = useState<string>('flat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt, batchSize, style);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-content-100 mb-2">
          Describe your icon
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A minimalist fox logo for a browser extension"
          className="w-full p-3 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-white placeholder-content-200"
          rows={3}
          disabled={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-content-100 mb-2">
            Icon Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            disabled={isLoading}
            className="w-full p-3 bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-white"
          >
            {styles.map((s) => (
              <option key={s.key} value={s.key}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-content-100 mb-2">
            Batch Size
          </label>
          <div className="flex space-x-2 h-full items-center">
            {batchSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setBatchSize(size)}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition duration-200 h-full ${
                  batchSize === size
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-base-300 text-content-100 hover:bg-base-100'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {size} Icons
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt}
        className="w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Icons'
        )}
      </button>
    </form>
  );
};

export default IconGeneratorForm;