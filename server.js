import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js"
import adminRoute from "./routes/admin.route.js"
import sellerRoute  from "./routes/seller.route.js"


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
  } catch (error) {
    console.log('Failed to connect to MongoDB:', error);
  }
};

app.use(cors({origin:"http://localhost:5173",methods: ["GET", "POST"],credentials:true} ));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/freelancer",sellerRoute);
app.use("/admin",adminRoute)

//err middleware
app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "something went wrong!"
  return res.status(errorStatus).send(errorMessage)
})


app.listen(8800, () => {
  connect();
  console.log("bakecnt is working");
});





// const connect =async()=>{
//   try {
//     await mongoose.connect(process.env.MONGO)
//     console.log("conenected");
//   } catch (error) {
//     console.log(error)
//   }
// }