import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // required: true,
    },
    code: {
      type: String,
    },
    language: {
      type: String,
    },
    output: {
      type: String,
    },
    logs: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Code =
  mongoose?.models?.codes || mongoose.model("codes", codeSchema);
