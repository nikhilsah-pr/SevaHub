import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast('Please fill in all fields', 'error');
      return;
    }
    if (form.password.length < 6) {
      toast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = { name: form.name, email: form.email, role: 'user' };
      setUser(user);
      localStorage.setItem('sevaUser', JSON.stringify(user));
      toast(`Welcome to SevaHub, ${user.name}!`, 'success');
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join 50,000+ users discovering local services</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label className="auth-form-label">Full Name</label>
              <input
                type="text"
                className="auth-form-input"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

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
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
