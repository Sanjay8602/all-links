# LinkHub Pro

A professional, multi-user link sharing platform built with React, TypeScript, and Tailwind CSS. Create beautiful, customizable link pages for unlimited users.

## Features

- 🔐 **User Authentication**: Complete sign-up/sign-in system with Firebase Auth
- 👤 **User Profiles**: Each user gets a unique username and profile page
- 🎨 **Customizable Themes**: Change colors, backgrounds, and text colors
- 🔗 **Dynamic Links**: Add, edit, and remove links with custom icons
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast & Modern**: Built with React 18 and TypeScript
- 🎯 **Easy to Use**: Simple interface for managing your profile
- 🌐 **Public URLs**: Each user gets a unique URL: `linkhubpro.com/username`

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd linkhub-pro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Sign Up**: Create a new account with email, password, username, and display name
2. **Dashboard**: Access your personal dashboard to manage your profile
3. **Edit Profile**: Click the "Edit Profile" button to customize your page
4. **Customize**:
   - Change your name, bio, and avatar
   - Customize theme colors
   - Add, edit, or remove links
   - Add emoji icons to your links
5. **Share**: Your profile is available at `linkhubpro.com/yourusername`
6. **Demo**: Visit `/demo` to see a sample profile

## Project Structure

```
src/
├── components/
│   ├── Linktree.tsx          # Main profile display component
│   ├── LinkButton.tsx        # Individual link button component
│   ├── ProfileEditor.tsx     # Profile editing interface
│   ├── Dashboard.tsx         # User dashboard
│   ├── HomePage.tsx          # Landing page
│   ├── UserProfile.tsx       # Public user profile page
│   └── Auth/
│       ├── AuthPage.tsx      # Authentication page
│       ├── LoginForm.tsx     # Login form
│       └── SignupForm.tsx    # Signup form
├── contexts/
│   └── AuthContext.tsx       # Authentication context
├── services/
│   └── profileService.ts     # Profile data management
├── config/
│   └── firebase.ts           # Firebase configuration
├── data/
│   └── sampleProfile.ts      # Sample profile data
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main app component
└── index.css                 # Global styles with Tailwind
```

## Customization

### Adding New Link Types

You can easily add new types of links by modifying the `Link` interface in `types.ts` and updating the `LinkButton` component to handle different link types.

### Styling

The app uses Tailwind CSS for styling. You can:
- Modify the color scheme in `tailwind.config.js`
- Add custom styles in `index.css`
- Update component styles directly in the JSX

### Data Persistence

Profile data is stored in Firebase Firestore with the following collections:
- **Users**: User account information
- **Profiles**: Public profile data and links

See `SETUP.md` for detailed Firebase configuration instructions.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Firebase** - Authentication and database
- **Create React App** - Development environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).