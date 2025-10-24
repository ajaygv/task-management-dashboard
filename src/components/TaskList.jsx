// Task List Component
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskRequest } from '../store/actions/taskActions';

const TaskList = ({ tasks, onEditTask }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.tasks.loading);

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTaskRequest(taskId));
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        {loading ? 'Loading tasks...' : 'No tasks found matching your filters'}
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.taskType.toLowerCase()}`}>
            <div className="task-type-badge">{task.taskType}</div>
            
            <div className="task-status">{task.status}</div>
            
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            
            {task.taskType === 'Bug' && task.severity && (
              <div className="task-meta">
                <span className="meta-label">Severity:</span>
                <span className={`severity-${task.severity.toLowerCase()}`}>{task.severity}</span>
              </div>
            )}

            {task.taskType === 'Feature' && task.acceptanceCriteria && (
              <div className="task-meta">
                <span className="meta-label">Acceptance Criteria:</span>
                <span>{task.acceptanceCriteria.length}</span>
              </div>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <div className="task-meta">
                <span className="meta-label">Subtasks:</span>
                <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
              </div>
            )}

            <div className="task-footer">
              <div className="task-assignee">
                <span className="meta-label">Assigned to:</span>
                {task.assigneeId ? `User ${task.assigneeId}` : 'Unassigned'}
              </div>
              
              {task.dueDate && (
                <div className="task-due-date">
                  <span className="meta-label">Due:</span>
                  <strong>{new Date(task.dueDate).toLocaleDateString()}</strong>
                </div>
              )}
              
              <div className="task-priority">
                <span className="meta-label">Priority:</span>
                <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
            </div>

            <div className="task-actions">
              <button 
                className="btn-edit"
                onClick={() => onEditTask(task)}
                title="Edit task"
              >
                ✏️
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleDelete(task.id)}
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;