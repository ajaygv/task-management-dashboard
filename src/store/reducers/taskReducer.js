// Task reducer

const initialTaskState = {
  items: [],
  loading: false,
  error: null
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
    case 'CREATE_TASK_REQUEST':
    case 'UPDATE_TASK_REQUEST':
    case 'DELETE_TASK_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null
      };
    
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
        error: null
      };
    
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        error: null
      };
    
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item.id !== action.payload),
        error: null
      };
    
    case 'FETCH_TASKS_FAILURE':
    case 'CREATE_TASK_FAILURE':
    case 'UPDATE_TASK_FAILURE':
    case 'DELETE_TASK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'CLEAR_TASK_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

export default taskReducer;