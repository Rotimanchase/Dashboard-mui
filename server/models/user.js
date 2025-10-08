import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 2, max: 100, },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 5 },
    city: { type: String, max: 50 },
    state: { type: String, max: 50 },
    country: { type: String, max: 50 },
    phoneNumber: { type: String, max: 50 },
    occupation: { type: String, max: 50 },
    transactions: { type: Array },
    role: { type: String, enum: ['user', 'superadmin', 'admin'], default: 'superadmin' },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;