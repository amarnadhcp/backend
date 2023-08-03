// import jwt from "jsonwebtoken"
// import createError from "../utils/createError";

// export const verifyToken = (req,res,next)=>{

//     const token = req.cookies.accessToken;
//     if(!token) return  next(createError(401,"you are not authenticated"))
   
    
//     jwt.verify(token,process.env.JWT_KEY, async (err,payload)=>{
//         if(err) return  next(createError(403,"Token is not valid"))
//         req.userId = payload.Id;
//         req.isSeller = payload.isSeller
//         next()
//     })
// }





// const jwt = require("jsonwebtoken");
// const User= require("../model/userModel")
// const Organizer= require("../model/organizerModel")



    Auth: async(req,res,next)=>{

        try {
            const authHeader = req.headers.authorization;
            console.log("authorization header ");
            console.log(authHeader);
            if (!authHeader) {
                console.log("1");
                return res.status(401).send({
                    message: "auth failed",
                    status: false,
                });
            }
    
            const token = authHeader.split(" ")[1];
            console.log(token, 1234);
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    console.log("the token is not the same");
                    return res.status(401).json({
                        message: "auth failed",
                        success: false,
                    });
                } else {
                    User.findById(decode.id).then((data)=>{
                        if(!data.isBlocked  && decode.role==="user"){
                            req.headers.userId= decode.id
                            console.log("authenticated user");
                            next()
                        }else{
                            res.status(401).json({success:false,message:"unauthenticated user",auth:false})
                        }
                    })
                }
            });
        } catch (error) {
            return res.status(401).json({
                message: "auth failed",
                success: false,
            });
        }
    }