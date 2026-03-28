import mongoose from "mongoose";

const WorkingHourSchema = new mongoose.Schema({
  day: { type: String, required: true, unique: true },
  start: { type: String, default: "09:00" },
  end: { type: String, default: "17:00" },
  isClosed: { type: Boolean, default: false },
  note: { type: String, default: "" },         // e.g. "Operatory (No OPD)"
  order: { type: Number, required: true },     // to sort Monday->Sunday
});

export default mongoose.models.WorkingHour || mongoose.model("WorkingHour", WorkingHourSchema);
