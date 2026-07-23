import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: inputText.trim(), completed: false }
    ]);
    setInputText('');
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-3xl shadow-2xl p-8">
        
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Minhas Tarefas
          </h1>
          <p className="text-[#A1A1AA] text-sm mt-1">
            {tasks.length === 0 ? "Tudo limpo por aqui" : `${tasks.filter(t => t.completed).length} de ${tasks.length} concluídas`}
          </p>
        </div>

        {/* Formulário de Adicionar */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="O que você precisa fazer hoje?"
            className="flex-1 bg-[#09090b] border border-[#27272a] text-[#FAFAFA] px-4 py-3 rounded-xl focus:outline-none focus:border-[#E50914] text-sm placeholder:text-zinc-600 transition-colors"
          />
          <button
            type="submit"
            className="bg-[#E50914] hover:bg-[#b80710] text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-[#E50914]/20"
          >
            Adicionar
          </button>
        </form>

        {/* Lista de Tarefas */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-[#27272a] rounded-2xl">
              <p className="text-zinc-500 text-sm">Nenhuma tarefa por enquanto</p>
              <p className="text-zinc-600 text-xs mt-1">Adicione uma nova tarefa acima para começar.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.completed 
                    ? 'bg-[#09090b]/40 border-[#27272a]/50 opacity-60' 
                    : 'bg-[#09090b] border-[#27272a]'
                }`}
              >
                <div className="flex items-center gap-3 cursor-pointer flex-1 mr-2" onClick={() => toggleTask(task.id)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}} // Tratado no div pai
                    className="w-4 h-4 accent-[#E50914] rounded cursor-pointer"
                  />
                  <span className={`text-sm ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-zinc-500 hover:text-[#E50914] p-1.5 rounded-lg transition-colors"
                  title="Excluir tarefa"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}