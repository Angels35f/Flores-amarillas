import React from 'react';

const Tooltip = ({ word, translation }) => {
  return (
    <span className="relative group inline-block">
      
      <span className="font-bold text-teal-600 cursor-pointer underline decoration-dotted">
        {word}
      </span>

      <span 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max 
                   bg-gray-800 text-white text-xs rounded-md py-1 px-3 shadow-lg 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   pointer-events-none"
      >
        {translation}
        <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                      border-x-4 border-x-transparent 
                      border-t-4 border-t-gray-800">
        </span>
      </span>

    </span>
  );
};

export default Tooltip;