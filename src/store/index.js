// Redux store configuration
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchTaskSagas } from './sagas/taskSagas';
import taskReducer from './reducers/taskReducer';
import filterReducer from './reducers/filterReducer';

// Root reducer
const rootReducer = combineReducers({
  tasks: taskReducer,
  filters: filterReducer
});

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Run sagas
sagaMiddleware.run(watchTaskSagas);

export default store;