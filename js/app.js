/**
 * TaskFlow — Gerenciador de Tarefas
 * CRUD completo com localStorage para persistência
 * @author Dev
 * @version 1.0.0
 */

class TaskManager {
  constructor() {
    this.STORAGE_KEY = 'taskflow_tasks';
    this.THEME_KEY = 'taskflow_theme';
    this.tasks = this.loadTasks();
    this.currentFilter = 'todas';
    this.searchQuery = '';
    this.editingTaskId = null;

    this.cacheDOM();
    this.bindEvents();
    this.init();
  }

  // ─── DOM Cache ──────────────────────────────────────────
  cacheDOM() {
    // Form
    this.taskForm = document.getElementById('taskForm');
    this.taskTitle = document.getElementById('taskTitle');
    this.taskCategory = document.getElementById('taskCategory');
    this.taskPriority = document.getElementById('taskPriority');
    this.taskDate = document.getElementById('taskDate');
    this.btnSubmit = document.getElementById('btnSubmit');

    // List
    this.taskList = document.getElementById('taskList');
    this.emptyState = document.getElementById('emptyState');

    // Filters
    this.searchInput = document.getElementById('searchInput');
    this.filterButtons = document.querySelectorAll('.filter-btn');

    // Stats
    this.totalTasks = document.getElementById('totalTasks');
    this.pendingTasks = document.getElementById('pendingTasks');
    this.completedTasks = document.getElementById('completedTasks');
    this.progressRing = document.getElementById('progressRing');
    this.progressText = document.getElementById('progressText');

    // Actions
    this.actionsSection = document.getElementById('actionsSection');
    this.btnClearCompleted = document.getElementById('btnClearCompleted');

    // Theme
    this.themeToggle = document.getElementById('themeToggle');

    // Modal
    this.editModal = document.getElementById('editModal');
    this.editForm = document.getElementById('editForm');
    this.editTaskId = document.getElementById('editTaskId');
    this.editTitle = document.getElementById('editTitle');
    this.editCategory = document.getElementById('editCategory');
    this.editPriority = document.getElementById('editPriority');
    this.editDate = document.getElementById('editDate');
    this.modalClose = document.getElementById('modalClose');
    this.btnCancel = document.getElementById('btnCancel');

    // Toast
    this.toastContainer = document.getElementById('toastContainer');
  }

  // ─── Event Binding ──────────────────────────────────────
  bindEvents() {
    // Add task
    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask();
    });

    // Search
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    // Filter buttons
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    // Clear completed
    this.btnClearCompleted.addEventListener('click', () => this.clearCompleted());

    // Theme toggle
    this.themeToggle.addEventListener('click', () => this.toggleTheme());

    // Modal events
    this.editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEdit();
    });
    this.modalClose.addEventListener('click', () => this.closeModal());
    this.btnCancel.addEventListener('click', () => this.closeModal());
    this.editModal.addEventListener('click', (e) => {
      if (e.target === this.editModal) this.closeModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        this.searchInput.focus();
      }
    });

    // Task list delegation
    this.taskList.addEventListener('click', (e) => this.handleTaskClick(e));
  }

  // ─── Initialization ─────────────────────────────────────
  init() {
    this.loadTheme();
    this.render();
    this.setMinDate();
  }

  setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    this.taskDate.setAttribute('min', today);
    this.editDate.setAttribute('min', today);
  }

  // ─── CRUD: Create ───────────────────────────────────────
  addTask() {
    const title = this.taskTitle.value.trim();
    if (!title) return;

    const task = {
      id: this.generateId(),
      title,
      category: this.taskCategory.value,
      priority: this.taskPriority.value,
      dueDate: this.taskDate.value || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.resetForm();
    this.render();
    this.showToast('Tarefa adicionada com sucesso!', 'success');
  }

  // ─── CRUD: Read (via render) ────────────────────────────
  getFilteredTasks() {
    let filtered = [...this.tasks];

    // Filter by status
    if (this.currentFilter === 'pendentes') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.currentFilter === 'concluidas') {
      filtered = filtered.filter(t => t.completed);
    }

    // Filter by search
    if (this.searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(this.searchQuery) ||
        t.category.toLowerCase().includes(this.searchQuery)
      );
    }

    return filtered;
  }

  // ─── CRUD: Update ───────────────────────────────────────
  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
      this.showToast(
        task.completed ? 'Tarefa concluída! 🎉' : 'Tarefa reaberta',
        task.completed ? 'success' : 'info'
      );
    }
  }

  openEditModal(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.editingTaskId = id;
    this.editTaskId.value = id;
    this.editTitle.value = task.title;
    this.editCategory.value = task.category;
    this.editPriority.value = task.priority;
    this.editDate.value = task.dueDate || '';

    this.editModal.classList.add('active');
    this.editTitle.focus();
  }

  saveEdit() {
    const task = this.tasks.find(t => t.id === this.editingTaskId);
    if (!task) return;

    task.title = this.editTitle.value.trim();
    task.category = this.editCategory.value;
    task.priority = this.editPriority.value;
    task.dueDate = this.editDate.value || null;

    this.saveTasks();
    this.closeModal();
    this.render();
    this.showToast('Tarefa atualizada!', 'info');
  }

  closeModal() {
    this.editModal.classList.remove('active');
    this.editingTaskId = null;
  }

  // ─── CRUD: Delete ───────────────────────────────────────
  deleteTask(id) {
    const taskEl = document.querySelector(`[data-task-id="${id}"]`);
    if (taskEl) {
      taskEl.classList.add('removing');
      setTimeout(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        this.showToast('Tarefa removida', 'error');
      }, 300);
    }
  }

  clearCompleted() {
    const completedCount = this.tasks.filter(t => t.completed).length;
    if (completedCount === 0) return;

    this.tasks = this.tasks.filter(t => !t.completed);
    this.saveTasks();
    this.render();
    this.showToast(`${completedCount} tarefa(s) removida(s)`, 'info');
  }

  // ─── Event Delegation Handler ───────────────────────────
  handleTaskClick(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const id = taskItem.dataset.taskId;

    // Checkbox toggle
    if (e.target.closest('.task-checkbox')) {
      this.toggleComplete(id);
      return;
    }

    // Edit button
    if (e.target.closest('.btn-edit')) {
      this.openEditModal(id);
      return;
    }

    // Delete button
    if (e.target.closest('.btn-delete')) {
      this.deleteTask(id);
      return;
    }
  }

  // ─── Render ─────────────────────────────────────────────
  render() {
    const filtered = this.getFilteredTasks();
    this.renderTaskList(filtered);
    this.updateStats();
    this.updateActionsVisibility();
  }

  renderTaskList(tasks) {
    if (tasks.length === 0) {
      this.taskList.innerHTML = '';
      this.emptyState.classList.add('visible');
      return;
    }

    this.emptyState.classList.remove('visible');

    this.taskList.innerHTML = tasks.map(task => `
      <li class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
        <div class="priority-indicator ${task.priority}"></div>
        <label class="task-checkbox">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="checkmark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        </label>
        <div class="task-content">
          <div class="task-title">${this.escapeHtml(task.title)}</div>
          <div class="task-meta">
            <span class="task-badge badge-category">${this.getCategoryEmoji(task.category)} ${this.capitalize(task.category)}</span>
            <span class="task-badge badge-priority ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
            ${task.dueDate ? `
              <span class="badge-date ${this.isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                ${this.formatDate(task.dueDate)}
              </span>
            ` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-action btn-edit" title="Editar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn-action btn-delete" title="Excluir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </li>
    `).join('');
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    this.animateNumber(this.totalTasks, total);
    this.animateNumber(this.pendingTasks, pending);
    this.animateNumber(this.completedTasks, completed);

    this.progressRing.setAttribute('stroke-dasharray', `${progress}, 100`);
    this.progressText.textContent = `${progress}%`;
  }

  animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    if (current === target) return;

    const duration = 300;
    const steps = 15;
    const increment = (target - current) / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.round(current + increment * step);
      }
    }, duration / steps);
  }

  updateActionsVisibility() {
    const hasCompleted = this.tasks.some(t => t.completed);
    this.actionsSection.classList.toggle('visible', hasCompleted);
  }

  // ─── LocalStorage ───────────────────────────────────────
  loadTasks() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      this.showToast('Erro ao salvar dados!', 'error');
    }
  }

  // ─── Theme ──────────────────────────────────────────────
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(this.THEME_KEY, newTheme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  // ─── Toast Notifications ────────────────────────────────
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };

    toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─── Helpers ────────────────────────────────────────────
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }

  resetForm() {
    this.taskForm.reset();
    this.taskPriority.value = 'media';
    this.taskTitle.focus();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getCategoryEmoji(category) {
    const emojis = {
      pessoal: '🏠', trabalho: '💼', estudos: '📚',
      saude: '🏃', financas: '💰', outros: '📌'
    };
    return emojis[category] || '📌';
  }

  getPriorityLabel(priority) {
    const labels = { baixa: '🟢 Baixa', media: '🟡 Média', alta: '🔴 Alta' };
    return labels[priority] || priority;
  }

  formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  isOverdue(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateStr + 'T00:00:00');
    return dueDate < today;
  }
}

// ─── Initialize App ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  new TaskManager();
});
