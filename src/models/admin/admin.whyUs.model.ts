import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_why_us_schema = new mongoose.Schema({
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

let admin_why_us_model = mongoose.model('why_us', admin_why_us_schema, 'why_us');

export default admin_why_us_model;
