import { compare } from "bcrypt";
import jwt from 'jsonwebtoken'

import Admin from "../modals/admin.model.js"
import userModel from "../modals/user.model.js";
import categoryModel from "../modals/category.model.js";

import { uploadToCloudinary } from "../utils/cloudinary.js";
import ProposalModel from "../modals/proposal.modal.js";

export const login = async(req,res,next)=>{
    try {
    
        const admin = await Admin.findOne({email:req.body.email})
        if(!admin) return res.status(201).json({access:false,message:"user no found"})

        const isCorrect = compare(admin.password,req.body.password)
        if(!isCorrect) return res.status(201).json({access:false,message:"password is wrong"})

        const token = jwt.sign({adminId:admin._id},process.env.JWT_KEY,{
            expiresIn: 600000,
        })
        return res.status(201).json({access:true,message:"logged in",admin,token})
    } catch (error) {
        
    }
}

export const users = async (req,res,next)=>{
    try {
        const users = await userModel.find({})
        return res.status(200).json({data:users})
    } catch (error) {
        
    }
}

export const AddCategory = async(req,res,next)=>{
    try {
        const img = req.file.path
        const{title,desc}=req.body
    
        const data = await uploadToCloudinary(img, "category");
        if(data){   
         const img = data.url
         const newCategory = new categoryModel({title,desc,img})
         newCategory.save()
            .then(()=>{
                console.log("new category");
                return res.status(201).json({ success: true, message: "Category added successfully" });
            })
            .catch(()=>{
                console.error("Error saving category:", error);
                res.status(500).json({ success: false ,error: "Failed to add category" });
            })
        }
    } catch (error) {
        console.log(error);
    }
}


export const categorys = async(req,res,next)=>{
    try {
        const category = await categoryModel.find({})
        return res.status(200).json(category)
    } catch (error) {
        
    }
}

export const userManage = async(req,res,next)=>{
    try {
        const id = req.params.id
        const user = await userModel.findById(id);
      if (user) {
        await userModel.updateOne({ _id: id }, { $set: { status: !user.status } });
        res.status(200).json({ message: user.status ? "User Blocked" : "User UnBlocked" });
      } else {
        res.status(404).json({ message: "User not found" });
      }

    } catch (error) {
        
    }
}

export const PayFreelancer = async(req,res)=>{
    try {
        const {FreelancerId,Price,ProposalId}=req.body
        const updatedFreelancer = await userModel.findByIdAndUpdate(
            FreelancerId,
            {
        
              $inc: { wallet: Price } 
            },
            { new: true } 
          );

        const updatePreposal = await ProposalModel.findByIdAndUpdate(
            ProposalId,
            { $set:{status:"completed"},},
            { new: true } 
        )
        
          if(updatedFreelancer && updatePreposal){
            res.status(200).json({ message:"sucess" })
          }

    } catch (error) {
        
    }
}

export const Allworks = async(req,res)=>{
    try {
        const proposals = await ProposalModel.find({}).populate("buyerId").populate("sellerId");
        return res.status(200).json({proposals})
    } catch (error) {
        
    }
}
