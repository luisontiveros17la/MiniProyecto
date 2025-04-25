import React from 'react';

const TaskFilters = ({ filter, setFilter, search, setSearch }) => {
  return (
    <div className="task-filters">
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};

export default TaskFilters;
