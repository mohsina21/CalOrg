import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventsRoute from './routes/events.js'; // make sure path is correct
import dotenv from "dotenv";

dotenv.config();

const app = express(); // ✅ Yeh line bohot zaroori hai!

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events", eventsRoute);

// Connect to DB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
