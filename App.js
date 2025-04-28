import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';

// Estado inicial y reducer para manejar las tareas
const initialState = [];
function tasksReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "ADD_TASK":
      return [...state, action.payload];
    case "UPDATE_TASK":
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    case "DELETE_TASK":
      return state.filter(task => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Al montar la aplicación, cargar las tareas guardadas en localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch({ type: "INITIALIZE", payload: savedTasks });
  }, []);

  // Guardar las tareas en localStorage cada vez que se actualice el estado de tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    if (editTask) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...task, id: editTask.id, completed: editTask.completed },
      });
      setEditTask(null);
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { ...task, id: Date.now(), completed: false },
      });
    }
  };

  const deleteTask = id => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const initiateEdit = task => {
    setEditTask(task);
  };

  const toggleTask = id => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  // Filtrar las tareas según el filtro seleccionado y el texto de búsqueda ingresado
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
          ? task.completed
          : !task.completed;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1>Administrador de Tareas</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </header>
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <TaskForm addTask={addOrUpdateTask} editTask={editTask} />
          <TaskFilters
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            editTask={initiateEdit}
            toggleTask={toggleTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
