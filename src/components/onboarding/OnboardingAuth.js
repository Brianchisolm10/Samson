import React, { useState } from 'react';
import { loginUser, createUser } from '../../utils/userStorage';

function OnboardingAuth({ onComplete }) {
  const [mode, setMode] = useState('login'); // login or signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user;
      if (mode === 'login') {
        user = loginUser(email, password);
      } else {
        user = createUser({ email, password, name });
        loginUser(email, password);
      }

      if (user) {
        onComplete(user);
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-step">
      <div className="step-header">
        <h2>Welcome to AFYA</h2>
        <p>Create an account or log in to get started</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && <div className="error-banner">{error}</div>}

        {mode === 'signup' && (
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="step-actions">
          <button type="submit" className="btn-next" disabled={loading}>
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => setMode('signup')}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B6F47',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setMode('login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#8B6F47',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OnboardingAuth;
