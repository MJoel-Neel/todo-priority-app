import { Trash } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse"
type Todo = {
    id: number;
    text: string;
    priority: Priority
}

type Props = {
    todo: Todo
    onDelete: () => void
    isSelected: boolean
    onToggleSelect: (id: number) => void
}

const TodoItem = ({ todo, onDelete, isSelected, onToggleSelect }: Props) => {
    return (
        <li className="p-3 md:p-4">
            <div className="flex justify-between items-center gap-2 md:gap-4">
                {/* min-w-0 is required for text truncation/wrapping in flexbox */}
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <input 
                        type="checkbox"
                        checked={isSelected} 
                        className="checkbox checkbox-primary checkbox-sm shrink-0"
                        onChange={() => onToggleSelect(todo.id)} 
                    />
                    {/* break-words prevents long words from overflowing */}
                    <span className="text-sm md:text-md font-bold break-words">
                        {todo.text}
                    </span>
                    <span className={`badge badge-sm badge-soft shrink-0
                        ${todo.priority === "Urgente" ? "badge-error"
                        : todo.priority === "Moyenne" ? "badge-warning" 
                        : "badge-success"}`}>
                        {todo.priority}
                    </span>
                </div>

                <button
                    onClick={onDelete}
                    className="btn btn-sm btn-error btn-soft shrink-0"
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </li>
    )
}

export default TodoItem