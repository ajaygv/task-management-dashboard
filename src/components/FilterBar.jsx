// Filter Bar Component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '../store/actions/filterActions';
import { TASK_TYPES, PRIORITIES, STATUSES } from '../api/mockApi';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Apply filters when they change
  useEffect(() => {
    dispatch(setFilters({ 
      ...filters, 
      search: debouncedSearch 
    }));
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({
      ...filters,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    dispatch(clearFilters());
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== ''
  ).length;

  return (
    <div className="filter-bar">
      <div className="search-section">
        <input 
          type="text" 
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-controls">
        {/* Project Filter */}
        <div className="filter-group">
          <select 
            value={filters.project || 'all'}
            onChange={(e) => handleFilterChange('project', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Projects</option>
            <option value="1">Project 1</option>
            <option value="2">Project 2</option>
            <option value="3">Project 3</option>
          </select>
        </div>

        {/* Assignee Filter */}
        <div className="filter-group">
          <select 
            value={filters.assignee || 'all'}
            onChange={(e) => handleFilterChange('assignee', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Assignees</option>
            <option value="1">User 1</option>
            <option value="2">User 2</option>
            <option value="3">User 3</option>
            <option value="4">User 4</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <select 
            value={filters.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Task Type Filter */}
        <div className="filter-group">
          <select 
            value={filters.taskType || 'all'}
            onChange={(e) => handleFilterChange('taskType', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            {TASK_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <select 
            value={filters.priority || 'all'}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Priorities</option>
            {PRIORITIES.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <button 
          onClick={handleClearFilters}
          disabled={activeFilterCount === 0}
          className="clear-filters-btn"
        >
          Clear Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;