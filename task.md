# Tasks — AI Mental Health Monitoring App (React Full-Stack)

## Setup
- [x] Clear out old vanilla JS code
- [x] Initialize full-stack monorepo structure (backend + React client)
- [x] Configure backend package.json and `.env` with OpenAI API key

## Backend (Node.js/Express + SQLite)
- [x] Set up Express server with CORS and JSON parsing
- [x] Set up `sql.js` (SQLite) database with schemas for Users, Chat, Assessments, Moods, and Journals
- [x] Implement JWT Authentication middleware
- [x] Implement Auth routes (Register, Login, Me)
- [x] Implement Chat routes (with OpenAI integration and DB history)
- [x] Implement Assessment routes (with OpenAI interpretation)
- [x] Implement Mood routes (with dashboard stats)
- [x] Implement Journal routes (with OpenAI sentiment analysis)

## Frontend (React + Vite)
- [x] Scaffold React app with Vite
- [x] Implement React Router and AuthContext for protected routes
- [x] Create comprehensive glassmorphism CSS design system (`index.css`)
- [x] Build Landing Page
- [x] Build Auth Pages (Login & Register)
- [x] Build App Layout (Sidebar + navigation)
- [x] Build Dashboard Page (Stats, Chart.js trend, Mood Logger)
- [x] Build Chat Page (AI conversation interface)
- [x] Build Assessment Page (PHQ-9 & GAD-7)
- [x] Build Journal Page (Mood journaling with AI insights)
- [x] Build History Page (Unified timeline of all activities)
- [x] Build Resources Page (Crisis contacts and coping strategies)

## Verification & Finalization
- [x] Install dependencies for root and client
- [x] Verify backend server starts on port 3000
- [x] Verify frontend dev server starts on port 5173
- [x] Verify API endpoints are accessible
