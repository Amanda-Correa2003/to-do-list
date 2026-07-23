import React, { useState } from 'react';

interface TaskInputProps {
  onAdd: (text: string) => void;
  isLoading?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que você precisa fazer hoje?"
        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all text-sm md:text-base shadow-sm"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer disabled:opacity-50 text-sm md:text-base flex items-center justify-center min-w-[100px]"
      >
        {isLoading ? 'Salvando...' : 'Adicionar'}
      </button>
    </form>
  );
};