// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

// export const User = mongoose.models.User || mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    message: { type: String },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Export or reuse model safely (important for Next.js hot reload)
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
