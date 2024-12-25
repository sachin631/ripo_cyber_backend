import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_faq = new mongoose.Schema({
    question: {
        type: String,
        default: ''
    },
    answer: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_faq_model = mongoose.model('faq', admin_faq, 'faq');

export default admin_faq_model;