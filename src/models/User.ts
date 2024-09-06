import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique:true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },

}, { timestamps: true });


// @ts-ignore
mongoose.models = {}

export default mongoose.model("User", userSchema);