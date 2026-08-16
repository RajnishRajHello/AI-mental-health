import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/app',            icon: '📊', label: 'Dashboard', end: true },
  { to: '/app/chat',       icon: '💬', label: 'AI Chat' },
  { to: '/app/assessment',  icon: '📋', label: 'Assessment' },
  { to: '/app/journal',     icon: '✍️', label: 'Journal' },
  { to: '/app/history',     icon: '📁', label: 'History' },
  { to: '/app/resources',   icon: '🆘', label: 'Resources' },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="app-layout">
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">MindCare<span className="logo-ai">AI</span></span>
          </div>
        </div>

        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase() || '?'}</div>
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button className="btn btn-outline btn-sm btn-block" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      <main className="main-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
        <Outlet />
      </main>
    </div>
  );
}
