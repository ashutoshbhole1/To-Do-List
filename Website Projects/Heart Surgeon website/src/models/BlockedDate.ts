import mongoose from "mongoose";

const BlockedDateSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  reason: { type: String, default: "Unavailable" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BlockedDate || mongoose.model("BlockedDate", BlockedDateSchema);
