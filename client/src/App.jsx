import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import AssessmentPage from './pages/AssessmentPage';
import JournalPage from './pages/JournalPage';
import HistoryPage from './pages/HistoryPage';
import ResourcesPage from './pages/ResourcesPage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  return user ? children : <Navigate to="/login" />;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  return user ? <Navigate to="/app" /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestRoute><Landing /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="assessment" element={<AssessmentPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="resources" element={<ResourcesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
