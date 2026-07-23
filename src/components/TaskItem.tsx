import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string | number | undefined) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const taskId = task.documentId || task.id;

  return (
    <li
      className={`group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200 shadow-sm ${
        task.done
          ? 'bg-slate-50/80 border-slate-200 text-slate-400'
          : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-md text-slate-700'
      }`}
    >
      <div 
        onClick={() => onToggle(task)}
        className="flex items-center gap-3 flex-1 cursor-pointer select-none overflow-hidden"
      >
        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
          task.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white group-hover:border-indigo-400'
        }`}>
          {task.done && (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`text-sm md:text-base truncate transition-all ${task.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(taskId)}
        className="ml-3 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        title="Excluir tarefa"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2.02 2.02 0 0116.138 21H7.862a2.02 2.02 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
};