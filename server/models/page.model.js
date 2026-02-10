import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled",
      trim: true
    },
    content: {
      type: String,
      default: ""
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: {
          type: Boolean,
          default: false
    },

  },
  { timestamps: true }
);

export const Page = mongoose.model("Page", pageSchema);
