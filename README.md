# MindCare AI

MindCare AI is a full-stack mental wellness platform designed to help users track mood, journal reflections, complete mental health assessments, and chat with an AI coach for support and guidance.

The application combines a React frontend with an Express + MongoDB backend, and uses AI-powered analysis for journaling, mood insights, assessment interpretation, and conversational support.

## Features

- Secure user authentication with Google OAuth and JWT
- Personalized dashboard with mood trends and summaries
- AI-powered chat experience for emotional support and wellness guidance
- PHQ-9 and GAD-7 style mental health assessments
- Daily journal tracking with AI-based sentiment and wellness insights
- History timeline for moods, assessments, and journal entries
- Resources page with coping strategies and crisis support information
- Responsive UI for desktop and mobile experiences

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Chart.js + react-chartjs-2
- @react-oauth/google

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- OpenAI API integration

## Project Structure

```bash
.
├── client/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
├── .env
├── task.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas or a local MongoDB instance
- OpenAI API key
- Google OAuth client ID

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mindcare-ai.git
cd mindcare-ai
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
cd ..
```

You can also use the root project script:

```bash
npm run install-all
```

### 3. Configure environment variables

Copy the example environment file and fill in your own values:

```bash
copy .env.example .env
```

Then update the generated `.env` file with your keys:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mindcare-ai
JWT_SECRET=change_this_to_a_long_random_secret
GOOGLE_CLIENT_ID=your_google_client_id_here
OPENAI_API_KEY=your_openai_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

If you are on macOS or Linux, use:

```bash
cp .env.example .env
```

### 4. Run the app

#### Start backend + frontend together

```bash
npm run dev
```

#### Or run separately

```bash
# Backend
npm start

# Frontend
cd client
npm run dev
```

The app will typically run at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Available Scripts

```bash
npm start          # run the Express server
npm run dev        # run frontend and backend together
npm run build      # build the React app for production
npm run install-all # install root and client dependencies
```

## App Flow

1. Users register or sign in using Google OAuth.
2. They can view their dashboard and mood trends.
3. They complete assessments such as PHQ-9 and GAD-7.
4. They log a journal entry and receive AI-based insights.
5. They chat with the AI mental wellness assistant for support and guidance.
6. Their history is stored and displayed in one unified view.

## API Overview

The backend exposes endpoints for:

- Authentication: `/api/auth`
- AI chat: `/api/chat`
- Assessments: `/api/assessment`
- Mood tracking: `/api/mood`
- Journal entries: `/api/journal`

## Security Notes

This project is intended for demonstration and learning purposes and should be hardened before production use. In a production environment, consider:

- secure JWT storage
- stronger rate limiting
- input validation
- HTTPS deployment
- role-based access controls
- user consent and privacy safeguards for mental health data

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. If you would like to improve the app, please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Contact

For questions or collaboration opportunities, feel free to reach out through the project repository or your preferred contact channel.

---

Built with care for AI-powered mental health support and personal wellbeing tracking.
