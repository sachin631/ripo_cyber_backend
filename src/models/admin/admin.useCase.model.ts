import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_use_case_schema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        public_id: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    status: {
        type: Number,
        default: ADMIN_STATUS.ACTIVE
    }
}, { timestamps: true });

let admin_use_case_model = mongoose.model('usecase', admin_use_case_schema, 'usecase');

export default admin_use_case_model;
