// Filter action creators

// Action Types
export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

// Action Creators
export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});