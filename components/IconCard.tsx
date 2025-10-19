import React from 'react';

interface IconCardProps {
  src: string;
  index: number;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);


const IconCard: React.FC<IconCardProps> = ({ src, index }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `generated-icon-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative aspect-square bg-base-300 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/20">
      <img
        src={src}
        alt={`Generated Icon ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleDownload}
          className="flex items-center bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-black/60 transition-colors"
        >
          <DownloadIcon />
          Download
        </button>
      </div>
    </div>
  );
};

export default IconCard;
