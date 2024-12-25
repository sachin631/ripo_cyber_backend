import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_your_carrer_schema = new mongoose.Schema({
    description: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_your_carrer_model = mongoose.model('your_carrer', admin_your_carrer_schema, 'your_carrer');

export default admin_your_carrer_model;
