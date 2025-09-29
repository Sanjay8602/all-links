import React from 'react';
import { Profile } from '../types';
import LinkButton from './LinkButton';

interface LinktreeProps {
  profile: Profile;
}

const Linktree: React.FC<LinktreeProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-sm mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-200 shadow-sm"
            />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {profile.name}
            </h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>🚀 Building cool stuff</p>
              <p>💡 Sharing ideas</p>
              <p>🌎 Connecting people</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-3 mb-8">
            {profile.links.map((link) => (
              <LinkButton
                key={link.id}
                link={link}
                primaryColor={profile.theme.primaryColor}
                textColor={profile.theme.textColor}
              />
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <span className="text-gray-600 text-sm font-bold">in</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <span className="text-gray-600 text-sm">🐙</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <span className="text-gray-600 text-sm">🐦</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <span className="text-gray-600 text-sm">📷</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-xs">
              Made with ❤️ by {profile.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linktree;
