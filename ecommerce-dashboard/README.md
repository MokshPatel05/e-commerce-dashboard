# E-Commerce Dashboard

A fully responsive e-commerce web application with authentication, product browsing, cart management, and user profile features.

## 🚀 Features

### Authentication
- **User Registration** with validation
- **User Login** with session management
- **5-minute session timeout** with live countdown timer
- Protected routes - users cannot access features without logging in
- Session persistence with localStorage

### Product Management
- Browse products from **Fake Store API**
- **Search** products by name/description
- **Filter** by category
- **Sort** by price (low to high, high to low) and rating
- Responsive product grid layout
- Loading states and error handling

### Shopping Cart
- Add products to cart
- Prevent duplicate items (increase quantity instead)
- Update quantities with +/- buttons
- Remove items from cart
- View item subtotals and cart total
- Cart badge showing item count
- Cart data persists per user

### User Profile
- View user information
- Edit name and email
- Change password with current password verification
- Form validation

### UI/UX
- **Fully responsive** design (mobile, tablet, desktop)
- Clean and modern interface with **Tailwind CSS**
- Navigation bar with session timer
- Loading indicators
- Empty states for cart and products
- Error handling with user-friendly messages

## 🛠️ Tech Stack

- **React** 18 (with Vite)
- **React Router** 6 (for navigation)
- **Tailwind CSS** (for styling)
- **Lucide React** (for icons)
- **Fake Store API** (for product data)
- **localStorage** (for data persistence)

## 📦 Installation

1. **Extract the ZIP file**
```bash
unzip ecommerce-dashboard.zip
cd ecommerce-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 Deployment

### Deploy to Vercel

1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy
```bash
vercel
```

4. For production deployment
```bash
vercel --prod
```

### Deploy to Netlify

1. Build the project
```bash
npm run build
```

2. Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

3. Deploy
```bash
netlify deploy
```

4. For production deployment
```bash
netlify deploy --prod
```

Or use the **Netlify web interface**:
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Your site is live!

## 📁 Project Structure

```
ecommerce-dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar with session timer
│   │   ├── ProductCard.jsx      # Product card component
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   └── LoadingSpinner.jsx   # Loading indicator
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state management
│   │   └── CartContext.jsx      # Shopping cart state management
│   ├── hooks/
│   │   └── useProducts.js       # Custom hook for fetching products
│   ├── pages/
│   │   ├── Register.jsx         # Registration page
│   │   ├── Login.jsx            # Login page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Products.jsx         # Product listing page
│   │   ├── Cart.jsx             # Shopping cart page
│   │   └── Profile.jsx          # User profile page
│   ├── App.jsx                  # Main app component with routes
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles & Tailwind directives
├── public/                      # Static assets
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## 🔐 How to Use

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Session Timer**: You have 5 minutes to browse and shop (timer shown in navbar)
4. **Browse Products**: Search, filter, and sort products
5. **Add to Cart**: Click "Add to Cart" on any product
6. **Manage Cart**: Update quantities or remove items
7. **Edit Profile**: Update your name, email, or password
8. **Logout**: Click logout in the navbar

## 🎨 Key Features Implementation

### Session Management
- 5-minute session timer starts on login
- Live countdown displayed in navbar
- Automatic logout when session expires
- Alert notification before logout

### Authentication Flow
- All routes protected except login/register
- Automatic redirect to login if not authenticated
- Session persistence across page refreshes
- Secure password handling

### Cart Management
- Persistent cart per user (stored in localStorage)
- Quantity management with validation
- Real-time total calculation
- Empty cart state

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Hamburger menu on mobile
- Optimized layouts for all screen sizes

## 🧪 Testing the Application

1. **Register a new user**
   - Name: Test User
   - Email: test@example.com
   - Password: test123

2. **Login with the created account**

3. **Browse products** and add some to cart

4. **Test session timeout** by waiting 5 minutes

5. **Edit profile** information

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Bonus Features Implemented

- ✅ Product search functionality
- ✅ Category filter
- ✅ Sort by price and rating
- ✅ Clean and modern UI
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Session timer display
- ✅ Responsive navigation
- ✅ Cart item counter badge

## 🔒 Security Notes

- Passwords are stored in localStorage (for demo purposes)
- In production, use a proper backend with encrypted storage
- Session tokens should be JWT-based in real applications
- API calls should be made to secure backend endpoints

## 📄 License

This project is created for interview purposes.

## 👨‍💻 Developer

Built with ❤️ using React, Vite, and Tailwind CSS
