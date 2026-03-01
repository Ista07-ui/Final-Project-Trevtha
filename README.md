# 🌍 TREVTHA - Travel Journal Web Application

**A modern travel booking and activity discovery platform built with Next.js, React, and Tailwind CSS.**

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=flat-square&logo=tailwind-css)

---

## 📋 Project Overview

**TREVTHA** is a comprehensive travel and tourism platform that allows users to:

- 🔍 **Discover** exciting travel destinations and activities
- 🛒 **Book** travel packages and tours
- 💳 **Manage** payment methods and transactions
- 🎫 **Track** bookings and travel history
- 👤 **Manage** personal profile and preferences
- 🎁 **Apply** promotional codes and special deals
- 📱 **Access** mobile-friendly responsive design

Admin features include:

- 📊 Dashboard analytics
- 🏷️ Category management
- 🎯 Activity/Package management
- 💰 Payment method configuration
- 📢 Banner and promotional management
- 👥 User management
- 💵 Transaction monitoring

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**: http://localhost:3000

---

## 📝 Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

---

## 🛠️ Technology Stack

- **Next.js 16.1.6** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios 1.13.6** - HTTP client
- **ESLint 9** - Code quality

---

## 🔌 API & Features

**Base API URL**: `https://travel-journal-api-bootcamp.do.dibimbing.id`

### Implemented Endpoints

✅ Authentication (Login/Register)
✅ User Management
✅ Categories
✅ Activities/Tours
✅ Banners
✅ Promotions
✅ Payment Methods
✅ Cart Management
✅ Transactions

### User Features

✅ Browse destinations & activities
✅ Search & filter by category
✅ Add to cart & checkout
✅ Track bookings
✅ Manage profile
✅ Apply promo codes

### Admin Features

✅ Dashboard
✅ Activity management
✅ Category management
✅ Promotional management
✅ Payment configuration
✅ User management
✅ Transaction monitoring

---

## 📁 Project Structure

```
src/
├── app/              # Pages (Home, Auth, Admin, User)
├── components/       # Reusable components
├── hooks/            # Custom React hooks
├── lib/
│   ├── api.ts        # Axios configuration
│   └── services/     # API services (auth, activity, etc)
└── globals.css       # Global styles
```

---

## 🏗️ Architecture

- **Clean Code**: Clear naming & structure
- **Separation of Concerns**: Components, services, hooks
- **TypeScript**: Type-safe codebase
- **Responsive Design**: Mobile & desktop optimized
- **API Integration**: Comprehensive service layer

---

## 🌐 Deployment

Deploy to Vercel (recommended):

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Auto-deploy on push

---

## 📄 License

Educational project for Dibimbing Bootcamp

**Created**: January 2026 | **Updated**: March 2026
