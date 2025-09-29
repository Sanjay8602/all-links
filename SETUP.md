# LinkHub Pro - Multi-User Setup Guide

This is a professional multi-user link sharing platform where unlimited users can create and manage their own beautiful link pages.

## Features

- 🔐 **User Authentication** - Sign up, sign in, and user management
- 👤 **User Profiles** - Each user gets a unique username and profile page
- 🎨 **Customizable Design** - Clean, minimalist design that users can customize
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔗 **Link Management** - Add, edit, and organize your links
- 🌐 **Public URLs** - Each user gets a unique URL: `linkhubpro.com/username`

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and add a web app
   - Copy the config object

### 2. Update Firebase Configuration

Edit `src/config/firebase.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 3. Firestore Security Rules

Update your Firestore security rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Profiles are publicly readable, but only editable by the owner
    match /profiles/{username} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm start
```

## How It Works

### User Flow

1. **Sign Up**: Users create an account with email, password, username, and display name
2. **Profile Creation**: A default profile is automatically created for new users
3. **Dashboard**: Users can manage their profile and links from the dashboard
4. **Public Profile**: Each user gets a unique URL: `linkhubpro.com/username`

### Database Structure

#### Users Collection (`users/{userId}`)
```javascript
{
  email: string,
  username: string,
  displayName: string,
  avatar?: string,
  createdAt: Date
}
```

#### Profiles Collection (`profiles/{username}`)
```javascript
{
  id: string,
  userId: string,
  username: string,
  name: string,
  bio: string,
  avatar: string,
  theme: {
    primaryColor: string,
    backgroundColor: string,
    textColor: string
  },
  links: Array<{
    id: string,
    title: string,
    url: string,
    icon?: string
  }>,
  createdAt: Date,
  updatedAt: Date
}
```

## Routes

- `/` - Home page with features and sign-up CTA
- `/auth` - Authentication page (sign in/sign up)
- `/demo` - Demo profile page
- `/dashboard` - User dashboard (protected)
- `/:username` - Public user profile page

## Customization

### Adding New Features

1. **New Link Types**: Add new link types in the ProfileEditor component
2. **Themes**: Extend the Theme interface and add more customization options
3. **Analytics**: Add click tracking and profile view analytics
4. **Social Features**: Add following, likes, or comments

### Styling

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Custom components in `src/index.css`
- Component-specific styles in individual component files

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables if needed
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure redirects for client-side routing

## Security Considerations

- Firestore security rules are configured to protect user data
- User authentication is handled by Firebase Auth
- Profile data is publicly readable but only editable by owners
- Username validation prevents conflicts and inappropriate names

## Support

If you need help setting up or have questions, please check the Firebase documentation or create an issue in the repository.

## License

This project is open source and available under the MIT License.
