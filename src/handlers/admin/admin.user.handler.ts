import { ADMIN_STATUS, USER_STATUS } from "../../constant/app.constant";
import { userAuth } from "../../constant/responseMessages/user.response.message";
import statusCodes from "../../constant/statusCodes";
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword } from "../../helper/common.helper";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import { nodemailer_email } from "../../middlewares/nodeMailer";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import admin_model from "../../models/admin/admin.auth.model";
import { admin_user, adminAuth } from "../../constant/responseMessages/admin.response.message";
import user_model from "../../models/user/user.auth.models";
import { Security } from "tsoa";


const admin_user_handler = {

    listing: async (page: any = 1, limit: any = 10, search_key: any = ''): Promise<ApiResponse> => {
        page = Number(page);
        limit = Number(limit);
        const user_list = await user_model.aggregate([
            {
                $match: {
                    status: { $ne: USER_STATUS.DELETED },
                    name: {
                        $regex: search_key,
                        $options: 'i'
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },

        ]);
        const totalCount = await user_model.countDocuments({
            status: { $ne: USER_STATUS.DELETED },
            name: {
                $regex: search_key,
                $options: 'i'
            }
        });
        const totalPages = Math.ceil(totalCount / limit);
        const currentPage = page;

        return showResponse(true, admin_user.user_list_fetched_success, { user_list, totalCount, totalPages, currentPage }, statusCodes.SUCCESS);
    },

    detail: async (user_id: any): Promise<ApiResponse> => {
        const user_list = await user_model.findOne({ _id: user_id, status: { $ne: USER_STATUS.DELETED } });
        if (!user_list) {
            return showResponse(false, admin_user.user_not_found, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_user.user_detail_fetched_success, user_list, statusCodes.SUCCESS);
    },

    delete: async (user_id: any): Promise<ApiResponse> => {
        const is_user_exist = await user_model.findOne({ _id: user_id, status: { $ne: USER_STATUS.DELETED } });
        if (!is_user_exist) {
            return showResponse(false, admin_user.user_not_found, null, statusCodes.API_ERROR);
        }
        const user = await user_model.findOneAndUpdate({ _id: user_id }, { status: USER_STATUS.DELETED }, { new: true });
        if (!user) {
            return showResponse(false, admin_user.user_not_found, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_user.user_deleted_success, user, statusCodes.SUCCESS);
    },

}

export default admin_user_handler;