// src/features/dashboard/AttackPlanColumn.jsx
import React, { useState } from 'react';
import { BookOpen as BookOpenIcon, Edit3, CheckSquare, CalendarDays, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';

const initialTasks = [
  { id: 1, icon: BookOpenIcon, description: "Análise Combinatória: Permutação Simples", estimate: "~25 min", completed: false, subject: "Matemática" },
  { id: 2, icon: Edit3, description: "Resolver 10 exercícios de Termodinâmica", estimate: "~45 min", completed: false, subject: "Física" },
  { id: 3, icon: BookOpenIcon, description: "Revisar Regência Verbal", estimate: "~15 min", completed: true, subject: "Português" },
  { id: 4, icon: Edit3, description: "Praticar 5 questões de Geopolítica Atual", estimate: "~30 min", completed: false, subject: "Atualidades" },
  { id: 5, icon: BookOpenIcon, description: "Capítulo 3: Revolução Industrial", estimate: "~20 min", completed: false, subject: "História" },
];

const TaskItem = ({ task, onToggleComplete, onTaskClick }) => {
  const Icon = task.icon;
  return (
    <div 
      className={`flex items-center p-3.5 rounded-lg transition-all duration-300 ease-in-out mb-3 cursor-pointer group
                  ${task.completed ? 'bg-slate-700/60 opacity-60 hover:bg-slate-700/80' : 'bg-slate-700 hover:bg-slate-600/70 shadow-md hover:shadow-lg'}`}
      onClick={() => onTaskClick(task)} 
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleComplete(task.id); }} 
        className={`mr-3 flex-shrink-0 p-1 rounded-full border-2 transition-all duration-200 ease-in-out 
                    ${task.completed ? 'bg-green-500 border-green-400 hover:bg-green-600' : 'border-slate-500 group-hover:border-sky-400'}`}
        aria-label={task.completed ? "Desmarcar tarefa" : "Marcar tarefa como concluída"}
      >
        {task.completed ? <CheckSquare className="w-5 h-5 text-white" /> : <div className="w-5 h-5 rounded-sm border-2 border-slate-400 group-hover:border-sky-300"></div>}
      </button>
      <div className="flex-grow min-w-0"> 
        <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-sky-300'}`}>
          {task.description}
        </p>
        <span className={`text-xs ${task.completed ? 'text-slate-600' : 'text-sky-400'}`}>{task.subject}</span>
      </div>
      <span className={`ml-3 text-xs font-mono p-1 px-2 rounded whitespace-nowrap ${task.completed ? 'text-slate-600 bg-slate-800/50' : 'text-slate-400 bg-slate-600/50 group-hover:bg-sky-500/20 group-hover:text-sky-300'}`}>
        {task.estimate}
      </span>
    </div>
  );
};

const AttackPlanColumn = ({ userName }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showCompleted, setShowCompleted] = useState(true);

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const handleTaskClick = (task) => {
    if (!task.completed) {
      console.log("Abrir Modo Foco para:", task.description);
      // navigate('focusMode', { taskId: task.id }); // Exemplo de navegação futura
    }
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;
  const dailyProgress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="bg-slate-800 p-5 md:p-6 rounded-xl shadow-xl border border-slate-700 h-full flex flex-col">
      <div className="flex items-center mb-2">
        <CalendarDays className="w-7 h-7 text-sky-400 mr-3" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Plano de Ataque para Hoje, {userName}!</h2>
      </div>
      <p className="text-sm text-slate-400 mb-5">Sua lista de missões para conquistar a aprovação.</p>

      <div className="mb-5">
        <div className="flex justify-between items-center text-xs sm:text-sm text-slate-300 mb-1">
          <span>Progresso Diário</span>
          <span>{completedTasksCount}/{totalTasksCount} tarefas</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 border border-slate-600">
          <div 
            className="bg-gradient-to-r from-sky-500 to-green-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${dailyProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-grow space-y-1 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1 pb-2 custom-scrollbar">
        {pendingTasks.length > 0 ? pendingTasks.map(task => (
          <TaskItem key={task.id} task={task} onToggleComplete={toggleComplete} onTaskClick={handleTaskClick} />
        )) : (
          <div className="text-center py-6">
            <CheckSquare className="mx-auto w-12 h-12 text-green-500 mb-2" />
            <p className="text-slate-400">Nenhuma tarefa pendente. Bom trabalho!</p>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-700">
            <button 
                onClick={() => setShowCompleted(!showCompleted)} 
                className="flex justify-between items-center w-full text-left py-2 px-1 rounded-md hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-sky-300">
              <h3 className="text-sm font-semibold ">Tarefas Concluídas ({completedTasks.length})</h3>
              {showCompleted ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
            </button>
            {showCompleted && (
              <div className="mt-2 space-y-1 animate-fadeIn">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} onToggleComplete={toggleComplete} onTaskClick={handleTaskClick}/>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
       <button className="mt-auto pt-4 w-full flex items-center justify-center text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium">
          <PlusCircle size={18} className="mr-2"/> Adicionar Tarefa Personalizada 
      </button>
    </div>
  );
};

export default AttackPlanColumn;

// Adicionar keyframes para fadeIn no seu index.css se quiser usar animate-fadeIn
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
*/
