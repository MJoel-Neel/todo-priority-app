import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

type Priority = "Urgente" | "Moyenne" | "Basse"
type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {
  const [input, setInput] = useState<string>("")
  const [priority, setPriority] = useState<Priority>("Moyenne")

  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Priority | "Tous">("Tous")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (input.trim() === "") return
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [newTodo, ...todos]
    setTodos(newTodos)
    setInput("")
    setPriority("Moyenne")
  }

  let filteredTodos: Todo[] = []
  if (filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter)
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length
  const lowCount = todos.filter((t) => t.priority === "Basse").length
  const totalCount = todos.length

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set())
  
  function toggleselectedTodo(id: number) {
    const newSelected = new Set(selectedTodos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedTodos(newSelected)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id))
    setTodos(newTodos)
    setSelectedTodos(new Set())
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-4 my-8 md:my-16 bg-base-300 p-4 md:p-6 rounded-2xl shadow-xl">
        
        {/* Input Area - Fixed mobile squishing */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajoutez une tâche"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {/* Added w-full and flex-1 so they share the row evenly on mobile */}
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <select
              className="select flex-1 sm:w-40 sm:flex-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Urgente">Urgent</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>

            <button
              className="btn btn-primary flex-1 sm:w-auto sm:flex-none"
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
                onClick={() => setFilter("Tous")}> Tous ({totalCount})</button>

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
              Finir la selection ({selectedTodos.size})
            </button>
          </div>

          {/* FIXED HTML NESTING HERE */}
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20 bg-base-100 rounded-xl overflow-hidden">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  isSelected={selectedTodos.has(todo.id)}
                  onToggleSelect={toggleselectedTodo} 
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <Construction strokeWidth={1} className="w-32 h-32 md:w-40 md:h-40 text-primary" />
              </div>
              <p className="text-sm mt-4">Aucune Tâche pour ce filtre</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App