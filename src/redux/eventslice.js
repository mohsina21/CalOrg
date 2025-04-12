import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Async Thunks
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const response = await axios.get("/api/events");
    console.log("Fetched events from API:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
});


export const createEventAsync = createAsyncThunk("events/createEvent", async (eventData) => {
  const res = await axios.post("https://calorg.onrender.com/api/events", eventData);
  return res.data;
});

export const updateEventAsync = createAsyncThunk(
  "events/updateEvent",
  async (updatedEvent) => {
    const res = await axios.put(
      `https://calorg.onrender.com/api/events/${updatedEvent._id}`,
      updatedEvent
    );
    return res.data; // Return the updated event data
  }
);

export const deleteEventAsync = createAsyncThunk("events/deleteEvent", async (id) => {
  await axios.delete(`https://calorg.onrender.com/api/events/${id}`);
  return id;
});


const EventSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    addEvent: (state, action) => {
      state.items.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.items.findIndex(e => e._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.items = state.items.filter(event => event._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      })

      // Create event
      .addCase(createEventAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update event
      .addCase(updateEventAsync.pending, (state) => {
        state.loading = true; // Start loading when update starts
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        console.log("Updated event payload:", action.payload);
        const index = state.items.findIndex(e => e._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false; // Stop loading when update is finished
      })
      .addCase(updateEventAsync.rejected, (state) => {
        state.loading = false; // Stop loading if update fails
      })

      // Delete event
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(event => event._id !== action.payload);
      });
  },
});

export const { addEvent, updateEvent, deleteEvent } = EventSlice.actions;
export default EventSlice.reducer;
