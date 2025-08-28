# Linkq-URL-Shortener-
This repository contains a fully functional MERN stack URL shortener application that allows users to shorten long URLs into concise, shareable links. The project features a modern React frontend with smooth GSAP animations, combined with an Express backend and MongoDB database for persistent URL storage and redirection.
Site URL -

### Running Locally (Backend Serves Frontend)

1. Build the frontend React app (inside frontend folder):

cd frontend
npm install
2. Create a .env file in the root directory and add the following:
MONGO_URI → Connection string for your MongoDB database
URL → Base URL for your backend API(http://localhost:3001/)
PORT → Port on which the server will run(3001)

3. Run the backend server in the backend folder:
npm run build in the root folder
npm start
