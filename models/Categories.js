import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  _id: ObjectId,

  name: String,
  slug: String,

  description: String,

  createdAt: Date
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);