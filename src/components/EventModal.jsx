import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createEventAsync, deleteEventAsync } from "../redux/eventslice";
import ConfirmationModal from "./ConfirmationModal";

const categoryColorMap = {
  exercise: "red",
  eating: "green",
  work: "blue",
  relax: "purple",
  family: "orange",
  social: "pink",
};

const CATEGORIES = Object.keys(categoryColorMap);

const EventModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("work");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "work");
      setStart(initialData.start ? new Date(initialData.start).toISOString().slice(0, 16) : "");
      setEnd(initialData.end ? new Date(initialData.end).toISOString().slice(0, 16) : "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: initialData?.id || undefined, 
      title,
      category,
      start: new Date(start),
      end: new Date(end),
      color: categoryColorMap[category] || "gray",
    };

    dispatch(createEventAsync(newEvent));
    onClose();
  };

  const handleDelete = () => {
    if (initialData?.id) {
      dispatch(deleteEventAsync(initialData.id)); 
    }
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-xl w-[90%] max-w-md p-6 space-y-4">
        <h3 className="text-xl font-bold mb-2">
          {initialData?.id ? "Edit Event" : "Add Event"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center space-x-2">
              <span
                className={`w-4 h-4 rounded-full bg-${categoryColorMap[category]}-500`}
              />
              <span className="capitalize">{category}</span>
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-300">Color Preview</span>
          </div>

          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />

          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />

          <div className="flex justify-between items-center pt-4">
            <div className="space-x-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

            {initialData?.id && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirmation(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
};

export default EventModal;
