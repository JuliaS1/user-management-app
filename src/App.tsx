// src/App.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, filterUsers } from './redux/userSlice';
import { RootState, AppDispatch } from './redux/store';
import UserTable from './components/UserTable';
import SearchFilters from './components/SearchFilters';
import './App.css'; 
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filteredUsers, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (filters: { name: string; username: string; email: string; phone: string }) => {
    dispatch(filterUsers(filters));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Management Table</h1>
      </header>
      <SearchFilters onChange={handleFilterChange} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
};

export default App;
