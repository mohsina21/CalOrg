import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import EventModal from "./components/EventModal";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false); // ✅ FIXED missing state
  const [slotInfo, setSlotInfo] = useState(null);
  const [dark, setDark] = useState(false);

  const handleSlotSelect = (slot) => {
    setSlotInfo(slot);
    setModalOpen(true);
  };

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header toggleTheme={toggleTheme} dark={dark} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">

        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white dark:bg-gray-800 p-4 shadow-md border-r border-gray-300 dark:border-gray-700">
          <Sidebar />
        </div>

        {/* Main Calendar View */}
        <main className="flex-1 p-4 overflow-auto">
          <CalendarView onSlotSelect={handleSlotSelect} />
        </main>
      </div>

      {/* Event Modal - Always mounted but only shown when modalOpen */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {}}
        initialData={{
          title: "",
          category: "",
          start: slotInfo?.start,
          end: slotInfo?.end,
        }}
      />
    </div>
  );
};



export default App;
