import mongoose from "mongoose";
import logger from "../scripts/logger/Task.js";

const TaskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    due_date: Date,
    statuses: [String],
    section_id: {
      type: mongoose.Types.ObjectId,
      ref: "section",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
      {
        comment: String,
        commented_at: Date,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    media: [
      {
        file: String,
        user_id: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    sub_tasks: [{ type: mongoose.Types.ObjectId, ref: "task" }],
  },
  { timestamps: true, versionKey: false }
);

TaskSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});

export default mongoose.model("task", TaskSchema);
