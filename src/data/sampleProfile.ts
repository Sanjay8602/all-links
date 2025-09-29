import { Profile } from '../types';

export const sampleProfile: Profile = {
  id: "demo",
  userId: "demo-user",
  username: "demo",
  name: "Your Name",
  bio: "🚀 Building cool stuff\n💡 Sharing ideas\n🌎 Connecting people",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  theme: {
    primaryColor: "#6366f1",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
  },
  links: [
    {
      id: "1",
      title: "Portfolio",
      url: "https://portfolio.example.com",
      icon: "🌐",
    },
    {
      id: "2",
      title: "GitHub",
      url: "https://github.com/username",
      icon: "💻",
    },
    {
      id: "3",
      title: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "💼",
    },
    {
      id: "4",
      title: "Instagram",
      url: "https://instagram.com/username",
      icon: "📸",
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};
