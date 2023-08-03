import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  isSeller: {
    type: Boolean,
    default:false
  },
  status:{
    type:Boolean,
    default:true
  }
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)