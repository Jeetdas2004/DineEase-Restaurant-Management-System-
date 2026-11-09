# 🍽️ DineEase - Premium Restaurant Management & Dining Platform

A full-stack, fine-dining restaurant web application built with **React 19**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. 

---

## ✨ Key Highlights & Features

### 🌟 Customer Experience
- **Gourmet Menu Showcase:** Filter dishes across categories (Burgers, Artisan Pizzas, Pasta, Steaks, Bowls, Desserts), search in real-time, and sort by price or name.
- **Interactive Food Details:** View ingredients, nutritional highlights, chef recommendations, and add custom quantities.
- **Smart Shopping Cart:** Live quantity adjusters (+ / -), subtotal calculations, and item removals.
- **Seamless Checkout:** Multi-option payment (Cash on Delivery / Online Pay) with delivery address input.
- **VIP Table Reservation:** Instant booking system with date picker, party size selector, and preferred dining time slots.
- **Customer Dashboard:** Real-time tracking of active food orders and table reservations.

### 🛡️ Restaurant Manager & Admin Control Center
- **Executive KPI Dashboard:** Real-time metrics for total revenue, active orders, pending table bookings, and total dishes.
- **Live Order Management:** Transition orders across `Pending` ➔ `Preparing` ➔ `Delivered`.
- **Reservation Management:** 1-click status updates (`Approved`, `Pending`, `Cancelled`) for guest seating.
- **Menu & Category Studio:** Publish new dishes with images, prices, categories, and descriptions.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ installed

### 2. Run the Backend Server
```bash
cd backend
npm install
npm run server
```
> **Note:** The backend automatically starts an in-memory database with pre-seeded mouth-watering dishes, categories, demo users, orders, and reservations if an external MongoDB URI is not configured!

### 3. Run the Frontend Client
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin / Manager** | `admin@dineease.com` | `admin123` |
| **Customer Patron** | `customer@dineease.com` | `password123` |

*(One-click auto-fill buttons are also provided directly on the login screens for effortless testing!)*

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, Axios, React Hot Toast, React Router DOM
- **Backend:** Node.js, Express, Mongoose, JWT, Cookie-Parser, Multer, Cloudinary (with local fallback)
- **Database:** MongoDB Atlas / In-Memory MongoDB Engine (Zero-setup local development)

