import React, { useState } from "react";
import {
  PlusCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Trash2,
  Pencil,
  Save,
  X,
} from "lucide-react";

const mockGoals = [
  { id: "learn", name: "Learn", color: "blue" },
  { id: "health", name: "Health", color: "green" },
];

const SideBar = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [tasks, setTasks] = useState({
    learn: [
      { name: "AI based agents", done: false },
      { name: "MLE", done: false },
    ],
    health: [
      { name: "Morning Jog", done: false },
      { name: "Healthy Meal Prep", done: false },
    ],
  });
  const [newTask, setNewTask] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() && selectedGoal) {
      setTasks((prev) => ({
        ...prev,
        [selectedGoal]: [...prev[selectedGoal], { name: newTask.trim(), done: false }],
      }));
      setNewTask("");
    }
  };

  const toggleTaskDone = (goalId, index) => {
    const updated = [...tasks[goalId]];
    updated[index].done = !updated[index].done;
    setTasks((prev) => ({ ...prev, [goalId]: updated }));
  };

  const handleDeleteTask = (goalId, index) => {
    const updated = tasks[goalId].filter((_, i) => i !== index);
    setTasks((prev) => ({ ...prev, [goalId]: updated }));
  };

  const handleStartEdit = (index, taskName) => {
    setEditingIndex(index);
    setEditText(taskName);
  };

  const handleSaveEdit = (goalId, index) => {
    const updated = [...tasks[goalId]];
    updated[index].name = editText.trim();
    setTasks((prev) => ({ ...prev, [goalId]: updated }));
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md shadow-md md:hidden"
      >
        {sidebarOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed z-40 md:relative transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:w-64 w-4/5 p-4 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <h2 className="text-xl font-semibold mb-4">Goals</h2>
        <ul className="space-y-2 mb-4">
          {mockGoals.map((goal) => (
            <li
              key={goal.id}
              onClick={() =>
                setSelectedGoal((prev) => (prev === goal.id ? null : goal.id))
              }
              className={`cursor-pointer font-medium text-${goal.color}-600 hover:underline`}
            >
              {goal.name}
            </li>
          ))}
        </ul>

        {selectedGoal && (
          <>
            <h3 className="text-lg font-medium">Tasks for {selectedGoal}</h3>
            <ul className="mt-3 space-y-2">
              {tasks[selectedGoal].map((task, index) => (
                <li
                  key={task.name + index}
                  className={`task-item ${
                    task.done ? "bg-green-100 dark:bg-green-700" : ""
                  }`}
                >
                  {editingIndex === index ? (
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                  ) : (
                    <span className={`flex-1 ${task.done ? "line-through opacity-70" : ""}`}>
                      {task.name}
                    </span>
                  )}

                  <div className="task-buttons">
                    <button onClick={() => toggleTaskDone(selectedGoal, index)}>
                      <CheckCircle
                        className={`w-5 h-5 ${task.done ? "text-green-500" : "text-gray-400"}`}
                      />
                    </button>

                    {editingIndex === index ? (
                      <>
                        <button onClick={() => handleSaveEdit(selectedGoal, index)}>
                          <Save className="w-5 h-5 text-blue-500" />
                        </button>
                        <button onClick={() => setEditingIndex(null)}>
                          <X className="w-5 h-5 text-red-500" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleStartEdit(index, task.name)}>
                          <Pencil className="w-5 h-5 text-yellow-500" />
                        </button>
                        <button onClick={() => handleDeleteTask(selectedGoal, index)}>
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Add task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddTask}
                className="text-indigo-600 hover:text-indigo-800 transition"
                aria-label="Add task"
              >
                <PlusCircle size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
