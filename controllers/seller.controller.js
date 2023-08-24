import { MultiUploadCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import postModel from "../modals/post.model.js";
import ProposalModel from "../modals/proposal.modal.js"
import userModel from "../modals/user.model.js";

export const Addpost = async(req,res)=>{
    try {
    const userId = req.userId
    // console.log("Received files:", req.files); 

    const uploadedImages = await MultiUploadCloudinary(req.files, "Post");
    // console.log("Uploaded images:", uploadedImages);

    const post = new postModel({
        userId:userId,
        images:uploadedImages,
        ...req.body
        
    })
    let newpost = await post.save().then(console.log("new post Add")).catch(()=>error)

    if(newpost){
        return res.status(200).json({created:true})
    }else{
        return res.status(200).json({created:false})
    }
    
    } catch (error) {
        
    }
}


export const MyGigs=async(req,res)=>{
    try {
        const allpost = await postModel.find({userId:req.userId}).populate("userId")
         return res.status(200).json({allpost})
        
    } catch (error) {
        
    }
}


export const AllGigs =async(req,res)=>{
    try {
        const allpost = await postModel.find({}).populate("userId")
      
        return res.status(200).json({allpost})
    } catch (error) {
        
    }
}



export const allProposal = async (req, res) => {
    try {
        const id = req.userId;
        const proposals = await ProposalModel
            .find({ sellerId: id, status: { $in: ["requested", "Accepted", "Rejected"] } })
            .populate("buyerId");
        return res.status(200).json({ proposals });
    } catch (error) {}
  };


export const proposalstatus = async(req,res)=>{
    try {
        const{status,id}= req.body
        const updation = await ProposalModel.findByIdAndUpdate(
            {_id:id},
            {
                $set:{
                    status:status
                }
            },
            { new: true }
        )
        
        if(updation){
            return res.status(200).json({updated:true})
        }

    } catch (error) {
        
    }
}


export const Allongoing = async(req,res)=>{
    try {
        const id = req.userId;
        const proposals = await ProposalModel.find({sellerId:id,status:"Active"}).populate("buyerId");
        return res.status(200).json({proposals})
    } catch (error) {
        
    }
}


export const profiledata = async(req,res)=>{
    try {
        const id = req.userId
        const freelancer = await userModel.findById(id)
        return res.status(200).json({freelancer})
    } catch (error) {
        
    }
}


export const EditProfile= async(req,res)=>{
    try {
        const updation = await userModel.findByIdAndUpdate(
            {_id:req.userId},
            {
                $set:{
                    ...req.body
                }
            },
            { new: true }
        )
        if(updation){
            return res.status(200).json({updated:true})
        }
    } catch (error) {
        
    }
}

export const uploadImage= async(req,res)=>{
    try {
        const uploadedImage = await uploadToCloudinary(req.file.path,"Profile")
        const updatedImage = await userModel.findByIdAndUpdate(
            {_id:req.userId},
            {
                $set:{
                    img:uploadedImage.url
                }
            },
            { new: true }
        )
            
        if(updation){
            return res.status(200).json({updated:true})
        }

    } catch (error) {
        
    }
}


export const WorkCompleted =async(req,res)=>{
    try {
      const proposal = await ProposalModel.findByIdAndUpdate(
        {_id:req.body.proposalId},
        {
          $set:{
            completed:"true"
          }
        },
        { new: true }
  
        )
      if(proposal){
        res.status(200).json({ message:"sucess" })
      }
    } catch (error) {
      
    }
  }

export const history = async(req,res)=>{
    try {
        const proposals = await ProposalModel.find({sellerId:req.userId,completed:"true",received:"true"}).populate("buyerId");
        return res.status(200).json({proposals})
    } catch (error) {
        
    }
}








   
  