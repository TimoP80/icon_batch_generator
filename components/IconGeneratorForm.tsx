import React, { useState } from 'react';

interface IconGeneratorFormProps {
  onGenerate: (prompt: string, batchSize: number, style: string, generateVariations: boolean) => void;
  isLoading: boolean;
}

const batchSizes = [4, 8, 12, 16, 20];
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

const examplePrompts = [
  'A cute, smiling robot mascot for a tech startup',
  'Minimalist mountain range logo for an adventure app',
  'Vibrant, abstract paint splash icon for a design tool',
  'A friendly cartoon owl for an educational app',
  'Sleek, futuristic spaceship for a sci-fi game',
  'A simple, green leaf icon for an eco-friendly product',
  'A magnifying glass over a data chart for an analytics app',
];

const IconGeneratorForm: React.FC<IconGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [batchSize, setBatchSize] = useState<number>(8);
  const [style, setStyle] = useState<string>('flat');
  const [generateVariations, setGenerateVariations] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt, batchSize, style, generateVariations);
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrompt = e.target.value;
    if (selectedPrompt) {
      setPrompt(selectedPrompt);
    }
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
          className="w-full p-3 bg-base-100/70 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-white placeholder-content-200"
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div>
        <select
            id="example-prompts"
            onChange={handleExampleSelect}
            value="" // Resets to placeholder after selection
            disabled={isLoading}
            className="w-full p-3 bg-base-100/70 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-white cursor-pointer"
            aria-label="Select an example prompt for inspiration"
        >
            <option value="" disabled>💡 Need inspiration? Select an example...</option>
            {examplePrompts.map((p, i) => (
                <option key={i} value={p}>{p}</option>
            ))}
        </select>
      </div>

      <div className="flex items-center gap-x-3">
        <input
          id="variations-checkbox"
          name="variations"
          type="checkbox"
          checked={generateVariations}
          onChange={(e) => setGenerateVariations(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 rounded border-base-300 bg-base-100/70 text-brand-primary focus:ring-brand-primary focus:ring-offset-base-200"
        />
        <label htmlFor="variations-checkbox" className="block text-sm font-medium leading-6 text-content-100">
          Generate variations of a single concept
        </label>
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
            className="w-full p-3 bg-base-100/70 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 text-white"
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
          <div className="flex space-x-2">
            {batchSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setBatchSize(size)}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition duration-200 ${
                  batchSize === size
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md ring-2 ring-offset-2 ring-offset-base-200 ring-brand-primary'
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
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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