import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    full_name: String,
    password: String,
    email: String,
    profile_image: String,
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("user", UserSchema);
