# 🚀 InsightBoard — Full-Stack MERN Application

A role-based dashboard and product management application built with **React, Node.js, Express, Firebase Auth, MongoDB**, and **Tailwind CSS**.  
This project includes authentication, product details, bookings, a protected dashboard, and dynamic menus based on user roles (admin, manager, buyer).

---

## 🌍 Live Demo

🔗 **Client Live URL:** https://insight-board-client.vercel.app/
🔗 **Server Live URL:** https://your-server-live-url.com

---

## 🎯 Project Purpose

InsightBoard is designed to manage products, orders, users, and bookings through a structured dashboard.  
Users have different permissions depending on their roles (Admin, Manager, Buyer).  
This project demonstrates authentication, private routes, CRUD operations, and dashboard UI logic.

---

## ⭐ Key Features

### 🔐 Authentication

- Firebase Email/Password login
- Google Sign-In
- GitHub OAuth Sign-In
- JWT token-based secure API access
- Protected routes with PrivateRoute
- Role-based UI control

### 🛍️ Product Features

- Product listing with pagination (3-column grid)
- Product details page
- Booking form with image preview
- Image URL-based product images
- Manage products (admin/manager)

### 📊 Dashboard Features

- **Dynamic Sidebar Menu** (Admin / Manager / Buyer)
- Dashboard layout with nested routes
- **Admin:** Manage Users, Manage Products, Manage Orders
- **Manager:** Add Product, View Orders
- **Buyer:** My Orders, Track Order, Wishlist
- Timeline component for order tracking
- Cancel order flow with confirmation modal

### 🎨 UI & Styling

- Tailwind CSS with DaisyUI components
- Dark/Light Theme Toggle (ThemeContext)
- Global styling with `global.css`
- Responsive layout (mobile-first design)
- Custom 404 page with gradient design
- Reusable components (Spinner, Timeline, Table, Pagination)

### 🔧 Backend Features

- Node.js + Express REST API
- JWT verification middleware
- MongoDB with Mongoose
- Secure protected endpoints
- Role-based authorization

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the project**

```bash
git clone https://github.com/your-username/insightboard.git
cd insightboard
```

### **2️⃣ Install client dependencies**

```bash
cd InsightBoard(FE)
npm install
```

### **3️⃣ Install server dependencies** (if separate backend repo)

```bash
cd server
npm install
```

### **4️⃣ Environment Variables**

Create a `.env` file in the client root:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration (from Firebase Console)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **5️⃣ Run client**

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### **6️⃣ Run server** (if separate backend)

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

---

## 🎨 Color Scheme & Theme

- **Primary Color:** Blue (#2563eb)
- **Secondary Color:** Purple (#7c3aed)
- **Success:** Green (#16a34a)
- **Error:** Red (#dc2626)
- **Dark Mode:** Fully supported with Tailwind dark classes

---

## 🔑 User Roles & Permissions

| Role           | Dashboard Access | Can Manage Users | Can Add Products | Can View Orders    | Can Cancel Orders |
| -------------- | ---------------- | ---------------- | ---------------- | ------------------ | ----------------- |
| **Admin**      | ✅ Full Access   | ✅ Yes           | ✅ Yes           | ✅ All Orders      | ✅ Yes            |
| **Manager**    | ✅ Limited       | ❌ No            | ✅ Yes           | ✅ All Orders      | ❌ No             |
| **Buyer/User** | ✅ Personal      | ❌ No            | ❌ No            | ✅ Own Orders Only | ✅ Own Orders     |

---

## 📝 Future Enhancements

- [ ] Real-time order tracking with WebSocket
- [ ] Payment integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Advanced search and filters
- [ ] Email notifications
- [ ] Export data to CSV/PDF
- [ ] Multi-language support
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Joy Chanda**

- Portfolio: [https://your-portfolio.com](https://your-portfolio.com)
- GitHub: [@JoyChanda](https://github.com/JoyChanda)
- LinkedIn: [Joy Chanda](https://linkedin.com/in/joychanda)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [Firebase](https://firebase.google.com)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI](https://daisyui.com)
- [Vite](https://vitejs.dev)

---

⭐ **If you like this project, please give it a star!** ⭐
