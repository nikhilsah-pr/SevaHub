import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="empty-state" style={{ minHeight: '80vh' }}>
        <div className="empty-state-icon">🤔</div>
        <h3 className="empty-state-title">No booking details found</h3>
        <p className="empty-state-message">It seems you reached this page directly.</p>
        <Link
          to="/services"
          className="service-card-btn"
          style={{ marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-card animate-fade-in">
        <div className="success-icon">
          <FiCheckCircle size={48} />
        </div>

        <h1 className="success-title">Booking Confirmed! 🎉</h1>
        <p className="success-message">
          Your service has been booked successfully. The provider will confirm your appointment shortly.
        </p>

        <div className="success-details">
          <div className="success-detail-row">
            <span className="success-detail-label">Service</span>
            <span className="success-detail-value">{booking.serviceName}</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Provider</span>
            <span className="success-detail-value">{booking.provider}</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Date</span>
            <span className="success-detail-value">
              {new Date(booking.date).toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Time</span>
            <span className="success-detail-value">{booking.slot}</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Amount</span>
            <span className="success-detail-value" style={{ fontWeight: 700 }}>₹{booking.price}</span>
          </div>
          <div className="success-detail-row">
            <span className="success-detail-label">Booking ID</span>
            <span className="success-detail-value">#{booking.id}</span>
          </div>
        </div>

        <div className="success-actions">
          <button
            className="success-btn success-btn-primary"
            onClick={() => navigate(`/services/${booking.serviceId}`)}
          >
            View Service
          </button>
          <button
            className="success-btn success-btn-outline"
            onClick={() => navigate('/services')}
          >
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
}
