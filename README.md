# ExitWx - Weather App for Skydivers

A full-stack weather application built for skydivers and dropzone operators to quickly access current conditions, forecasts, wind data, and location-specific weather information.

ExitWx combines multiple external APIs with a custom database of skydiving locations and exits, providing a single interface for finding and evaluating weather conditions.

Built as a portfolio project to demonstrate full-stack development, API integration, authentication, data persistence, and responsive application design.

🔗 **[Live Demo](https://exitwx-fe.onrender.com/)** 

⚠️ Note: The backend may take a few seconds to respond on first load due to free hosting (cold start).

📱 Mobile-first design with full desktop support.

## 📸 Screenshots

### Search (Empty State)
![Empty Search](screenshots/empty.png)


### Autocomplete
![Autocomplete](screenshots/autocomplete.png)


### Weather Result
![Weather Result](screenshots/result.png)



## 🎯 Project Overview

ExitWx was built to make it easier for skydivers to find weather information for specific dropzones and exits. The application combines data from multiple external APIs with a custom location database and presents the information through a mobile-first interface.

## ✨ Key Features

### Authentication & User Management
- User registration and login with bcrypt password hashing
- User-specific API operations for submitting locations
- Persistent authentication state across page refreshes
- User-specific tracking for submitted locations

### Weather & Location Features
- Real-time weather conditions and 5-day forecasts
- Custom database of skydiving exits and dropzones
- Debounced location autocomplete
- Wind direction and weather metrics
- Moon phase and illumination data
- Tidal information for coastal locations

### User Experience
- Favorites with persistent storage
- User-submitted locations
- Mobile-first responsive design
- Responsive navigation
- Contact form with EmailJS integration

## 🛠️ Tech Stack

### Frontend
- React 18 — Component-based UI and Hooks
- React Router v6 — Client-side routing 
- Context API — Authentication and application state
- Tailwind CSS — Responsive styling
- Vite — Build tooling and development server
- Lucide React — UI icons
- EmailJS — Contact form integration

### Backend
- Node.js & Express — REST API and server-side application logic
- MongoDB & Mongoose — Database and data modeling
- bcrypt — Password hashing
- Zod — Request and data validation
- Axios — External API communication
- SunCalc — Moon phase calculations
- Morgan — HTTP request logging
- xml2js — XML parsing

### External APIs
- OpenWeatherMap — Weather and forecast data
- Geoapify — Geocoding and location autocomplete
- Stormglass — Tidal and marine weather data

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- API Keys:
  - [OpenWeatherMap API Key](https://openweathermap.org/api)
  - [Geoapify API Key](https://www.geoapify.com/)
  - [Stormglass API Key](https://stormglass.io/)
  - [EmailJS API Key](https://www.emailjs.com/)

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

1. How It Works
  - Registration
  - Users register with an email, username, and password.
  - Passwords are hashed with bcrypt before being stored.
  - Input is validated before account creation.
  - Database constraints prevent duplicate usernames and email addresses.
2. Login
  - Users authenticate with their username and password.
  - Submitted passwords are verified against the stored bcrypt hash.
  - Authentication state is persisted across page refreshes.
3. User-Specific API Operations
  - Authenticated users can submit new locations.
  - Submitted locations are associated with the user ID provided by the application.
  - User IDs are stored with submitted locations for user-specific data tracking.

## Security & Reliability
- Password hashing: bcrypt
- Input validation: Zod validation for API requests
- User tracking: submitted locations are associated with a user ID
- Database constraints: Unique username and email fields
- Logging: Morgan request logging

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

ExitWx is a completed portfolio project and is currently deployed.

The application demonstrates:

- Full-stack React/Node.js development
- REST API design and integration
- MongoDB data persistence
- User authentication and user-specific data tracking
- Third-party API integration
- Input validation
- Responsive, mobile-first UI development
- Deployment and environment configuration

## 💡 Technical Highlights

- Integrated and normalized data from multiple external APIs behind a single backend API.
- Implemented debounced location autocomplete to reduce unnecessary API requests.
- Associated user-submitted locations with the submitting user's ID
- Designed MongoDB models for users, locations, and user-specific favorites.
- Added request validation to improve application reliability.
- Deployed the frontend and backend as separate Render services with environment-based configuration.


## 👤 Author

**Dan** - [GitHub Profile](https://github.com/poloblue1357) | [LinkedIn](https://www.linkedin.com/in/patterson-dan/)

---


