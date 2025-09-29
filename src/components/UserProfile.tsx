import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileByUsername } from '../services/profileService';
import { Profile } from '../types';
import Linktree from './Linktree';

const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (username) {
        try {
          const userProfile = await getProfileByUsername(username);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            setError('Profile not found');
          }
        } catch (error) {
          setError('Failed to load profile');
        }
      }
      setLoading(false);
    };

    loadProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <Linktree profile={profile} />;
};

export default UserProfile;
