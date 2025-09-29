import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfileByUsername } from '../services/profileService';
import { Profile } from '../types';
import ProfileEditor from './ProfileEditor';
import Linktree from './Linktree';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const userProfile = await getProfileByUsername(user.username);
        setProfile(userProfile);
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">We couldn't find your profile. Please try again later.</p>
          <button
            onClick={handleSignOut}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <div className="relative">
        <button
          onClick={() => setPreviewMode(false)}
          className="fixed top-4 left-4 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors z-50"
        >
          ← Back to Dashboard
        </button>
        <Linktree profile={profile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.displayName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Your profile</p>
                <p className="font-medium text-gray-800">linkhubpro.com/{user?.username}</p>
              </div>
              <button
                onClick={() => setPreviewMode(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Preview
              </button>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Links</p>
                  <p className="text-2xl font-bold text-gray-800">{profile.links.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-sm text-gray-800">{profile.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Profile Preview</h3>
                <button
                  onClick={() => setPreviewMode(true)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View Full Page
                </button>
              </div>
              
              {/* Mini Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-center mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full mx-auto border border-gray-200"
                  />
                  <h4 className="font-semibold text-gray-800 mt-2">{profile.name}</h4>
                  <p className="text-sm text-gray-600">{profile.bio.split('\n')[0]}</p>
                </div>
                <div className="space-y-2">
                  {profile.links.slice(0, 3).map((link) => (
                    <div
                      key={link.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-3"
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="text-sm font-medium text-gray-800">{link.title}</span>
                    </div>
                  ))}
                  {profile.links.length > 3 && (
                    <p className="text-center text-sm text-gray-500">
                      +{profile.links.length - 3} more links
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Editor */}
      <ProfileEditor profile={profile} onProfileChange={setProfile} />
    </div>
  );
};

export default Dashboard;
