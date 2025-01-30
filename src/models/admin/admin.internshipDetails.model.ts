import mongoose from "mongoose";
import { ADMIN_STATUS } from "../../constant/app.constant";

let admin_internship_details_schema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'internship_category'
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_internship_category__details_model = mongoose.model('internship_detail', admin_internship_details_schema, 'internship_detail');

export default admin_internship_category__details_model;
