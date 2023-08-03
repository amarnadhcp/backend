import { uploadToCloudinary ,MultiUploadCloudinary} from "../utils/cloudinary.js";
import postModel from "../modals/post.model.js";

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


   
  