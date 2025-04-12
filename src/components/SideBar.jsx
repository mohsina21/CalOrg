
import React, { useState } from "react";
import { PlusCircle, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const mockGoals = [
  { id: "learn", name: "Learn", color: "blue" },
  { id: "health", name: "Health", color: "green" },
];

const Sidebar = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [tasks, setTasks] = useState({
    learn: [
      { name: "AI based agents", done: false },
      { name: "MLE", done: false },
      { name: "DE related", done: false },
      { name: "Basics", done: false },
    ],
    health: [
      { name: "Morning Jog", done: false },
      { name: "Healthy Meal Prep", done: false },
    ],
  });
  const [newTask, setNewTask] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-2 m-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 fixed z-50"
      >
        {sidebarOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      <div
        className={`fixed z-40 md:relative transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700 md:w-64 w-4/5 p-4 h-screen`}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Goals
        </h2>
        <ul className="space-y-2">
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
            <h3 className="mt-6 text-lg font-medium text-gray-800 dark:text-white">
              Tasks for {mockGoals.find((g) => g.id === selectedGoal).name}
            </h3>
            <ul className="mt-3 space-y-2">
              {tasks[selectedGoal].map((task, index) => (
                <li
                  key={task.name + index}
                  className={`flex items-center justify-between px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border dark:border-gray-600 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    task.done ? "bg-green-100 dark:bg-green-700" : ""
                  }`}
                >
                  <span>{task.name}</span>
                  <button onClick={() => toggleTaskDone(selectedGoal, index)}>
                    <CheckCircle
                      className={`w-5 h-5 ${task.done ? "text-green-500" : "text-gray-400"}`}
                    />
                  </button>
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

export default Sidebar;