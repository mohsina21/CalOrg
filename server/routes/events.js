import express from "express";
import Event from "../model/Event.js";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    console.log("Fetched events from DB:", events); // Debug log
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    // ✅ Validate required fields
    if (!req.body.start || !req.body.end) {
      return res.status(400).json({ message: "Start and end time required" });
    }

    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// Update an event by ID
router.put("/:id", async (req, res) => {
  try {
    // ✅ Validate required fields
    if (!req.body.start || !req.body.end) {
      return res.status(400).json({ message: "Start and end time required" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.sendStatus(204); // No content, successful deletion
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
