# E-commerce Frontend

A modern React-based frontend for the e-commerce application built with TypeScript.

## Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **User Authentication**: Login, registration, and profile management
- **Product Browsing**: Browse products with search and filtering
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Management**: View order history and track orders
- **Admin Panel**: Admin-only features for managing products and orders
- **Real-time Updates**: Live cart updates and order status

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── PrivateRoute.tsx # Protected route wrapper
│   └── AdminRoute.tsx  # Admin-only route wrapper
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Products.tsx    # Product listing
│   ├── ProductDetail.tsx # Product details
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Cart.tsx        # Shopping cart
│   ├── Checkout.tsx    # Checkout process
│   ├── Profile.tsx     # User profile
│   ├── Orders.tsx      # Order history
│   ├── OrderDetail.tsx # Order details
│   └── AdminDashboard.tsx # Admin panel
├── services/           # API services
│   └── api.ts         # HTTP client and API calls
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared types
├── utils/             # Utility functions
├── assets/            # Static assets
├── App.tsx            # Main app component
├── App.css            # Global styles
└── index.tsx          # App entry point
```

## Features Overview

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Role-based access control

### Product Management
- Product listing with pagination
- Search and filtering
- Product details with reviews
- Featured products

### Shopping Cart
- Add/remove items
- Quantity management
- Persistent cart storage
- Real-time updates

### Order Management
- Checkout process
- Order history
- Order tracking
- Payment integration

### Admin Features
- Product CRUD operations
- Order management
- User management
- Analytics dashboard

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Development

The frontend is built with Create React App and includes:

- Hot reloading for development
- TypeScript support
- ESLint configuration
- CSS modules support
- Responsive design utilities

## Deployment

To build for production:

```bash
npm run build
```

The build output will be in the `build/` directory, ready for deployment to any static hosting service. 