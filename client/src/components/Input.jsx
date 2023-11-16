import "../../src/index.css";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

export function Input({ onNewTask }) {
  const [newTask, setNewTask] = useState("");

  function handleNewTask(event) {
    event.preventDefault();
    if (newTask.trim() !== "") {
      onNewTask(newTask.trim());
      setNewTask("");
    }
  }

  function handleNewTaskChange(event) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event) {
    event.target.setCustomValidity("Task name is obligatory!");
  }

  const isNewTask = newTask.trim().length === 0;

  return (
    <div className="containerInput">
      <input
        type="text"
        placeholder="Create new task"
        value={newTask}
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
      />
      <button onClick={handleNewTask} type="submit" disabled={isNewTask}>
        Add Item
        <PlusCircle size={20} />
      </button>
    </div>
  );
}
