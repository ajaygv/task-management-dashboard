// Filter reducer

const initialState = {
  search: '',
  project: 'all',
  assignee: 'all',
  status: 'all',
  taskType: 'all',
  priority: 'all'
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        ...action.payload
      };
    
    case 'CLEAR_FILTERS':
      return initialState;
    
    default:
      return state;
  }
};

export default filterReducer;