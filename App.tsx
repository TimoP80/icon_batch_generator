import React, { useState, useCallback } from 'react';
import IconGeneratorForm from './components/IconGeneratorForm';
import IconGrid from './components/IconGrid';
import Spinner from './components/Spinner';
import { generateIconsBatch } from './services/geminiService';

declare var JSZip: any;

const App: React.FC = () => {
  const [generatedIcons, setGeneratedIcons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, batchSize: number, style: string, generateVariations: boolean) => {
    if (!prompt) {
      setError('Please enter a prompt to generate icons.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedIcons([]);

    try {
      const icons = await generateIconsBatch(prompt, batchSize, style, generateVariations);
      setGeneratedIcons(icons);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setGeneratedIcons([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadAll = useCallback(async () => {
    if (generatedIcons.length === 0 || typeof JSZip === 'undefined') {
      setError('Could not download all icons. JSZip library not found.');
      return;
    }

    setIsZipping(true);
    setError(null);

    try {
        const zip = new JSZip();

        generatedIcons.forEach((iconSrc, index) => {
            const base64Data = iconSrc.split(',')[1];
            if (base64Data) {
                zip.file(`icon-${index + 1}.png`, base64Data, { base64: true });
            }
        });

        const zipBlob = await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: {
                level: 9
            }
        });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = 'icons.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

    } catch (err) {
        setError(err instanceof Error ? `Failed to create zip file: ${err.message}` : 'An unknown error occurred while zipping.');
    } finally {
        setIsZipping(false);
    }
}, [generatedIcons]);

  return (
    <div className="relative min-h-screen bg-base-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-primary/20 blur-3xl -z-0" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-secondary/20 blur-3xl -z-0" />

      <header className="w-full max-w-6xl mb-8 text-center z-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          AI Icon Batch <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Generator</span>
        </h1>
        <p className="mt-4 text-lg text-content-200 max-w-2xl mx-auto">
          Create beautiful, consistent icons for your application library in seconds.
        </p>
      </header>

      <main className="w-full max-w-6xl flex-grow z-10">
        <div className="bg-base-200/50 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/10">
          <IconGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-center p-10">
              <Spinner />
              <p className="mt-4 text-lg text-content-100 font-medium">Brewing up a fresh batch of icons...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center text-center p-10 bg-gradient-to-b from-red-900/50 to-transparent border border-red-500/50 rounded-lg">
              <p className="text-red-400 font-semibold">{error}</p>
            </div>
          ) : generatedIcons.length > 0 ? (
            <>
              <div className="mb-6 flex justify-end">
                <button
                  onClick={handleDownloadAll}
                  disabled={isZipping}
                  className="inline-flex items-center justify-center py-2 px-5 bg-gradient-to-r from-brand-secondary to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isZipping ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Zipping...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download All (.zip)
                    </>
                  )}
                </button>
              </div>
              <IconGrid icons={generatedIcons} />
            </>
          ) : (
             <div className="text-center p-10 border-2 border-dashed border-base-300 rounded-lg flex flex-col items-center justify-center space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-content-200">Your generated icons will appear here.</p>
             </div>
          )}
        </div>
      </main>
      <footer className="w-full max-w-6xl mt-12 text-center text-content-200 text-sm z-10">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;