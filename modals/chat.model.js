import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users:Array, 
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("chat", chatSchema);
