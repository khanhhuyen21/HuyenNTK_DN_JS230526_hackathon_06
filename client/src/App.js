import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Task } from "./components/Task";
import { Header } from "./components/Header";
import { Input } from "./components/Input";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7070/api/v1/todo")
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  function addNewTask(newTaskTitle) {
    axios
      .post("http://localhost:7070/api/v1/todo", {
        nametask: newTaskTitle,
        status: "Completed",
      })
      .then((response) => {
        console.log("Task created successfully:", response.data);
        setTasks((prevTasks) => [...prevTasks, response.data.data]);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  }

  function handleCheckTask(taskId) {
    axios
      .put(`http://localhost:7070/api/v1/todo/${taskId}`, {
        // Truyền dữ liệu cần cập nhật
      })
      .then((response) => {
        console.log("Task updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  }

  function handleRemoveTask(taskId) {
    // Gọi API để xóa task
    axios
      .delete(`http://localhost:7070/api/v1/todo/${taskId}`)
      .then((response) => {
        console.log("Task deleted successfully:", response.data);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  return (
    <div className={"app"}>
      <Header />
      <Input onNewTask={addNewTask} />
      <Task
        tasks={tasks}
        onCompleteTask={handleCheckTask}
        onRemoveTask={handleRemoveTask}
      />
    </div>
  );
}

export default App;
