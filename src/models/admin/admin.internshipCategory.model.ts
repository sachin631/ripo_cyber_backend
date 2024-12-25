import mongoose from "mongoose";
import { ADMIN_STATUS } from "../../constant/app.constant";

let admin_internship_category_schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_internship_category__model = mongoose.model('internship_category', admin_internship_category_schema, 'internship_category');

export default admin_internship_category__model;
