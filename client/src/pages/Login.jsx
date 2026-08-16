import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState('');

  const handleSuccess = async (res) => {
    setError('');
    try {
      await loginWithGoogle(res);
    } catch (err) {
      setError(err.message || 'Google login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <span className="logo-icon">🧠</span>
          <span className="logo-text">MindCare<span className="logo-ai">AI</span></span>
        </Link>

        <div className="glass-card auth-card" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '.5rem' }}>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue your wellness journey</p>

          {error && <div className="alert alert-error">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError('Google login failed. Please try again.')}
              theme="filled_black"
              shape="pill"
              text="signin_with"
              size="large"
            />
          </div>

          <p className="auth-footer">Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
