import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              🙏 <span>SevaHub</span>
            </div>
            <p className="footer-brand-desc">
              India's most trusted hyper-local services platform. Connecting you
              with verified professionals in your neighbourhood.
            </p>
          </div>

          <div>
            <h4 className="footer-column-title">Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Electrician</Link></li>
              <li><Link to="/services">Plumber</Link></li>
              <li><Link to="/services">Tutor</Link></li>
              <li><Link to="/services">Salon</Link></li>
              <li><Link to="/services">AC Repair</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#partner">Partner With Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Support</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Safety</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SevaHub. Made with ❤️ in India</span>
          <div className="footer-social">
            <a href="#instagram" aria-label="Instagram"><FiInstagram /></a>
            <a href="#twitter" aria-label="Twitter"><FiTwitter /></a>
            <a href="#facebook" aria-label="Facebook"><FiFacebook /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
