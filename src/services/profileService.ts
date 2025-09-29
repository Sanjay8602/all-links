import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Profile, Link } from '../types';

export const getProfileByUsername = async (username: string): Promise<Profile | null> => {
  try {
    const profileDoc = await getDoc(doc(db, 'profiles', username));
    if (profileDoc.exists()) {
      const data = profileDoc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

export const updateProfile = async (profile: Profile): Promise<void> => {
  try {
    await setDoc(doc(db, 'profiles', profile.username), {
      ...profile,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const addLink = async (username: string, link: Link): Promise<void> => {
  try {
    const profile = await getProfileByUsername(username);
    if (profile) {
      const updatedLinks = [...profile.links, link];
      await updateDoc(doc(db, 'profiles', username), {
        links: updatedLinks,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error adding link:', error);
    throw error;
  }
};

export const updateLink = async (username: string, linkId: string, updatedLink: Link): Promise<void> => {
  try {
    const profile = await getProfileByUsername(username);
    if (profile) {
      const updatedLinks = profile.links.map(link => 
        link.id === linkId ? updatedLink : link
      );
      await updateDoc(doc(db, 'profiles', username), {
        links: updatedLinks,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error updating link:', error);
    throw error;
  }
};

export const deleteLink = async (username: string, linkId: string): Promise<void> => {
  try {
    const profile = await getProfileByUsername(username);
    if (profile) {
      const updatedLinks = profile.links.filter(link => link.id !== linkId);
      await updateDoc(doc(db, 'profiles', username), {
        links: updatedLinks,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error deleting link:', error);
    throw error;
  }
};
