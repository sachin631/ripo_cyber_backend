import mongoose from "mongoose";
import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";

let admin_our_services_schema = new mongoose.Schema({
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

let admin_our_services_model = mongoose.model('our_services', admin_our_services_schema, 'our_services');

export default admin_our_services_model;
