import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_usecase, internship_category } from "../../constant/responseMessages/admin.response.message";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import { ADMIN_STATUS } from "../../constant/app.constant";
import admin_internship_category__model from "../../models/admin/admin.internshipCategory.model";
import admin_internship_category__details_model from "../../models/admin/admin.internshipDetails.model";


const admin_internship_category_handler = {

    create_internship_category: async (data: any): Promise<ApiResponse> => {
        const { name } = data;
        const is_name_exist = await admin_internship_category__model.findOne({ name, status: { $ne: ADMIN_STATUS.DELETED } });
        if (is_name_exist) {
            return showResponse(false, internship_category.intership_category_already_exist, null, statusCodes.API_ERROR);
        }
        const res = await admin_internship_category__model.create(data);

        if (!res) {
            return showResponse(false, internship_category.internship_category_create_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.internship_category_create_success, res, statusCodes.SUCCESS);
    },

    internship_category_listing: async (page: number = 1, limit: number = 10, search_key: string = ''): Promise<ApiResponse> => {
        page = Number(page);
        limit = Number(limit);
        const internship_categoryy = await admin_internship_category__model.aggregate([
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
        const totalCount = await admin_internship_category__model.countDocuments({
            status: { $ne: ADMIN_STATUS.DELETED },
            name: {
                $regex: search_key
            }
        });
        const totalPages = Math.ceil(totalCount / limit);
        const currentPage = page;
        return showResponse(true, internship_category.internship_category_fetched_successfully, { totalCount, totalPages, currentPage, internship_categoryy }, statusCodes.SUCCESS);
    },

    update_internship_category: async (data: any): Promise<ApiResponse> => {
        const { internship_category_id, name } = data;
        const is_category_exist = await admin_internship_category__model.findOne({ _id: internship_category_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_category_exist) {
            return showResponse(false, internship_category.internship_category_not_found, null, statusCodes.API_ERROR);
        }
        const updated_obj: any = {};
        if (name) {
            updated_obj.name = name;
        }

        const res = await admin_internship_category__model.findOneAndUpdate({ _id: internship_category_id }, updated_obj, { new: true });
        if (!res) {
            return showResponse(false, internship_category.internship_category_update_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.internship_category_update_success, res, statusCodes.SUCCESS);
    },

    delete_category: async (internship_category_id: string): Promise<ApiResponse> => {
        const is_category_exist = await admin_internship_category__model.findOne({ _id: internship_category_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_category_exist) {
            return showResponse(false, internship_category.internship_category_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_internship_category__model.findOneAndUpdate({ _id: internship_category_id }, { status: ADMIN_STATUS.DELETED }, { new: true });
        if (!res) {
            return showResponse(false, internship_category.internship_category_delete_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.internship_category_delete_success, res, statusCodes.SUCCESS);
    },

    update_internship_details: async (data: any): Promise<ApiResponse> => {
        const { internship_category_id, description } = data;
        const is_category_exist = await admin_internship_category__model.findOne({ _id: internship_category_id, status: { $eq: ADMIN_STATUS.ACTIVE } });
        if (!is_category_exist) {
            return showResponse(false, internship_category.internship_category_not_found, null, statusCodes.API_ERROR);
        }
        const updated_obj: any = {
            description
        };

        const res = await admin_internship_category__details_model.findOneAndUpdate({category_id: internship_category_id}, updated_obj, { upsert: true, new: true });
        if (!res) {
            return showResponse(false, internship_category.err_while_update_category_details, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.category_details_updated_successfully, res, statusCodes.SUCCESS);
    },

    get_internship_details: async (internship_category_id: string): Promise<ApiResponse> => {
        const is_category_exist = await admin_internship_category__model.findOne({ _id: internship_category_id, status: { $eq: ADMIN_STATUS.ACTIVE } });
        console.log(is_category_exist, 'is_category_exist');
        if (!is_category_exist) {
            return showResponse(false, internship_category.internship_category_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_internship_category__details_model.findOne({category_id:internship_category_id,status:ADMIN_STATUS.ACTIVE});
        if (!res) {
            return showResponse(false, internship_category.err_while_fetch_category_details, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.category_details_fetched_successfully, res, statusCodes.SUCCESS);
    },



}
export default admin_internship_category_handler;