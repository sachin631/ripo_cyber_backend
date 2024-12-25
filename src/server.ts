const express = require("express");
const app = express();
require('dotenv').config({});
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express')
import { ADMIN_STATUS } from "./constant/app.constant";
import { hashPassword } from "./helper/common.helper";
import admin_model from "./models/admin/admin.auth.model";
import router from "./routes/index";
const path = require('path')
require('./connection/connecttion');
//
let PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookie_parser());

// swagger setup
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use("/swagger.json", express.static(path.join(__dirname, '..', 'public', 'swagger/swagger.json')));

app.use("/api-docs", swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger/swagger.json",
            displayRequestDuration: true,
            persistAuthorization: true,
        },

    })
);

//create admin account
const adminFunction=async()=>{
    const hashed=await hashPassword('123456')
    const admin_cred:any={
        name:'admin',
        email:'admin@yopmail.com',
        password:hashed
    }
    const is_admin=await admin_model.findOne({email:admin_cred.email,status:ADMIN_STATUS.ACTIVE});
    if(is_admin){
        return;
    }
    await admin_model.create(admin_cred);
}
adminFunction();



// Main router
app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});