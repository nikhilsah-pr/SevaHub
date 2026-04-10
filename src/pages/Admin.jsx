import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { adminProviders } from '../data/services';

export default function Admin({ user }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setProviders(adminProviders);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const handleAction = (id, action) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: action } : p
      )
    );
    toast(
      `Provider ${action === 'approved' ? 'approved' : 'rejected'} successfully`,
      action === 'approved' ? 'success' : 'info'
    );
  };

  const stats = {
    total: providers.length,
    pending: providers.filter((p) => p.status === 'pending').length,
    approved: providers.filter((p) => p.status === 'approved').length,
    rejected: providers.filter((p) => p.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '80vh' }}>
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Manage service provider verification requests
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value" style={{ color: '#333' }}>{stats.total}</div>
            <div className="admin-stat-label">Total Providers</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value" style={{ color: '#F39C12' }}>{stats.pending}</div>
            <div className="admin-stat-label">Pending</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value" style={{ color: '#27AE60' }}>{stats.approved}</div>
            <div className="admin-stat-label">Approved</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value" style={{ color: '#E74C3C' }}>{stats.rejected}</div>
            <div className="admin-stat-label">Rejected</div>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container animate-fade-in">
          <div className="admin-table-header">
            <h3 className="admin-table-title">Service Provider Applications</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Service</th>
                <th>Area</th>
                <th>Phone</th>
                <th>Applied</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td style={{ fontWeight: 600 }}>{provider.name}</td>
                  <td>{provider.service}</td>
                  <td>{provider.area}</td>
                  <td>{provider.phone}</td>
                  <td>{new Date(provider.applied).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td>
                    <span className={`admin-status ${provider.status}`}>
                      {provider.status}
                    </span>
                  </td>
                  <td>
                    {provider.status === 'pending' ? (
                      <>
                        <button
                          className="admin-action-btn admin-approve-btn"
                          onClick={() => handleAction(provider.id, 'approved')}
                        >
                          ✓ Approve
                        </button>
                        <button
                          className="admin-action-btn admin-reject-btn"
                          onClick={() => handleAction(provider.id, 'rejected')}
                        >
                          ✕ Reject
                        </button>
                      </>
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.8rem' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
