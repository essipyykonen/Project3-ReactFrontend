# Project 3: React Front-End

## Live Deployment
Live: https://project3-reactfrontend.onrender.com
Project 2 Live (if needed): https://project2-snippetapi.onrender.com/

## Video link and timestamps
Link on Sharepoint: https://laureauas-my.sharepoint.com/:v:/g/personal/esp00002_laurea_fi/IQDIlO1_Or0JT4iyztU6DMN-AU2_pUNQL9W_ZLux5C7ZyeU?e=MAiebm&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

Timestamps:
00:00 Introduction
00:14 Project's Purpose
00:49 Architecture Overview
02:05 Key Features
02:35 Tech Stack
03:00 Start of Demo: Logging In
03:34 Demo: In the Dashboard
03:50 Demo: Adding, Deleting and Searching for an Item
05:12 Conclusion
06:12 Thank You

## Run Locally

### Setup Instructions
git clone https://github.com/essipyykonen/Project3-ReactFrontend // Clones the project.
npm install // Installs all project dependencies defined in package.json.
Create a .env file and add: VITE_API_URL=https://project2-snippetapi.onrender.com/ // Sets the API base URL for the front-end.
npm run dev // Starts the React app in development mode.
Open http://localhost:3000/ // The URL where the application can be accessed in the browser.

## Features
- User registration and login (JWT-based authentication)
- Load user-specific items/snippets from the Snippet API
- Create new items
- Search items by title and filter by language
- Delete existing items

## Windows and macOS Notes
Open VS Code terminal. The commands are the same on both platforms.

## Reflection
(Around ~250 words in total)
For this project, I now created a React front-end that continues Project 2 and connects to the created Snippet API.
I followed the teacher's step-by-step tutorial once again to set up the base structure, and then expanded the application a little by adding the extra required features, such as filtering, searching and authenticated CRUD operations.
The goal was to build a small but yet functional full-stack system where users can log in, view their data, add new entries and manage the created snippets visually, without having to use a command prompt.

Throughout the development process, I learned how React manages state and side effects through hooks like useState and useEffecct.
I also gained some practical experience with routing in React, especially how to ptotect certain pages so that only logged-in users can access them.
Working with Axios helped me also understand how front-end applications communicate with APIs and how to handle different tokens, headers and error responses.
Creating a custom hook (useApi) taught me how to seperate logic from components and keep the code look cleaner and more reusable.

Deploying both the front-end and back-end on Render required working with environment variables and understanding how different services interact once they're live.
Debugging login issues, CORS problems and incorrect environment paths gave me a more realistic idea of challenges of deploying real applications in the future.

But overall, this project helped me understand full-stack development better, particularly how a React cclien communicates with Node API and how dynamic, data-driven interfaces are built.
