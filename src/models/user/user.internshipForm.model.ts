import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let user_internship_form_schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    internship_id: {
        type: String,
        default: ''
    },
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

    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let user_internship_form_model = mongoose.model('internship_form', user_internship_form_schema, 'internship_form');

export default user_internship_form_model;