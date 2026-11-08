import { GripVertical, Trash, Timer } from "lucide-react";
import type { Todo } from "./App";

type Props = {
  todo: Todo;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onDragStart: () => void;
  onDrop: () => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect, onDragStart, onDrop }: Props) => {
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <li
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={`p-3 md:p-4 hover:bg-base-200 transition-colors cursor-grab active:cursor-grabbing ${
        isSelected ? "bg-base-200/50" : ""
      }`}
    >
      <div className="flex justify-between items-center gap-2 md:gap-4">
        
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          <GripVertical className="w-5 h-5 text-base-content/30 shrink-0" />
          
          <input 
            type="checkbox"
            checked={isSelected} 
            className="checkbox checkbox-primary checkbox-sm shrink-0"
            onChange={() => onToggleSelect(todo.id)} 
          />
          
          <div className="flex flex-col min-w-0">
            <span className={`text-sm md:text-base font-medium break-words ${isSelected ? "line-through opacity-50" : ""}`}>
              {todo.text}
            </span>
            
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`badge badge-sm badge-soft shrink-0
                ${todo.priority === "Urgente" ? "badge-error"
                : todo.priority === "Moyenne" ? "badge-warning" 
                : "badge-success"}`}>
                {todo.priority}
              </span>
              
              <span className="badge badge-sm badge-outline shrink-0 opacity-70">
                {todo.category}
              </span>

              {todo.timeLeft !== undefined && (
                <span className={`badge badge-sm font-mono gap-1 shrink-0 ${
                  todo.timeLeft === 0 ? "badge-error animate-pulse" : "badge-primary"
                }`}>
                  <Timer className="w-3 h-3" />
                  {todo.timeLeft === 0 ? "Terminé!" : formatTime(todo.timeLeft)}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="btn btn-sm btn-error btn-soft shrink-0"
          aria-label="Supprimer la tâche"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;