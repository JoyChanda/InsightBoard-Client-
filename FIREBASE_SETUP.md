# Firebase Authentication Setup Guide

## ✅ What's Been Implemented

All Firebase Authentication code is now complete and ready to use!

- ✅ Email/Password registration
- ✅ Email/Password login  
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Auto sign-in persistence
- ✅ User-friendly error messages

## 🔧 Required: Firebase Console Setup

To make authentication work, you need to enable providers in Firebase Console:

### Step 1: Enable Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `insightboard-client`
3. Navigate to **Build** → **Authentication** → **Sign-in method**
4. Click **Email/Password** provider
5. Toggle **Enable** to ON
6. Click **Save**

### Step 2: Enable Google OAuth

1. In the same **Sign-in method** tab
2. Click **Google** provider
3. Toggle **Enable** to ON
4. Select a support email from the dropdown
5. Click **Save**

### Step 3: Enable GitHub OAuth

1. In the same **Sign-in method** tab
2. Click **GitHub** provider
3. Toggle **Enable** to ON
4. You'll need to get Client ID and Client Secret from GitHub:

#### Create GitHub OAuth App:

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: InsightBoard
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: Copy from Firebase (will be shown in the GitHub provider setup)
4. Click **Register application**
5. Copy **Client ID** and generate **Client Secret**
6. Paste both into Firebase GitHub provider settings
7. Click **Save**

### Step 4: Add Authorized Domains

1. In the **Sign-in method** tab, scroll to **Authorized domains**
2. Ensure these domains are listed:
   - `localhost`
   - `localhost:5173` (if not auto-added)
   - Your Firebase hosting domains (auto-added)

## 🚀 How to Test

### Test Email Registration:
1. Go to `/register`
2. Fill in name, email, password (min 6 chars, 1 uppercase, 1 lowercase)
3. Click "Create Account"
4. Should see success toast and redirect to home

### Test Google Login:
1. Go to `/login` or `/register`
2. Click "Continue with Google"
3. Select Google account in popup
4. Should see success toast and redirect to home

### Test GitHub Login:
1. Go to `/login` or `/register`
2. Click "Continue with GitHub"
3. Authorize in popup
4. Should see success toast and redirect to home

## 🐛 Troubleshooting

### "Popup blocked" error:
- Allow popups for `localhost:5173` in browser settings

### Google OAuth not working:
- Check that Google provider is enabled in Firebase Console
- Check support email is selected

### GitHub OAuth not working:
- Verify Client ID and Secret are correct
- Ensure callback URL in GitHub app matches Firebase URL
- Check that GitHub provider is enabled in Firebase Console

### Email registration fails:
- Password must be at least 6 characters
- Must include uppercase and lowercase letters
- Email must be valid format

## 📝 Code Structure

```
src/
├── firebase/
│   └── firebase.config.jsx       # Firebase initialization
├── services/
│   └── firebaseAuth.js           # Auth functions
├── context/
│   └── AuthContext.jsx           # Auth state management
└── pages/
    ├── Login.jsx                 # Login page with OAuth
    └── Register.jsx              # Register page with OAuth
```

## ✨ Features Included

- **Auto sign-in persistence**: Users stay logged in after refresh
- **Real-time auth state**: UI updates automatically when auth state changes
- **User-friendly errors**: Clear error messages for all failure cases
- **Loading states**: Buttons disabled during auth operations
- **Form validation**: Client-side validation before Firebase calls
- **Toast notifications**: Success/error feedback for all operations

---

**Next Steps**: Complete the Firebase Console setup above, then test the authentication flows!
