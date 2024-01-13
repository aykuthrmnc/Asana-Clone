import mongoose from "mongoose";
import logger from "../scripts/logger/Section.js";

const SectionSchema = mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
  },
  { timestamps: true, versionKey: false }
);

SectionSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});

export default mongoose.model("section", SectionSchema);
