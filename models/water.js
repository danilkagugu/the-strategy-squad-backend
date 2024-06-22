import { Schema, model } from "mongoose";
import "dotenv/config";

const waterSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Water = model("water", waterSchema);

export default Water;
