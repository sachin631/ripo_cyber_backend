import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_work_together_schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    fb_link: {
        type: String,
        default: ''
    },
    insta_link: {
        type: String,
        default: ''
    },
    twitter_link: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_work_together_model = mongoose.model('work_together', admin_work_together_schema, 'work_together');

export default admin_work_together_model;
