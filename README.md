# Build Habits - A Three-Level Habit Tracking System (MERN Stack)

[<img width="1907" height="981" alt="image" src="https://github.com/user-attachments/assets/1fb21e3f-915e-47ad-b913-0fc88bd5ec73" />](https://1drv.ms/i/c/84a3cc3e5b8a43a3/EdJdBKg_UO1Kv_c79fPrjp8B2k_UZK0WCylXAGQTd2FIlQ?e=nLJfyT)
 <!-- Replace with actual screenshot URL -->

## Overview

HabitBuilder is a full-stack MERN application designed to help users establish and maintain new habits through a gamified three-level system. Each level offers a different approach to habit formation, with increasing complexity and flexibility as users progress.

## Features

### Core Functionality

✅ **Three Progressive Habit-Building Levels**  
1. **Level 1 - 21-Day Challenge**  
   - Strict 21-day commitment period  
   - 3 "lives" system (allows 3 missed days)  
   - Visual calendar with streak tracking  

2. **Level 2 - Point-Based System**  
   - Progress bar with +5/-3 scoring  
   - Adaptive difficulty adjustments  
   - Detailed performance analytics  

3. **Level 3 - Advanced Habit Tracker**  
   - Customizable habit tracking  
   - Long-term progress visualization  
   - Data export capabilities  

✅ **User Authentication**  
- Secure Google OAuth integration  

✅ **Technical Features**  
- Full CRUD operations for habits  
- Real-time progress updates  
- Responsive design with Tailwind CSS  

## Tech Stack

### Frontend
- **React.js** with functional components
- **Tailwind CSS** for responsive styling
- **React Router** (v6) for navigation
- **Chart.js** for data visualization

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Google OAuth 2.0** (Passport.js strategy)

### DevOps
- **GitHub Actions** for CI/CD
- **Postman** for API testing

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB instance
- Google OAuth API credentials

### Setup Instructions

1. Clone the repository:
  

2. Set up environment variables:
   ```bash
   # Backend .env (in server directory)
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   PORT=5000

3. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd habit-tracker-app
   npm install
   ```

4. Run the application:
   ```bash
   # From project root directory
   npm run dev 
   ```
