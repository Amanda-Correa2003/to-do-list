import { Task } from '../types';

const API_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api';
const USE_STRAPI = import.meta.env.VITE_USE_STRAPI === 'true';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    if (!USE_STRAPI) {
      const local = localStorage.getItem('tasks_ts');
      return local ? JSON.parse(local) : [];
    }

    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      return data.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        text: item.text,
        done: item.done,
      }));
    } catch (error) {
      console.warn('Strapi offline. Usando localStorage...', error);
      const local = localStorage.getItem('tasks_ts');
      return local ? JSON.parse(local) : [];
    }
  },

  async createTask(text: string): Promise<Task> {
    const newTask = { text, done: false };
    if (!USE_STRAPI) {
      const tasks = await this.getTasks();
      const created = { ...newTask, id: Date.now() };
      const updated = [created, ...tasks];
      localStorage.setItem('tasks_ts', JSON.stringify(updated));
      return created;
    }

    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: newTask }),
    });
    const data = await res.json();
    return {
      id: data.data.id,
      documentId: data.data.documentId,
      text: data.data.text,
      done: data.data.done,
    };
  },

  async updateTask(task: Task): Promise<Task> {
    const idKey = task.documentId || task.id;
    if (!USE_STRAPI) {
      const tasks = await this.getTasks();
      const updated = tasks.map((t) => ((t.id === task.id || t.documentId === task.documentId) ? task : t));
      localStorage.setItem('tasks_ts', JSON.stringify(updated));
      return task;
    }

    const res = await fetch(`${API_URL}/tasks/${idKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { text: task.text, done: task.done } }),
    });
    const data = await res.json();
    return {
      id: data.data.id,
      documentId: data.data.documentId,
      text: data.data.text,
      done: data.data.done,
    };
  },

  async deleteTask(id: string | number | undefined): Promise<void> {
    if (!id) return;
    if (!USE_STRAPI) {
      const tasks = await this.getTasks();
      const updated = tasks.filter((t) => t.id !== id && t.documentId !== id);
      localStorage.setItem('tasks_ts', JSON.stringify(updated));
      return;
    }

    await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};