// Main Dashboard Component
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import { fetchTasksRequest } from '../store/actions/taskActions';
import { getFilteredTasks } from '../store/selectors/taskSelectors';
import { clearTaskError } from '../store/actions/taskActions';

const TaskDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const dispatch = useDispatch();
  
  // Use selector to get filtered tasks
  const filteredTasks = useSelector(getFilteredTasks);
  const loading = useSelector(state => state.tasks.loading);
  const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleDismissError = () => {
    dispatch(clearTaskError());
  };

  return (
    <div className="task-dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <button 
          className="create-task-btn"
          onClick={handleCreateTask}
        >
          + Create Task
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <div className="error-content">
            <span>⚠️ {error}</span>
            <button 
              onClick={handleDismissError}
              className="dismiss-btn"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <FilterBar />

      <div className="tasks-section">
        <div className="tasks-header">
          <h2>Tasks ({filteredTasks.length})</h2>
        </div>

        {loading && <div className="loading">Loading tasks...</div>}
        
        <TaskList tasks={filteredTasks} onEditTask={handleEditTask} />

        <TaskForm 
          isOpen={isFormOpen} 
          onClose={handleCloseForm} 
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;