import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import { services } from '../data/services';

export default function Services() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    rating: '',
    price: '',
    distance: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setFilters((prev) => ({ ...prev, category: cat }));
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          service.name.toLowerCase().includes(q) ||
          service.category.toLowerCase().includes(q) ||
          service.provider.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Category
      if (filters.category && service.category !== filters.category) return false;
      // Rating
      if (filters.rating && service.rating < parseFloat(filters.rating)) return false;
      // Price
      if (filters.price && service.price > parseInt(filters.price)) return false;
      // Distance
      if (filters.distance && service.distance > parseFloat(filters.distance)) return false;

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <>
      <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px', minHeight: '80vh' }}>
        <h1 className="section-title">Explore Services</h1>
        <p className="section-subtitle">
          {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
          {filters.category ? ` in ${filters.category}` : ''}
          {searchQuery ? ` for "${searchQuery}"` : ''}
        </p>

        <SearchBar
          onSearch={(q) => setSearchQuery(q)}
          placeholder="Search services, categories, providers..."
        />

        <Filters filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Finding services near you...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No services found</h3>
            <p className="empty-state-message">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              className="service-card-btn"
              style={{ marginTop: '20px' }}
              onClick={() => {
                setSearchQuery('');
                setFilters({ category: '', rating: '', price: '', distance: '' });
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
