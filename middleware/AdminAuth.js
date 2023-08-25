import jwt from "jsonwebtoken"

export const AdminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).send({message:"Auth failed",status:false})
        }
        const token = authHeader.trim().split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
            if(err){
                console.log("token is not the same");
                return res.status(401).json({message:"Auth success",status:true})
            }else{
                next()
            }
        })
    } catch (error) {
        // Handle the error here if needed
        console.log(error);
    }
};
