export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface Theme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  theme: Theme;
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}
