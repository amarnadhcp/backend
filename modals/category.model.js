import mongoose from "mongoose";
const { Schema} = mongoose;

const categorySchema = new Schema(
  {
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
  }
)

export default mongoose.model("category",categorySchema)