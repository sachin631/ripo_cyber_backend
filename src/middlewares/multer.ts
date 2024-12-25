// const multer=require("multer");
import multer from 'multer'

const storage=multer.diskStorage({
    destination:(req:any,file:any,cb:any)=>{
        cb(null,"./uploads");
    },

    filename:(req:any,file:any,cb:any)=>{
        cb(null,`sachinsangwan.${file.originalname}`);
    }
});

const fileFilter=(req:any,file:any,cb:any)=>{
    if(file.mimetype!=="image/jpg" && file.mimetype!=="image/jpeg" && file.mimetype!=="image/png"){
        cb(new Error("only jpeg png and jpeg is aloowed"),false);
    }else{
        cb(null,true);
    }
}

const upload=multer({
    storage:storage,
    fileFilter:fileFilter
});

// module.exports=upload;
export default upload