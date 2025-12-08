# AuthContext API Integration

## Overview

The authentication system has been upgraded to support real API integration with your backend server.

## Files Created/Updated

### 1. **API Module** - `src/api/index.js`
- Centralized axios instance
- Configured with `baseURL` from environment variables
- Request interceptor for adding JWT tokens
- Response interceptor for handling 401 errors
- Supports credentials/cookies

### 2. **AuthContext** - `src/context/AuthContext.jsx`
- Fetches `/auth/me` on app load to restore session
- **Methods**:
  - `login(email, password)` - Login user
  - `register(payload)` - Register new user
  - `logout()` - Logout user
- Toast notifications for feedback
- Automatic token management

### 3. **Alternative Hook** - `src/hooks/useAuth.js`
- Simpler localStorage-based version (without API)
- Good for quick prototyping
- Can be used instead of AuthContext if you don't need backend integration yet

### 4. **Environment Config** - `.env.example`
- Template for API configuration
- Copy to `.env` and update with your backend URL

## Setup Instructions

### 1. Create Environment File
```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your backend URL
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend API Endpoints Expected

Your backend should implement these endpoints:

#### **GET** `/api/auth/me`
- Returns current user if authenticated
- Response: `{ user: { id, name, email, photoURL, ... } }`

#### **POST** `/api/auth/login`
- Body: `{ email, password }`
- Response: `{ user: {...}, token: "..." }`

#### **POST** `/api/auth/register`
- Body: `{ name, email, password, ... }`
- Response: `{ user: {...}, token: "..." }`

#### **POST** `/api/auth/logout`
- Clears server-side session
- Response: `{ message: "Logged out" }`

### 3. Usage in Components

```jsx
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Success toast will show automatically
      navigate('/dashboard');
    } catch (error) {
      // Error toast will show automatically
    }
  };

  return (
    // Your login form
  );
}
```

## Toast Notifications

The app now uses `react-toastify` for user feedback:
- **Success**: Green notifications for successful actions
- **Error**: Red notifications for errors
- **Info**: Blue notifications for informational messages

All notifications auto-close after 3 seconds.

## Token Management

Tokens are automatically:
- Stored in `localStorage` on login/register
- Added to request headers via axios interceptor
- Removed on logout or 401 errors

## Current Implementation

The AuthContext is already integrated into your app:
- ✅ Wrapped in `App.jsx`
- ✅ Used in `Navbar.jsx` and `UserAvatar.jsx`
- ✅ ToastContainer added for notifications

## Testing Without Backend

If you don't have a backend yet:
1. The current implementation will show a toast error when trying to fetch `/auth/me`
2. You can use the simpler `src/hooks/useAuth.js` version instead
3. Or mock the API responses for testing

## Next Steps

1. Create your backend API with the endpoints listed above
2. Update `.env` with your backend URL
3. Create Login and Register page components
4. Add protected routes for authenticated users
