// import axios from "axios";

// const upload = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "freelancers");

//   try {
//     const res = await axios.post("http://api.cloudinary.com/v1_1/Amarnadh/image", data);

//     const { url } = res.data;
//     return url;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default upload;


import { config } from 'dotenv';
config();

import cloudinary from "cloudinary";


cloudinary.config({ 
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET
  });

  const uploadToCloudinary = async (path , folder) => {
    try {
          const data = await cloudinary.v2.uploader.upload(path, { folder });
          return { url: data.url, public_id: data.public_id };
      } catch (error) {
          console.log(error);
      }
  }

  const MultiUploadCloudinary = async (files, folder) => {
    try {
        const uploadedImages = [];
        for (const file of files) {
            const { path } = file;
            const result = await uploadToCloudinary(path, folder); 

            if (result.url) {
                uploadedImages.push(result.url);
            }
        }
        return uploadedImages;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to handle it in the calling function if needed
    }
};


export {uploadToCloudinary,MultiUploadCloudinary}




















// const removeFromCloudinary = async (public_id) => {
//     await cloudinary.v2.uploader.destroy(public_id , (error , result) => {
//         console.log(result , error);
//     })
// }