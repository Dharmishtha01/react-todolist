import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      setError("Todo cannot be empty.");
      return;
    }
    if (newTodo.length > 32) {
      setError("cant exceed 32 characters.");
      return;
    }
    setError("");
    if (editingIndex >= 0) {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(-1);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
  };

  const handleEditTodo = (index) => {
    setNewTodo(todos[index]);
    setEditingIndex(index);
    setError("")
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };
  const handleChange = (e) => {
    setNewTodo(e.target.value)
    setError("")
  }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={ handleChange }
          placeholder="Enter a todo"
        />
        <button onClick={handleAddTodo}>
          {editingIndex >= 0 ? "Update" : "Add"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <p>{todo}</p>
            <div>
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

