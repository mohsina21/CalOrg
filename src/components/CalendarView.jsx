import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, updateEventAsync } from "../redux/eventslice";

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView = ({ onSlotSelect, onEventSelect }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items || []);
  const [defaultView, setDefaultView] = useState("week");

  useEffect(() => {
    dispatch(fetchEvents());

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setDefaultView("day");
      else if (width < 1024) setDefaultView("week");
      else setDefaultView("month");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  useEffect(() => {
    console.log("Events from Redux:", events);
  }, [events]);
  
  const formattedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  

  

  return (
    <div className="p-4 h-full w-full">
      <div className="shadow-lg bg-white dark:bg-gray-900 h-[80vh] sm:h-[85vh]">

        <DnDCalendar
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView={defaultView}
          views={["month", "week", "day"]}
          selectable
          resizable
          step={60} // ⏰ set step to 60 mins
          timeslots={1} // 🕒 only one timeslot per hour
          onSelectSlot={onSlotSelect}
          onSelectEvent={onEventSelect}
          onEventDrop={({ event, start, end }) => {
            const updated = { ...event, start, end };
            dispatch(updateEventAsync(updated));
          }}
          onEventResize={({ event, start, end }) => {
            const updated = { ...event, start, end };
            dispatch(updateEventAsync(updated));
          }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.color || "#4B5563",
              color: "black",
              borderRadius: "6px",
              padding: "4px",
              border: "none",
            },
          })}
          dayPropGetter={(date) => {
            const today = new Date();
            if (
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            ) {
              return {
                style: {
                  backgroundColor: "grey", // Light pink background for the current day
                },
              };
            }
            return {};
          }}
        />
      </div>
    </div>
  );
}

export default CalendarView;