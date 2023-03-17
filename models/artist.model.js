import { Schema } from "mongoose";

export const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    category:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);