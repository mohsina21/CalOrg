import React, { useState, useEffect } from "react";
import CalendarView from "./components/CalendarView";
import EventModal from "./components/EventModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar"; 

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
    console.log("Slot info in EventModal:", slotInfo); 
  }, [slotInfo]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <div className="shrink-0">
        <Header toggleTheme={toggleTheme} dark={dark} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 sm:p-4">
        <CalendarView
  onSlotSelect={handleSlotSelect}
  onEventSelect={(event) => {
    console.log("Selected event:", event); 
    setSlotInfo(event); 
    setModalOpen(true); 
  }}
/>

        </main>
      </div>

      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {}}
        initialData={
          slotInfo?.title 
            ? {
                id: slotInfo._id,
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
