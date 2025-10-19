
import React from 'react';
import IconCard from './IconCard';

interface IconGridProps {
  icons: string[];
}

const IconGrid: React.FC<IconGridProps> = ({ icons }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
      {icons.map((iconSrc, index) => (
        <IconCard key={index} src={iconSrc} index={index} />
      ))}
    </div>
  );
};

export default IconGrid;
