import mongoose, { Schema as _Schema, model } from "mongoose";

const { Schema } = mongoose;

const proposalSchema = new Schema({
  sellerId: {
    type: _Schema.Types.ObjectId,
    ref: "User",
  },
  buyerId: {
    type: _Schema.Types.ObjectId,
    ref: "User",
  },
  recuriment: {
    type: String,
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "requested",
  },
  completed: {
    type:Boolean,
    default: "false",
  },
  payment_intent: {
      type: String,
      required: false,
    },
  received: {
    type:Boolean,
    default: "false",
  },
  reason: {
    type: String,
    required: false,
  },
});

const ProposalModel = model("proposal", proposalSchema);

export default ProposalModel;
