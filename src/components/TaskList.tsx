import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string | number | undefined) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
          📝
        </div>
        <p className="text-slate-500 font-medium text-sm md:text-base">Nenhuma tarefa por enquanto</p>
        <p className="text-slate-400 text-xs mt-1">Adicione uma nova tarefa acima para começar.</p>
      </div>
    );
  }

  return (
    <ul className="max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.documentId || task.id || index}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};