# ExitWx - Weather App for Skydivers

A full-stack weather app for skydivers and dropzone operators. 
Check real-time conditions, forecasts, and save favorite locations for quick access.

*Built as a portfolio project to demonstrate full-stack development skills*

🔗 **[Live Demo](https://exitwx-fe.onrender.com/)** 

⚠️ Note: The backend may take a few seconds to respond on first load due to free hosting (cold start).

📱 Mobile-first design — optimized for smaller screens, but fully functional on desktop.

**Key Problem Solved**: Skydivers need quick access to detailed weather data for specific dropzones. This app combines location-based weather with a curated database of skydiving exits.

## 📸 Screenshots

### Search (Empty State)
![Empty Search](screenshots/empty.png)


### Autocomplete
![Autocomplete](screenshots/autocomplete.png)


### Weather Result
![Weather Result](screenshots/result.png)



## 🎯 Project Overview

Provides wind, cloud, and forecast data for specific dropzones using a custom exit database and real-time weather APIs.

## ✨ Key Features

### Authentication & User Management
- **User Registration & Login**: Secure authentication with bcrypt password hashing (10 salt rounds)
- **Protected Routes**: Submit locations only available to logged-in users
- **Account Dropdown**: User profile info and logout functionality in header
- **User Tracking**: Each exit submission tracks the user who added it
- **Persistent Sessions**: User stays logged in after page refresh (localStorage)

### Weather & Location Features
- **Real-time Weather Data**: Current conditions and 5-day forecasts
- **Dropzone Database**: Curated database of skydiving exits and dropzones
- **Smart Autocomplete**: Fast, debounced autocomplete for location search
- **Moon Phase Info**: Displays current moon phase and illumination percentage
- **Tide Information**: Tidal extremes and marine weather data via Stormglass for coastal dropzones
- **Wind Analysis**: Visual compass showing wind direction with detailed metrics

### User Experience
- **Favorites System**: Save up to 10 favorite locations with persistent storage
- **Persistent State**: Retains search results and user session across navigation
- **Submit Custom Locations**: Authenticated users can add new dropzones to database
- **Contact Form**: Email-based support via EmailJS integration
- **Mobile-First Design**: Optimized for mobile with full desktop functionality
- **Responsive Navigation**: Bottom tab bar on mobile, integrated header navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Hooks, Context API for global state
- **React Router v6** - Client-side routing with protected routes
- **Context API** - Global state management (Auth & App context)
- **Tailwind CSS** - Utility-first styling with responsive design
- **Vite** - Fast build tool and dev server
- **Lucide React** - Icon library
- **EmailJS** - Client-side email service integration

### Backend
- **Node.js & Express** - RESTful API server with middleware
- **MongoDB & Mongoose** - Document database and ODM
- **bcrypt** - Password hashing with salting (10 rounds)
- **Zod** - Schema validation and TypeScript-like type checking
- **Axios** - HTTP client for external API calls
- **SunCalc** - Moon phase and celestial calculations
- **CORS** - Cross-origin resource sharing
- **Express Rate Limiting** - API request throttling
- **Morgan** - HTTP request logging
- **xml2js** - XML parsing for tide data

### External APIs
- **OpenWeatherMap API** - Real-time weather and forecast data
- **Geoapify API** - Geocoding, reverse geocoding, and location autocomplete
- **Stormglass API** - Tidal extremes and marine weather for coastal locations

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- API Keys:
  - [OpenWeatherMap API Key](https://openweathermap.org/api)
  - [Geoapify API Key](https://www.geoapify.com/)
  - [Stormglass API Key](https://stormglass.io/)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your credentials
echo "MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key
STORMGLASS_API_KEY=your_stormglass_api_key
PORT=8000" > .env

# Start the server (with auto-reload via nodemon)
npm run dev

# Or run in production mode
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔐 Authentication System

### How It Works

1. **Registration**: New users create an account with email, username, and password
   - Passwords are hashed with bcrypt (10 salt rounds) before storage
   - Validation ensures strong password requirements
   - Duplicate email/username prevention via database unique constraints

2. **Login**: Users authenticate with username and password
   - Password compared against bcrypt hash
   - JWT-like token created (could be enhanced to actual JWT)
   - User data stored in localStorage for session persistence

3. **Protected Routes**: 
   - Exit submission only available to authenticated users
   - Submit button hidden for non-logged-in users
   - Test account ('test' username) is blocked from submissions

4. **User Tracking**:
   - Each exit submission records the `userId` of submitter
   - Enables future features: edit own submissions, user profile page, moderation

### Security Features

- **Bcrypt Hashing**: Industry-standard password hashing with salt rounds
- **Input Validation**: Zod schema validation on both frontend and backend
- **Protected Components**: React Context prevents route access without auth
- **Session Persistence**: localStorage maintains auth state across page refreshes

## 📁 Project Structure

```
exitwx/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── helpers/         # Utility functions
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page-level components
│   │   ├── context/     # Context API providers
│   │   ├── hooks/       # Custom React hooks
│   │   └── api/         # API service layer
│   └── public/
└── scraper/             # Data scraping utilities
```

## ✅ Project Status

**ExitWx is complete and ready for production!**

This is a fully-featured full-stack application with:
- Complete user authentication system
- Real-time weather integration
- Dropzone database with user submissions
- Favorites and persistent state management
- Contact form integration
- Mobile-first responsive design

All core features have been implemented and tested. The application is ready for deployment and use.

## 👤 Author

**Dan** - [GitHub Profile](https://github.com/poloblue1357) | [LinkedIn](https://www.linkedin.com/in/patterson-dan/)

---


