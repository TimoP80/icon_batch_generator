import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-x-4" aria-label="Icon Batch Generator Logo">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* Main container */}
        <rect width="24" height="24" rx="6" fill="url(#logo-gradient)" />
        
        {/* Grid of icons representation */}
        <rect x="5" y="5" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.9)" />
        <rect x="14" y="5" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.9)" />
        <rect x="5" y="14" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.9)" />
        
        {/* 'AI Sparkle' icon */}
        <g transform="translate(14.5, 14.5)">
            <path d="M3 0L3.8995 2.1005L6 3L3.8995 3.8995L3 6L2.1005 3.8995L0 3L2.1005 2.1005L3 0Z" fill="white"/>
        </g>
      </svg>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-content-200">
        Icon Batch Generator
      </h1>
    </div>
  );
};

export default Logo;
