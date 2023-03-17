import mongoose from "mongoose";
import { Schema } from "mongoose";


const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    userId:{
      type:String,
    },
    tracks:{
      type:[String],
    }
  },
  { timestamps: true }
);

export default mongoose.model("album", albumSchema);