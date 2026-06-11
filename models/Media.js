import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  _id: ObjectId,

  url: String,
  type: "image" | "video" | "pdf",

  name: String,

  createdAt: Date
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);