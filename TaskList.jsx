import React from 'react';

const TaskList = ({ tasks, deleteTask, editTask, toggleTask }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span>Fecha límite: {task.dueDate}</span>
                <span>Status: {task.completed ? "Completada" : "Pendiente"}</span>
              </div>
              <div className="task-actions">
                <button onClick={() => editTask(task)}>Editar</button>
                <button onClick={() => deleteTask(task.id)}>Eliminar</button>
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? "Marcar Pendiente" : "Marcar Completada"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
