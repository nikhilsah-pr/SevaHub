import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ user, setUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sevaUser');
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🙏</div>
          <span>SevaHub</span>
        </Link>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`navbar-link ${location.pathname === '/services' ? 'active' : ''}`}
          >
            Services
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span className="navbar-link" style={{ color: '#555', cursor: 'default' }}>
                Hi, {user.name}
              </span>
              <button className="navbar-btn navbar-btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navbar-btn navbar-btn-outline">Login</button>
              </Link>
              <Link to="/register">
                <button className="navbar-btn navbar-btn-primary">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
