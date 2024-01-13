import mongoose from "mongoose";
import logger from "../scripts/logger/Project.js";

const ProjectSchema = mongoose.Schema(
  {
    name: String,
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

// ProjectSchema.pre("save", (doc, next) => {
//   next();
// });

ProjectSchema.post("save", (doc) => {
  logger.log({
    level: "info",
    message: doc,
  });
});

export default mongoose.model("project", ProjectSchema);
