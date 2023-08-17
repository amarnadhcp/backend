import User from "../modals/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import createError from "../utils/createError.js"
import Tokenmodel from "../modals/token.js"

import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"

export const  register = async (req,res,next)=>{

   try {
  
    const {email}=req.body
    const exist = await User.findOne({email:email})
    if(exist){
     return res.status(200).json({created:false, message:"email already exists"})
    }else{

    const hash = bcrypt.hashSync(req.body.password,5)
    const newUser =  new User({
      ...req.body,
      password:hash
   })

    let user =  await newUser.save().then(console.log("updated"))

    const token = jwt.sign({ id: user._id},
      process.env.JWT_KEY,{ expiresIn: "24hr" });

    const emailtoken = await new Tokenmodel({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/${user.id}/verify/${emailtoken.token}`
    await sendEmail(user.email, "Verify Email", url);
    console.log("email suucess");
    return res.status(200).json({created:true,user:user,token:token, message:"verification gmail has been sent to your gmail"})
   }
    
   } catch (err) {
      // res.status(500).send("something went wrong")
      next(err)
   }

}


export const verification = async (req, res) => {
   try {
     const user = await User.findOne({ _id: req.params.id });
     if (!user) {
       return res.status(400).json({ message: "Invalid Link" });
     }

     const token = await Tokenmodel.findOne({
       userId: user._id,
       token: req.params.token,
     });
     if (!token) {
       return res.status(400).json({ message: "Invalid Link" });
     }
     await User.updateOne({ _id: user._id }, { $set: { verified: true } });
     await Tokenmodel.deleteOne({ _id: token._id });
     res.status(200).json({user:user, message: "Email Verification Successful " });
   } catch (error) {
     console.log(error);
     return res.status(500).json({ message: "internal server error" });
   }
 };


export const login = async(req,res,next)=>{
   try {
      const user = await User.findOne({email:req.body.email})
      if(!user)return res.status(201).json({access:false,message:"User not found"})
      
      const isCorrect = bcrypt.compareSync(req.body.password,user.password)
      if(!isCorrect)return res.status(201).json({access:false,message:"wrong password or username!"})
        
      const token = jwt.sign({ id: user._id, isSeller: user.isSeller},
      process.env.JWT_KEY,{ expiresIn: "24hr" });

      const {password, ...info} = user._doc
      return res.status(200).json({ access:true,token,info,message:"logged in successfully",});

   } catch (err) {
     next(err)
   }
}


export const UserGoogleReg = async (req, res) => {
  try {
    const { name, email, id, picture } = req.body;
    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(200).json({ exists: true, message: "Email Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(id, salt);

      const newUser = new User({
        username: name,
        email: email,
        password: hashedpassword,
        img: picture,
      });
      let user = await newUser.save().then(console.log("updated"));
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: 6000000,
      });
      return res
        .status(200)
        .json({ created: true,user, message: "Account Registered", token: token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserGoogleLogin = async (req, res) => {
  try {
    const { email, id } = req.body;
    const exists = await User.findOne({ email: email });
    if (exists) {
      const access = await bcrypt.compare(id, exists.password);
      if (access) {
        const token = jwt.sign({ userId: exists._id }, process.env.JWT_KEY, {
          expiresIn: 600000,
         });
        
        return res.status(200).json({user:exists,token: token, message: "login Successfull",status:true, });
      } else {
        return res.status(404) .json({ alert: "Email or Password is wrong", status: false });
      }
      
    } else {
      return res .status(201) .json({ alert: "This email is not registered", status: false });
    }
  } catch (error) {
    console.log(error);
  }
};




export const logout = async(req,res)=>{
   res.clearCookie("accessToken",{
      sameSite:"none",
      secure :true
   })
   .status(200).send("user has been logged out")
}

