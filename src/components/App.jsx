import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // New state for the task deadline
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "" && deadline !== "") {
      const newTask = {
        task: task,
        description: description,
        completed: false,
        deadline: new Date(deadline).getTime(), // Convert deadline to timestamp
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setDescription("");
      setDeadline("");
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Use useEffect to update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          const timeRemaining = task.deadline - Date.now();
          return {
            ...task,
            timeRemaining: timeRemaining > 0 ? timeRemaining : 0,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div className="container">
      <div className="header">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Type your task"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Type your task description"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={handleDeadlineChange}
          placeholder="Set deadline"
        />
        <button onClick={handleAddTask}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    fontSize: item.completed ? "small" : "",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <strong>{item.task}</strong>: {item.description}<br />
                  {item.deadline && (
                    <span>
                      | Deadline:{" "}
                      {new Date(item.deadline).toLocaleString()}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    className="delete"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
              {item.deadline && (
                <div>
                  <strong>Time Remaining: </strong>
                  {Math.floor(item.timeRemaining / 1000 / 60)} minutes{" "}
                  {Math.floor((item.timeRemaining / 1000) % 60)} seconds
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
