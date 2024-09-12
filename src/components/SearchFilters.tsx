// src/components/SearchFilters.tsx
import React, { useState } from 'react';
import './SearchFilters.css'; 

interface SearchFiltersProps {
  onChange: (filters: { name: string; username: string; email: string; phone: string }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onChange }) => {
  const [filters, setFilters] = useState({ name: '', username: '', email: '', phone: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className="search-filters-container"> {/* Kontener dla całego bloku */}
      <p className="search-label">Search here</p> {/* Etykieta nad polami wyszukiwania */}
      <div className="search-filters">
        <input name="name" placeholder="Name" value={filters.name} onChange={handleChange} />
        <input name="username" placeholder="Username" value={filters.username} onChange={handleChange} />
        <input name="email" placeholder="Email" value={filters.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={filters.phone} onChange={handleChange} />
      </div>
    </div>
  );
};

export default SearchFilters;
