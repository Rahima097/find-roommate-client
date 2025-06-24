# 🏠 FindRoommate

**Live Site:** [https://find-roommate.netlify.app/](https://find-roommate.netlify.app/)

FindRoommate is a modern web application designed to help users list and discover available room rentals. With secure authentication, real-time listings, and a user-friendly interface, finding a roommate has never been easier!

---

## 🚀 Features

### 🔐 User Authentication
- Firebase Email/Password login  
- Google Sign-In  

### 📄 Post & Manage Listings
- Add, browse, and update room listings  
- Listings stored in a MongoDB database  

### ❤️ Interest & Like System
- Users can "like" listings to show interest  
- Interest count visible on each listing  
- Users cannot like their own listings  

### 📱 Contact Reveal on Like
- Contact info hidden by default  
- Revealed only after a listing is liked  

### 🔁 Protected Routes
- Only authenticated users can create or modify listings  

---

## 🧩 Tech Stack

### 🖥️ Frontend

Built with **React 19** and styled using **Tailwind CSS**, enhanced with animations and modern UX tools.

**Major NPM Packages:**

 - "react": "^19.1.0",
 - "react-dom": "^19.1.0",
 - "react-router-dom": "^7.6.0",
 - "@tailwindcss/vite": "^4.1.7",
 - "firebase": "^11.8.0",
 - "lottie-react": "^2.4.1",
 - "react-awesome-reveal": "^4.3.1",
 - "react-firebase-hooks": "^5.1.1",
 - "react-icons": "^5.5.0",
 - "react-simple-typewriter": "^5.0.1",
 - "react-toastify": "^11.0.5",
 - "react-tooltip": "^5.28.1",
 - "sweetalert2": "^11.21.2",
 - "swiper": "^11.2.7",
 - "theme-change": "^2.5.0"


### 🛠️ Backend

Built with **Node.js** and **Express**, with **MongoDB** as the database.

**NPM Packages:**

 - "cors": "^2.8.5",
 - "dotenv": "^16.5.0",
 - "express": "^5.1.0",
 - "mongodb": "^6.16.0"

