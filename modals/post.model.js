import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cat: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("post", postSchema);
