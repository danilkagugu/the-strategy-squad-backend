import { Schema, model } from "mongoose";
import "dotenv/config";

const testSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for test"],
    },
    phone: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Test = model("test", testSchema);

export default Test;
