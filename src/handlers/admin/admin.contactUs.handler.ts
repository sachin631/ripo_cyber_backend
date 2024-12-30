import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_contact_us, admin_usecase } from "../../constant/responseMessages/admin.response.message";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import { ADMIN_STATUS } from "../../constant/app.constant";
import admin_contactUs_model from "../../models/admin/admin.contactUs.model";


const admin_useCase_handler = {


    contactUs_listing: async (page: number = 1, limit: number = 10, search_key: string = ''): Promise<ApiResponse> => {
        page = Number(page);
        limit = Number(limit);
        const contact_us = await admin_contactUs_model.aggregate([
            {
                $match: {
                    status: { $ne: ADMIN_STATUS.DELETED },
                    name: {
                        $regex: search_key
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
            }

        ]);
        const totalCount = await admin_use_case_model.countDocuments({
            status: { $ne: ADMIN_STATUS.DELETED },
            name: {
                $regex: search_key
            }
        });
        const totalPages = Math.ceil(totalCount / limit);
        const currentPage = page;

        return showResponse(true, admin_contact_us.contact_us_retrived_success, { totalCount, totalPages, currentPage, contact_us }, statusCodes.SUCCESS);
    },

    contactUs_detail: async (contact_us_id: string): Promise<ApiResponse> => {
        const is_contact_exist = await admin_contactUs_model.findOne({ _id: contact_us_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_contact_exist) {
            return showResponse(false, admin_contact_us.contact_us_not_found, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_contact_us.contact_us_retrived_success, is_contact_exist, statusCodes.SUCCESS);
    },


    delete_contactUs: async (contact_us_id: string): Promise<ApiResponse> => {
        const is_contact_exist = await admin_contactUs_model.findOne({ _id: contact_us_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_contact_exist) {
            return showResponse(false, admin_contact_us.contact_us_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_contactUs_model.findOneAndUpdate({ _id: contact_us_id }, { status: ADMIN_STATUS.DELETED }, { new: true });
        if (!res) {
            return showResponse(false, admin_contact_us.contact_us_delete_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_contact_us.contact_us_delete_success, res, statusCodes.SUCCESS);
    }



}
export default admin_useCase_handler;