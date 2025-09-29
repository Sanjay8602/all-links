import React from 'react';
import { Link } from '../types';

interface LinkButtonProps {
  link: Link;
  primaryColor: string;
  textColor: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, primaryColor, textColor }) => {
  const handleClick = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-center space-x-3">
        {link.icon && (
          <span className="text-lg">
            {link.icon}
          </span>
        )}
        <span className="font-medium text-gray-800 text-base">
          {link.title}
        </span>
      </div>
    </button>
  );
};

export default LinkButton;
