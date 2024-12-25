import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_home_schema = new mongoose.Schema({
    description: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_home_model = mongoose.model('home', admin_home_schema, 'home');

export default admin_home_model;
