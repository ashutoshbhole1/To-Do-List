import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  issue: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ["online", "offline"], required: true },
  status: { type: String, enum: ["pending", "approved", "rejected", "cancelled"], default: "pending" },
  meetLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);
