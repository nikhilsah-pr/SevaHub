import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isAdmin = form.email.toLowerCase().includes('admin');
      const user = {
        name: isAdmin ? 'Admin' : form.email.split('@')[0],
        email: form.email,
        role: isAdmin ? 'admin' : 'user',
      };
      setUser(user);
      localStorage.setItem('sevaUser', JSON.stringify(user));
      toast(`Welcome back, ${user.name}!`, 'success');
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              🙏 <span>SevaHub</span>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue booking services</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-form-label">Email</label>
              <input
                type="email"
                className="auth-form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-form-label">Password</label>
              <input
                type="password"
                className="auth-form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#999', marginBottom: '12px' }}>
            💡 Use any email with "admin" to log in as Admin
          </p>

          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
