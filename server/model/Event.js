import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  category: { type: String, required: true },
  color: { type: String, default: "gray" },
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
