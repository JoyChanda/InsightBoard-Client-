# PrivateRoute & Role-Based Access Control

## ✅ What Was Implemented

### 1. **PrivateRoute Component** (`src/components/PrivateRoute.jsx`)
- Protects routes from unauthorized access
- Checks if user is logged in
- Optionally checks user role (admin, user, moderator)
- Redirects to `/login` if not authenticated
- Redirects to `/unauthorized` if wrong role

### 2. **Updated AuthContext** (`src/context/AuthContext.jsx`)
- Added `role` field to user object
- Role is included in all auth methods (register, login, Google, GitHub)
- Default role is `'user'`
- During registration, role comes from the form (can select admin/user/moderator)

### 3. **Updated Navbar** (`src/components/Navbar.jsx`)
- Added "Products" link visible to everyone
- "Dashboard" and "Campaigns" links visible only to logged-in users
- "Admin Panel" link visible only to users with `role === "admin"`
- Admin Panel link is highlighted in yellow

### 4. **Unauthorized Page** (`src/pages/Unauthorized.jsx`)
- Shows when user tries to access a route they don't have permission for
- Provides navigation back to accessible pages

### 5. **Updated App.jsx**
- Added route for `/unauthorized`
- Included commented examples showing how to use PrivateRoute

---

## 🔒 How to Use PrivateRoute

### Protect Route (Logged In Users Only)
```jsx
<Route element={<PrivateRoute />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="campaigns" element={<Campaigns />} />
</Route>
```

### Admin-Only Route
```jsx
<Route element={<PrivateRoute requiredRole="admin" />}>
  <Route path="admin" element={<AdminPanel />} />
</Route>
```

### Moderator-Only Route
```jsx
<Route element={<PrivateRoute requiredRole="moderator" />}>
  <Route path="moderator-panel" element={<ModeratorPanel />} />
</Route>
```

---

## 👤 User Object Structure

```javascript
{
  uid: "firebase-user-id",
  email: "user@example.com",
  displayName: "John Doe",
  photoURL: "https://example.com/photo.jpg",
  role: "user" | "admin" | "moderator"
}
```

---

## 🎯 Testing Role-Based Access

### Create an Admin User
1. Go to `/register`
2. Fill in the form
3. Select "Admin" from the "Account Type" dropdown
4. Register

Now you'll see the "Admin Panel" link in the navbar (yellow colored).

### Create a Regular User
1. Register with "User" role selected
2. You won't see the "Admin Panel" link

---

## 🔄 How Roles Work

### Current Implementation
- **Registration**: User selects role from dropdown (user/admin/moderator)
- **Login**: Role is stored with user object
- **Default Role**: All users default to `'user'` role

### Production Best Practices ⚠️
For a real production app, you should:

1. **Store roles in Firestore or your backend database**
   ```javascript
   // In AuthContext, after login:
   const userDoc = await getDoc(doc(db, 'users', user.uid));
   const role = userDoc.data().role;
   setUser({ ...firebaseUser, role });
   ```

2. **Never trust client-side role checks alone**
   - Always verify roles on the backend
   - Client-side checks are for UI only
   - Backend should enforce actual permissions

3. **Secure role assignment**
   - Don't let users choose their own role during registration
   - Assign roles through admin panel or backend logic
   - Use Firebase Admin SDK to set custom claims

---

## 📋 Routes Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page |
| `/about` | Public | About page |
| `/products` | Public | All products grid |
| `/products/:id` | Public | Product details |
| `/login` | Public | Login page |
| `/register` | Public | Registration page |
| `/unauthorized` | Public | Unauthorized access page |
| `/dashboard` | 🔒 Protected | User dashboard (logged in only) |
| `/campaigns` | 🔒 Protected | Campaigns (logged in only) |
| `/admin` | 🔒 Admin Only | Admin panel (admin role required) |

---

## 🚀 Next Steps

1. **Create Dashboard & Campaigns pages** and uncomment the protected routes in App.jsx
2. **Create Admin Panel** page and uncomment the admin route
3. **Implement Firestore** to store user roles persistently
4. **Add backend validation** to verify roles server-side
5. **Add loading states** to PrivateRoute for better UX

---

## 🐛 Troubleshooting

### "Admin Panel" link doesn't show
- Make sure you registered with "Admin" role selected
- Check browser console: `console.log(user)` to see the role
- Verify you're logged in

### Redirected to login when I'm logged in
- Check if `loading` state is still `true` in AuthContext
- Verify Firebase auth state is properly set

### Role doesn't persist after refresh
- Currently, role comes from registration form
- For production, store roles in Firestore/backend
- Fetch role after auth state changes

---

## 📝 Notes

- The current role system allows users to select their role during registration
- This is fine for development/testing
- **For production**, remove role selection from register form and assign roles through an admin interface
- Always validate permissions on the backend, not just the frontend
