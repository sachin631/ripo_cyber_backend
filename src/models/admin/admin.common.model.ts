import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_common = new mongoose.Schema({
    privacy_policy: {
        type: String,
        default: ''
    },
    terms_condition: {
        type: String,
        default: ''
    },
    about_us: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_common_model = mongoose.model('common', admin_common, 'common');

export default admin_common_model;