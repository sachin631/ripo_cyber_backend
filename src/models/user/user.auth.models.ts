import mongoose from "mongoose";
import { USER_STATUS } from "../../constant/app.constant";

let user_schema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    phone_number: {
        type: String,
        default: ''
    },
    profile_pic: {
        public_id: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        }
    },
    isVerfied: {
        type: String,
        default: false
    },
    otp: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: USER_STATUS.ACTIVE
    }
}, { timestamps: true });

let user_model = mongoose.model('users', user_schema, 'users');

export default user_model;