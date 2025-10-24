// Task selectors

// Selector to get filtered tasks
export const getFilteredTasks = (state) => {
  const { items } = state.tasks;
  const { search, project, assignee, status, taskType, priority } = state.filters;

  if (!items) return [];

  return items.filter(task => {
    // Search filter
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    // Project filter
    if (project !== 'all' && task.projectId !== project) {
      return false;
    }

    // Assignee filter
    if (assignee !== 'all' && task.assigneeId !== assignee) {
      return false;
    }

    // Status filter
    if (status !== 'all' && task.status !== status) {
      return false;
    }

    // Task type filter
    if (taskType !== 'all' && task.taskType !== taskType) {
      return false;
    }

    // Priority filter
    if (priority !== 'all' && task.priority !== priority) {
      return false;
    }

    return true;
  });
};

// Selector to get filter state
export const getFilters = (state) => state.filters;