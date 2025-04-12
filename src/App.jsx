import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import EventModal from "./components/EventModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"; // ✅ Sidebar added

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    console.log("Slot info in EventModal:", slotInfo); // Debug log
  }, [slotInfo]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="shrink-0">
        <Header toggleTheme={toggleTheme} dark={dark} />
      </div>

      {/* Body layout: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 sm:p-4">
        <CalendarView
  onSlotSelect={handleSlotSelect}
  onEventSelect={(event) => {
    console.log("Selected event:", event); // Debug log
    setSlotInfo(event); // Set the selected event as slotInfo
    setModalOpen(true); // Open the modal
  }}
/>

        </main>
      </div>

      {/* Modal */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {}}
        initialData={
          slotInfo?.title // Check if slotInfo contains event data
            ? {
                id: slotInfo._id, // Pass the event ID for editing
                title: slotInfo.title,
                category: slotInfo.category,
                start: slotInfo.start,
                end: slotInfo.end,
              }
            : {
                title: "",
                category: "",
                start: slotInfo?.start,
                end: slotInfo?.end,
              }
        }
      />
    </div>
  );
};

export default App;
