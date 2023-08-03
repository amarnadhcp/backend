import mongoose from "mongoose";

const {Schema}= mongoose

const adminSchema = new Schema({
    email:{
        type:String,
        require:true,
    
    },
    password:{
        type:String,
        require:true
    }
})

export default mongoose.model("Admin",adminSchema)