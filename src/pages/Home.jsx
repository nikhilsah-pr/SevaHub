import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import { categories, services } from '../data/services';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/services');
    }
  };

  const featuredServices = services.filter((s) => s.verified).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Trusted by 50,000+ users across India</div>
          <h1 className="hero-title">
            Find <span className="highlight">Trusted Local</span><br />
            Services Near You
          </h1>
          <p className="hero-subtitle">
            Discover verified electricians, plumbers, tutors, salons and more in your neighbourhood.
            Book instantly. Pay securely.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <div className="hero-search-icon">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search for electrician, plumber, tutor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">Service Providers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">50K+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">35+</div>
              <div className="hero-stat-label">Cities</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">4.8★</div>
              <div className="hero-stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Browse by Category
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            Find the right professional for every need
          </p>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link
                to={`/services?category=${cat.name}`}
                key={cat.id}
                className={`category-card animate-fade-in animate-delay-${(i % 4) + 1}`}
              >
                <div className="category-icon">
                  {cat.icon}
                </div>
                <span className="category-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 className="section-title">Featured Services</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                Top-rated professionals handpicked for you
              </p>
            </div>
            <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem' }}>
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="services-grid">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Book a service in 3 simple steps</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '16px' }}>
            {[
              { step: '01', icon: '🔍', title: 'Search', desc: 'Find the service you need from 100+ categories in your area' },
              { step: '02', icon: '📋', title: 'Compare & Book', desc: 'Compare ratings, reviews, prices & book your preferred professional' },
              { step: '03', icon: '⭐', title: 'Rate & Review', desc: 'After service completion, share your experience to help others' },
            ].map((item) => (
              <div
                key={item.step}
                className="animate-fade-in"
                style={{
                  padding: '32px 24px',
                  borderRadius: '12px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-light)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{item.icon}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.5px' }}>STEP {item.step}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
