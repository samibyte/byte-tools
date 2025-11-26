import { Schema, model, models } from "mongoose";

const ToolSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    tags: [String],
    createdAt: Date,
    features: [String],
  },
  { timestamps: true }
);

export default models.Tool || model("Tool", ToolSchema);
