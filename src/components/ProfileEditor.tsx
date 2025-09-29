import React, { useState, useEffect } from 'react';
import { Profile, Link } from '../types';
import { updateProfile } from '../services/profileService';
import { useAuth } from '../contexts/AuthContext';

interface ProfileEditorProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onProfileChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await updateProfile(editedProfile);
      onProfileChange(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: 'New Link',
      url: 'https://example.com',
      icon: '🔗',
    };
    setEditedProfile({
      ...editedProfile,
      links: [...editedProfile.links, newLink],
    });
  };

  const updateLink = (linkId: string, field: keyof Link, value: string) => {
    setEditedProfile({
      ...editedProfile,
      links: editedProfile.links.map(link =>
        link.id === linkId ? { ...link, [field]: value } : link
      ),
    });
  };

  const removeLink = (linkId: string) => {
    setEditedProfile({
      ...editedProfile,
      links: editedProfile.links.filter(link => link.id !== linkId),
    });
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="fixed top-6 right-6 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md z-40"
      >
        <span className="flex items-center space-x-2">
          <span className="text-sm">✏️</span>
          <span className="font-medium text-sm">Edit Profile</span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Basic Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avatar URL</label>
              <input
                type="url"
                value={editedProfile.avatar}
                onChange={(e) => setEditedProfile({ ...editedProfile, avatar: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Theme</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Color</label>
              <input
                type="color"
                value={editedProfile.theme.primaryColor}
                onChange={(e) => setEditedProfile({
                  ...editedProfile,
                  theme: { ...editedProfile.theme, primaryColor: e.target.value }
                })}
                className="w-full h-10 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Background Color</label>
              <input
                type="color"
                value={editedProfile.theme.backgroundColor}
                onChange={(e) => setEditedProfile({
                  ...editedProfile,
                  theme: { ...editedProfile.theme, backgroundColor: e.target.value }
                })}
                className="w-full h-10 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text Color</label>
              <input
                type="color"
                value={editedProfile.theme.textColor}
                onChange={(e) => setEditedProfile({
                  ...editedProfile,
                  theme: { ...editedProfile.theme, textColor: e.target.value }
                })}
                className="w-full h-10 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Links</h3>
            <button
              onClick={addLink}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Add Link
            </button>
          </div>
          <div className="space-y-3">
            {editedProfile.links.map((link) => (
              <div key={link.id} className="border rounded-lg p-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={link.title}
                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Icon (emoji)"
                    value={link.icon || ''}
                    onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                    className="p-2 border rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => removeLink(link.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
