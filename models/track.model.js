import mongoose from "mongoose";
import { Schema } from "mongoose";
import { artistSchema } from "./artist.model.js";

const trackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    songUrl: {
      type: String,
      required: true,
    },
    albumId: {
      type: String,
    },
    artists: {
      type: [artistSchema],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

export default mongoose.model("track", trackSchema);