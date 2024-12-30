import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_usecase } from "../../constant/responseMessages/admin.response.message";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import { ADMIN_STATUS } from "../../constant/app.constant";


const admin_useCase_handler = {

    create_usecase: async (data: any, image: any): Promise<ApiResponse> => {
        const { name, description } = data;
        const filePath = image?.path;
        const image_upload: any = await cloudinaryUploaderr(filePath);
        const url = image_upload?.url;
        const public_id = image_upload?.public_id;

        const res = admin_use_case_model.create({
            name,
            description,
            image: {
                public_id: public_id,
                url: url
            }
        });

        if (!res) {
            return showResponse(false, admin_usecase.usecase_create_successfully, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_usecase.usecase_create_error, res, statusCodes.SUCCESS);
    },

    usecase_listing: async (page: number = 1, limit: number = 10, search_key: string = ''): Promise<ApiResponse> => {
        page = Number(page);
        limit = Number(limit);
        const use_cases = await admin_use_case_model.aggregate([
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

       
        return showResponse(true, admin_usecase.usecase_create_successfully, { totalCount, totalPages, currentPage, use_cases }, statusCodes.SUCCESS);
    },

    update_usecase: async (data: any, image: any): Promise<ApiResponse> => {
        const { usecase_id, name, description } = data;
        const is_usecase_exist = await admin_use_case_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_usecase_exist) {
            return showResponse(false, admin_usecase.usecase_not_found, null, statusCodes.API_ERROR);
        }
        const updated_obj: any = {};
        if (name) {
            updated_obj.name = name;
        }
        if (description) {
            updated_obj.description = description;
        }
        if (image) {
            const filePath = image?.path;
            const image_upload: any = await cloudinaryUploaderr(filePath);
            const url = image_upload?.url;
            const public_id = image_upload?.public_id;
            updated_obj.image = {
                public_id,
                url
            }
        }

        const res = await admin_use_case_model.findOneAndUpdate({ _id: usecase_id }, updated_obj, { new: true });
        if (!res) {
            return showResponse(false, admin_usecase.usecase_update_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_usecase.usecase_update_success, res, statusCodes.SUCCESS);
    },

    delete_usecase: async (usecase_id: string): Promise<ApiResponse> => {
        const is_usecase_exist = await admin_use_case_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
        if (!is_usecase_exist) {
            return showResponse(false, admin_usecase.usecase_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_use_case_model.findOneAndUpdate({ _id: usecase_id }, { status: ADMIN_STATUS.DELETED }, { new: true });
        if (!res) {
            return showResponse(false, admin_usecase.usecase_delete_error, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_usecase.usecase_delete_success, res, statusCodes.SUCCESS);
    }



}
export default admin_useCase_handler;