import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setDueDate(editTask.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editTask]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert('Rellena todos los campos');
      return;
    }
    addTask({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editTask ? 'Editar Tarea' : 'Añadir Tarea'}</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button type="submit">
        {editTask ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default TaskForm;
