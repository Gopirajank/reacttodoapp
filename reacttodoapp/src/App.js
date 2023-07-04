import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e, todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, status: e.target.value };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      taskName,
      description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
    setTaskName('');
    setDescription('');
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const editTodo = (todoId) => {
    // Handle edit functionality here
  };

  const filterTodos = (status) => {
    setStatusFilter(status);
  };

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === 'completed') {
      return todo.status === 'completed';
    } else if (statusFilter === 'not-completed') {
      return todo.status === 'not completed';
    }
    return true; // Show all todos for "all" filter
  });

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskName}
          onChange={handleTaskNameChange}
          placeholder="Task Name"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
        />
        <button className="btn primary-button " onClick={addTodo}>Add Todo</button>
      </div>
      <div className="filter-container">
        <button className="btn  light-button" onClick={() => filterTodos('all')}>All</button>
        <button className="btn success-button" onClick={() => filterTodos('completed')}>Completed</button>
        <button className="btn secondary-button" onClick={() => filterTodos('not-completed')}>Not Completed</button>
      </div>
      <div className="card-container">
        {filteredTodos.map((todo) => (
          <div className="card" key={todo.id}>
            <div className="card-body">
              <h3 className="card-title">{todo.taskName}</h3>
              <p className="card-text">{todo.description}</p>
              <p>Status:</p>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdown-${todo.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                  {todo.status}
                </button>
                <select
  value={todo.status}
  onChange={(e) => handleStatusChange(e, todo.id)}
  className="form-select"
>
  <option value="not completed">Not Completed</option>
  <option value="completed">Completed</option>
</select>
              </div>
              <div className="button-group">
                <button className="btn success-button " onClick={() => editTodo(todo.id)}>Edit</button>
                <button className="btn danger-button " onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
