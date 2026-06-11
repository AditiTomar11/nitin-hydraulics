import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  tag: { type: String },
  image: { type: String },
  description: { type: String },
  specs: [{ label: String, value: String }],
  features: [String],
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);