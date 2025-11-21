const tasks = [
    { id: 1, title: 'Mettre à jour le README', completed: false },
    { id: 2, title: 'Corriger le bug du formulaire', completed: true },
    { id: 3, title: 'Revoir les PRs en attente', completed: false },
    { id: 4, title: 'Nettoyer le CSS', completed: true }
  ];
  
  const tasksListEl = document.querySelector('#tasks-list');
  const emptyStateEl = document.querySelector('#empty-state');
  
  const FILTERS = {
    all: task => true,
    active: task => !task.completed,
    completed: task => task.completed
  };
  
  let currentFilter = 'all';
  
  function updateTasksList(filter = currentFilter) {
    currentFilter = filter;
    const list = tasks.filter(FILTERS[filter]);
    renderTasks(list, filter);
  }
  
  function renderTasks(list, filter) {
    tasksListEl.innerHTML = '';
  
    if (!list.length) {
      const messages = {
        all: 'Aucune tâche à afficher.',
        active: 'Aucune tâche en cours.',
        completed: 'Aucune tâche terminée.'
      };
      emptyStateEl.textContent = messages[filter];
      emptyStateEl.style.display = 'block';
      return;
    }
  
    emptyStateEl.style.display = 'none';
  
    list.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' task-completed' : '');
      li.innerHTML = `<span>${task.title}</span>`;
      tasksListEl.appendChild(li);
    });
  }
  
  document.querySelector('#filter-all-btn').onclick = () => updateTasksList('all');
  document.querySelector('#filter-active-btn').onclick = () => updateTasksList('active');
  document.querySelector('#filter-completed-btn').onclick = () => updateTasksList('completed');
  
  updateTasksList();
  
