🎵 Melodia — Music Streaming Web App A full-stack role-based music streaming web application where users can listen to songs and artists can manage their music catalog. 🔗 Live Demo: melodia-music-web-v9jq.vercel.app

📌 Features 🔐 Authentication

JWT-based login & registration Password hashing with bcrypt HttpOnly cookies for secure token storage Popup-based error handling (invalid credentials, user already exists, etc.)

👥 Role-Based Access FeatureUserArtistHome Page (Listen to music)✅✅Dashboard (Upload/Manage music)❌✅Create / Delete Music❌✅ 🎵 Music Features

Stream music from Home page Artists can upload songs with cover images Artists can edit and delete their own songs Albums support

🛡️ Security

Role-based protected routes (frontend + backend) JWT authentication middleware Backend input validation Frontend form validation with error messages

🧰 Tech Stack Frontend

React.js — UI Context API — Global state management Axios — API calls React Router DOM — Routing & protected routes

Backend

Node.js + Express.js — REST API MongoDB + Mongoose — Database JWT (jsonwebtoken) — Authentication bcrypt — Password hashing Multer — File uploads ImageKit — Media storage

Deployment

Vercel — Frontend & Backend

📁 Project Structure Melodia/ ├── Frontend/ │ ├── src/ │ │ ├── pages/ # Login, Register │ │ ├── Dashboard/ # Artist dashboard │ │ ├── layout/ # Home page layout │ │ ├── Component/ # ProtectedRoute, Loader │ │ └── ContextApi/ # UserContext │ └── .env │ └── Backend/ ├── src/ │ ├── controllers/ # auth, music, album │ ├── models/ # User, Music, Album │ ├── routes/ # auth, music, album routes │ ├── middleware/ # authArtist, authUser │ ├── db/ # MongoDB connection │ └── app.js ├── server.js └── vercel.json

🚀 Getting Started Prerequisites

Node.js MongoDB Atlas account ImageKit account

Installation bash# Clone the repo git clone https://github.com/AbroRizwan1/Melodia-Music-Web.git

Backend setup
cd Backend npm install cp .env.example .env

Fill in your environment variables
Frontend setup
cd ../Frontend npm install cp .env.example .env

Fill in your environment variables
Environment Variables Backend .env MONGO_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret IMAGEKIT_PRIVATEKEY=your_imagekit_private_key Frontend .env VITE_API_URL=your_backend_url VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key Run Locally bash# Backend cd Backend npm run dev

Frontend
cd Frontend npm run dev

📸 Screenshots

Home Page — Users can stream music Dashboard — Artists can upload and manage songs

👨‍💻 Author Rizwan GitHub