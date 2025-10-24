// Task Form Component
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskRequest, updateTaskRequest, clearTaskError } from '../store/actions/taskActions';
import { TASK_TYPES, PRIORITIES, BUG_SEVERITIES } from '../api/mockApi';

const TaskForm = ({ isOpen, onClose, editingTask }) => {
  const { register, handleSubmit, formState: { errors }, watch, control, reset } = useForm({
    defaultValues: {
      title: '',
      taskType: 'Bug',
      priority: 'Medium',
      project: '',
      assignee: 'Unassigned',
      description: '',
      dueDate: '',
      severity: 'Medium',
      stepsToReproduce: '',
      subtasks: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks"
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.tasks);
  
  const taskType = watch('taskType');

  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        // Prefill the form with editingTask data
        reset({
          title: editingTask.title || '',
          taskType: editingTask.taskType || 'Bug',
          priority: editingTask.priority || 'Medium',
          project: editingTask.projectId || '',
          assignee: editingTask.assigneeId || 'Unassigned',
          description: editingTask.description || '',
          dueDate: editingTask.dueDate || '',
          severity: editingTask.severity || 'Medium',
          stepsToReproduce: editingTask.stepsToReproduce || '',
          subtasks: editingTask.subtasks || []
        });
      } else {
        reset(); // Reset to default values for new task
      }
    }
  }, [isOpen, editingTask, reset]);

  const onSubmit = (data) => {
    if (editingTask) {
      // Update existing task
      dispatch(updateTaskRequest(editingTask.id, data));
    } else {
      // Create new task
      const taskData = {
        ...data,
        status: 'Todo',
        createdAt: new Date().toISOString()
      };
      dispatch(createTaskRequest(taskData));
    }
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleDismissError = () => {
    dispatch(clearTaskError());
  };

  if (!isOpen) return null;

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={handleCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              placeholder="Enter task title..."
            />
            {errors.title && <span className="error">{errors.title.message}</span>}
          </div>

          {/* Task Type */}
          <div className="form-group">
            <label htmlFor="taskType">Task Type *</label>
            <select 
              id="taskType"
              {...register('taskType', { required: 'Task type is required' })}
            >
              {TASK_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select 
              id="priority"
              {...register('priority', { required: 'Priority is required' })}
            >
              {PRIORITIES.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <select id="project" {...register('project')}>
              <option value="">Select a project...</option>
              <option value="1">Project 1</option>
              <option value="2">Project 2</option>
              <option value="3">Project 3</option>
            </select>
          </div>

          {/* Assignee */}
          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <select id="assignee" {...register('assignee')}>
              <option value="Unassigned">Unassigned</option>
              <option value="1">User 1</option>
              <option value="2">User 2</option>
              <option value="3">User 3</option>
              <option value="4">User 4</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Enter task description..."
              rows="3"
            />
          </div>

          {/* Due Date */}
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              {...register('dueDate')}
            />
          </div>

          {/* Conditional Fields for Bug type */}
          {taskType === 'Bug' && (
            <>
              <div className="form-group">
                <label htmlFor="severity">Severity *</label>
                <select 
                  id="severity"
                  {...register('severity', { 
                    required: taskType === 'Bug' ? 'Severity is required for bugs' : false 
                  })}
                >
                  {BUG_SEVERITIES.map(severity => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </select>
                {errors.severity && <span className="error">{errors.severity.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="stepsToReproduce">Steps to Reproduce</label>
                <textarea
                  id="stepsToReproduce"
                  {...register('stepsToReproduce')}
                  placeholder="1. Step one&#10;2. Step two&#10;3. Expected vs actual result"
                  rows="4"
                />
              </div>
            </>
          )}

          {/* Subtasks */}
          <div className="form-group">
            <label>Subtasks</label>
            {fields.map((field, index) => (
              <div key={field.id} className="subtask-item">
                <input
                  {...register(`subtasks.${index}.title`)}
                  placeholder={`Subtask ${index + 1}`}
                />
                <button type="button" onClick={() => remove(index)}>Remove</button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => append({ title: '', completed: false })}
              className="add-subtask-btn"
            >
              Add Subtask
            </button>
          </div>

          {error && (
            <div className="form-error-message">
              ❌ {error}
              <button 
                type="button" 
                onClick={handleDismissError}
                className="dismiss-error"
              >
                ×
              </button>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;