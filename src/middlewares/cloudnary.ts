import { showResponse } from "../utils/response.utils";

import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require("cloudinary").v2;
const fs=require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploaderr =async (filePath:any)=> {
  try {
    if (!filePath) {
        return showResponse(false,'FILE PATH NOT FOUND',null,400);
    }
    const cloudRes = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    //delete file from server after uploded on cloudinary
    fs.unlinkSync(filePath);
    
    return cloudRes;

  } catch (error:any) {
    //delete the file from server if there is any error while uploding on cloudinary
    fs.unlinkSync(filePath);
    return showResponse(false,'file not upload on cloudinary please try again',error.message,500)
  }
}

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { resource_type: "auto" }
);


// module.exports=cloudinaryUploaderr;
export default cloudinaryUploaderr;