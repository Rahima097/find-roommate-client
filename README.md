# Website name:
FindRoommate
# Live site URL:
  (https://find-roommate.netlify.app/)
# Features:
- 🔐 **User Authentication** using Firebase (Email/Password + Google Login)
- 📄 **Add, Browse, and Update Listings** for room rentals + storage data in mongodb Database
- ❤️ **Like Feature with Interest Count**, preventing users from liking their own posts
- 📱 **Contact Reveal** on Like — contact number hidden until a listing is liked
- 🔁 **Protected Routes** to ensure only logged-in users can post or update listings

# Frontend NPM Packages Used
- "react": "^19.1.0",
- "react-router": "^7.6.0",
-"@tailwindcss/vite": "^4.1.7",
"firebase": "^11.8.0",
"lottie-react": "^2.4.1",
"react-awesome-reveal": "^4.3.1",
"react-dom": "^19.1.0",
"react-firebase-hooks": "^5.1.1",
"react-icons": "^5.5.0",
"react-router-dom": "^7.6.0",
"react-simple-typewriter": "^5.0.1",
"react-toastify": "^11.0.5",
"react-tooltip": "^5.28.1",
"sweetalert2": "^11.21.2",
"swiper": "^11.2.7",
"theme-change": "^2.5.0"

# Backend NPM Packages Used
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"mongodb": "^6.16.0"

🏠 FindRoommate
Live Site: https://find-roommate.netlify.app/

FindRoommate is a modern web application designed to help users list and discover available room rentals. With secure authentication, real-time listings, and a user-friendly interface, finding a roommate has never been easier!

🚀 Features
🔐 User Authentication

Firebase Email/Password login

Google Sign-In

📄 Post & Manage Listings

Add, browse, and update room listings

Listings stored in a MongoDB database

❤️ Interest & Like System

Users can "like" listings to show interest

Interest count visible on each listing

Users cannot like their own listings

📱 Contact Reveal on Like

Contact info hidden by default

Revealed only after a listing is liked

🔁 Protected Routes

Only authenticated users can create or modify listings

🧩 Tech Stack
Frontend
Built with React 19 and styled using Tailwind CSS, enhanced with animations and modern UX tools.

Major NPM Packages:

json
Copy
Edit
"react": "^19.1.0",
"react-dom": "^19.1.0",
"react-router-dom": "^7.6.0",
"@tailwindcss/vite": "^4.1.7",
"firebase": "^11.8.0",
"lottie-react": "^2.4.1",
"react-awesome-reveal": "^4.3.1",
"react-firebase-hooks": "^5.1.1",
"react-icons": "^5.5.0",
"react-simple-typewriter": "^5.0.1",
"react-toastify": "^11.0.5",
"react-tooltip": "^5.28.1",
"sweetalert2": "^11.21.2",
"swiper": "^11.2.7",
"theme-change": "^2.5.0"
Backend
Built with Node.js and Express, with MongoDB as the database.

NPM Packages:

json
Copy
Edit
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"mongodb": "^6.16.0"
📸 Screenshots
(Optional: You can include images or gifs of the site here for visual appeal)

🛠️ Getting Started
Prerequisites
Node.js and npm installed

Firebase project setup

MongoDB Atlas database or local MongoDB

Installation
Clone the repository
git clone https://github.com/your-username/findroommate.git

Navigate to frontend and install dependencies

bash
Copy
Edit
cd client
npm install
Navigate to backend and install dependencies

bash
Copy
Edit
cd server
npm install
Create a .env file in the server folder with your credentials

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start both servers (or use concurrently for dev)
