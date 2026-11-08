import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction, RotateCcw } from "lucide-react";

export type Priority = "Urgente" | "Moyenne" | "Basse";
export type Category = "Travail" | "Personnel" | "Courses";
export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  category: Category;
  timeLeft?: number; // In seconds
};

// --- THE 5 DEFAULT TASKS ---
const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Réunion d'équipe", priority: "Urgente", category: "Travail", timeLeft: 300 }, 
  { id: 2, text: "Faire les courses", priority: "Moyenne", category: "Courses" },
  { id: 3, text: "Répondre aux emails", priority: "Moyenne", category: "Travail" },
  { id: 4, text: "Séance de sport", priority: "Basse", category: "Personnel" },
  { id: 5, text: "Appeler maman", priority: "Urgente", category: "Personnel" },
];
// ---------------------------

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [category, setCategory] = useState<Category>("Travail");
  
  // New Timer State (0 = no timer)
  const [timerDuration, setTimerDuration] = useState<number>(0);

  // Load from localStorage safely
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
      return [];
    }
  });

  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Timer Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) => {
        let hasChanged = false;
        const newTodos = prevTodos.map((todo) => {
          if (todo.timeLeft !== undefined && todo.timeLeft > 0) {
            hasChanged = true;
            return { ...todo, timeLeft: todo.timeLeft - 1 };
          }
          return todo;
        });
        return hasChanged ? newTodos : prevTodos;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function addTodo() {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
      category: category,
      timeLeft: timerDuration > 0 ? timerDuration : undefined,
    };

    setTodos([newTodo, ...todos]);
    setInput("");
    setPriority("Moyenne");
    setCategory("Travail");
    setTimerDuration(0);
  }

  let filteredTodos: Todo[] = [];
  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }

  const totalCount = todos.length;
  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;

  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (selectedTodos.has(id)) {
      const newSelected = new Set(selectedTodos);
      newSelected.delete(id);
      setSelectedTodos(newSelected);
    }
  }

  function toggleselectedTodo(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedTodos(newSelected);
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  }

  // Drag and Drop
  const [draggedId, setDraggedId] = useState<number | null>(null);

  function handleDragStart(id: number) {
    setDraggedId(id);
  }

  function handleDrop(targetId: number) {
    if (draggedId === null || draggedId === targetId) return;
    const fromIndex = todos.findIndex((t) => t.id === draggedId);
    const toIndex = todos.findIndex((t) => t.id === targetId);
    const newTodos = [...todos];
    const [moved] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, moved);
    setTodos(newTodos);
    setDraggedId(null);
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-4 my-8 md:my-16 bg-base-300 p-4 md:p-6 rounded-2xl shadow-xl">
        
        {/* Input Area */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajoutez une tâche"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <div className="flex flex-wrap gap-2 w-full">
            <select
              className="select flex-1 min-w-[120px]"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgente">Urgent</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <select
              className="select flex-1 min-w-[120px]"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="Travail">Travail</option>
              <option value="Personnel">Personnel</option>
              <option value="Courses">Courses</option>
            </select>

            {/* Timer Dropdown */}
            <select
              className="select flex-1 min-w-[120px]"
              value={timerDuration}
              onChange={(e) => setTimerDuration(Number(e.target.value))}
            >
              <option value={0}>Pas de minuteur</option>
              <option value={60}>1 min</option>
              <option value={300}>5 min</option>
              <option value={600}>10 min</option>
              <option value={900}>15 min</option>
              <option value={1800}>30 min</option>
            </select>

            <button
              className="btn btn-primary flex-1 min-w-[120px]"
              onClick={addTodo}
            >
              Ajoutez
            </button>
          </div>
        </div>

        <div className="space-y-4 flex-1 h-fit mt-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-2 md:gap-4">
              <button className={`btn btn-sm md:btn-md btn-soft ${filter === "Tous" ? "btn-primary" : ""}`}
                onClick={() => setFilter("Tous")}>Tous ({totalCount})</button>
              <button className={`btn btn-sm md:btn-md btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`}
                onClick={() => setFilter("Urgente")}>Urgent ({urgentCount})</button>
              <button className={`btn btn-sm md:btn-md btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`}
                onClick={() => setFilter("Moyenne")}>Moyenne ({mediumCount})</button>
              <button className={`btn btn-sm md:btn-md btn-soft ${filter === "Basse" ? "btn-primary" : ""}`}
                onClick={() => setFilter("Basse")}>Basse ({lowCount})</button>
            </div>

            <button
              onClick={finishSelected}
              className="btn btn-primary btn-sm md:btn-md w-full lg:w-auto shrink-0"
              disabled={selectedTodos.size === 0}
            >
              Finir la sélection ({selectedTodos.size})
            </button>
          </div>

          {/* Todo List */}
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20 bg-base-100 border border-base-content/10 rounded-xl overflow-hidden shadow-sm">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  isSelected={selectedTodos.has(todo.id)}
                  onToggleSelect={toggleselectedTodo}
                  onDragStart={() => handleDragStart(todo.id)}
                  onDrop={() => handleDrop(todo.id)}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-10 bg-base-100 rounded-xl border border-base-content/10 shadow-sm">
              <Construction strokeWidth={1} className="w-24 h-24 md:w-32 md:h-32 text-primary/50" />
              <p className="text-sm text-base-content/70 mt-4 mb-4">Aucune tâche pour ce filtre</p>
              
              {/* Button to load defaults if list is completely empty */}
              {totalCount === 0 && (
                <button 
                  onClick={() => setTodos(DEFAULT_TODOS)} 
                  className="btn btn-outline btn-sm gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Charger les 5 tâches d'exemple
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;