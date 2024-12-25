import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let contact_us_schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone:{
        type: String,
        default: ''
    },
    message:{
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_contactUs_model = mongoose.model('contact_us', contact_us_schema, 'contact_us');

export default admin_contactUs_model;


