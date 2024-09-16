# Combosss 🔥 APP

> Combosss is a web app 📱 designed for fans of versus fighting games 🎮 (2D brawlers) to share their best combos for their favorite characters and games across any gaming platform. Currently, the focus is on Street Fighter 6. As a fighting game enthusiast, finding or creating combos as a beginner can be challenging. Many e-sports professionals share their combo discoveries through YouTube videos. Combosss aims to centralize and simplify this information, making combo mastery more accessible. The platform relies heavily on an active and supportive community that continues to evolve. With e-sports gaining more prominence in the gaming ecosystem in 2024, Combosss offers players a space to create, share, and vote on the most impressive combos. Become the boss of combos!

## Table of Contents
* [General Information](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## General Information
Combosss is a web app that serves as a hub for versus fighting game enthusiasts to share and discover new combos 🕹️ for their favorite characters and games, with a current focus on Street Fighter 6. The platform aims to simplify the learning curve of mastering combos by centralizing information and fostering a supportive community. As e-sports continues to grow in 2024, Combosss offers an essential tool for players looking to elevate their game.

## Technologies Used
- @hookform/resolvers - v3.6.0
- @radix-ui/react-avatar - v1.0.4
- @radix-ui/react-checkbox - v1.0.4
- @radix-ui/react-dialog - v1.0.5
- @radix-ui/react-icons - v1.3.0
- @radix-ui/react-label - v2.0.2
- @radix-ui/react-scroll-area - v1.0.5
- @radix-ui/react-select - v2.0.0
- @radix-ui/react-separator - v1.0.3
- @radix-ui/react-slot - v1.0.2
- @radix-ui/react-toggle - v1.0.3
- @radix-ui/react-toggle-group - v1.0.4
- class-variance-authority - v0.7.0
- clsx - v2.1.1
- cookies-next - v4.2.1
- embla-carousel-react - v8.1.4
- geist - v1.3.0
- lucide-react - v0.394.0
- next - v14.2.3
- react - v18
- react-dom - v18
- react-hook-form - v7.51.5
- tailwind-merge - v2.3.0
- tailwindcss-animate - v1.0.7
- zod - v3.23.8
- react-toastify - v10.0.5
- @hono/node-server - v1.9.1
- argon2 - v0.40.1
- dotenv - v16.4.5
- drizzle-orm - v0.30.7
- hono - v4.2.2
- pg - v8.11.5
- tsx - v4.7.2
- TypeScript - v5.4.4

## Features
- **User Authentication**: Secure sign-up and login functionality.
- **Combo Creation**: Create and share combos for specific characters.
- **Voting System**: Users can vote on the most impressive combos.
- **User Dashboard**: Manage and favorite combos.

## Screenshots
![Comboss 🔥 Homepage](https://github.com/maissoumaboudrare/comboss-frontend/blob/main/public/assets/others/screenshot-comboss.png)

## Setup
To run Combosss locally, you'll need to have Node.js and PostgreSQL installed on your machine. Clone the repository and install the dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

Rename the .env.example file to .env and update the database connection string with your PostgreSQL credentials.

Run the migrations to set up the database schema:

```bash
npm run migrate
# or
yarn migrate
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Project Status 🧗‍♀️
The project is currently a work in progress (WIP). The focus is on developing new features and improving the overall user experience.

## Room for Improvement 🚀
- Combo creation for specific characters via a form (React Hook Form + ZOD).
- Combo sharing functionality.
- Adding combos to favorites, accessible in the user dashboard.
- Ranking of top combos rated by the community via a filter (sorting by date added).
- Combo popularity ranking based on likes.
- Combo management via a user dashboard: delete combos.

## Acknowledgements
I would like to thank my mentor, Pierre Daily, for his guidance and support throughout this CRUD project.

## Contact
Created by @maissoum - feel free to contact me at me@maissoum.dev 💌