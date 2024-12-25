const mongoose=require('mongoose');
const mongodb_uri=process.env.MONGODBURL;
(async()=>{
    try{
        console.log('hi',mongodb_uri)
        await mongoose.connect(`${mongodb_uri}`);
        console.log('mongodb connected successfully');
    }catch(err:any){
        console.log('mongodb connection failed',err.message);
    }
    
})();