import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  _id: ObjectId,

  title: String,
  slug: String,

  content: String,      // rich text HTML or JSON

  image: String,

  seo: {
    title: String,
    description: String
  },

  createdAt: Date
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);