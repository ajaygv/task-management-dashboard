// Task sagas for handling async operations
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';

function* fetchTasksSaga(action) {
  try {
    const response = yield call(mockApi.fetchTasks, action.payload);
    yield put({
      type: 'FETCH_TASKS_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: 'FETCH_TASKS_FAILURE',
      payload: error.message
    });
  }
}

function* createTaskSaga(action) {
  try {
    const response = yield call(mockApi.createTask, action.payload);
    yield put({
      type: 'CREATE_TASK_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: 'CREATE_TASK_FAILURE',
      payload: error.message
    });
  }
}

function* updateTaskSaga(action) {
  try {
    const { taskId, updates } = action.payload;
    const response = yield call(mockApi.updateTask, taskId, updates);
    yield put({
      type: 'UPDATE_TASK_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    yield put({
      type: 'UPDATE_TASK_FAILURE',
      payload: error.message
    });
  }
}

function* deleteTaskSaga(action) {
  try {
    yield call(mockApi.deleteTask, action.payload);
    yield put({
      type: 'DELETE_TASK_SUCCESS',
      payload: action.payload
    });
  } catch (error) {
    yield put({
      type: 'DELETE_TASK_FAILURE',
      payload: error.message
    });
  }
}

export function* watchTaskSagas() {
  yield takeLatest('FETCH_TASKS_REQUEST', fetchTasksSaga);
  yield takeEvery('CREATE_TASK_REQUEST', createTaskSaga);
  yield takeEvery('UPDATE_TASK_REQUEST', updateTaskSaga);
  yield takeEvery('DELETE_TASK_REQUEST', deleteTaskSaga);
}