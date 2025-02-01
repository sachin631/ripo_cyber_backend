import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_usecase } from "../../constant/responseMessages/admin.response.message";
import cloudinaryUploaderr from "../../middlewares/cloudnary";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import { ADMIN_STATUS, DATA_TYPE } from "../../constant/app.constant";
import admin_our_services_model from "../../models/admin/admin.ourServices.model";
import admin_why_us_model from "../../models/admin/admin.whyUs.model";


const admin_useCase_handler = {

    create_usecase: async (data: any, image: any): Promise<ApiResponse> => {
        const { name, description, data_type } = data;
        console.log(data);
        const filePath = image?.path;
        const image_upload: any = await cloudinaryUploaderr(filePath);

        const url = image_upload?.url;
        const public_id = image_upload?.public_id;

        if (data_type == DATA_TYPE.OUR_SERVICES) {
console.log('our service')
            const res = await admin_our_services_model.create({
                name,
                description,
                image: {
                    public_id: public_id,
                    url: url
                }
            });
            if (!res) {
                return showResponse(false, admin_usecase.service_create_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.service_create_successfully, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.WHY_US) {
            console.log('why us')
            const res = await admin_why_us_model.create({
                name,
                description,
                image: {
                    public_id: public_id,
                    url: url
                }
            });
            if (!res) {
                return showResponse(false, admin_usecase.why_us_create_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.why_us_create_successfully, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.USE_CASE) {
            console.log('yes usecase')
            const res = await admin_use_case_model.create({
                name,
                description,
                image: {
                    public_id: public_id,
                    url: url
                }
            });
            if (!res) {
                return showResponse(false, admin_usecase.usecase_create_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.usecase_create_successfully, res, statusCodes.SUCCESS);
        }

        return showResponse(false, admin_usecase.something_went_wrong, null, statusCodes.API_ERROR);
    },

    usecase_listing: async (page: number = 1, limit: number = 10, search_key: string = '', data_type?: any): Promise<ApiResponse> => {
        page = Number(page);
        limit = Number(limit);

        if (data_type == DATA_TYPE.OUR_SERVICES) {
            const use_cases = await admin_our_services_model.aggregate([
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
            const totalCount = await admin_our_services_model.countDocuments({
                status: { $ne: ADMIN_STATUS.DELETED },
                name: {
                    $regex: search_key
                }
            });
            const totalPages = Math.ceil(totalCount / limit);
            const currentPage = page;

            return showResponse(true, admin_usecase.our_service_fetched_successfully, { totalCount, totalPages, currentPage, use_cases }, statusCodes.SUCCESS);
        }


        if (data_type == DATA_TYPE.WHY_US) {
            const use_cases = await admin_why_us_model.aggregate([
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
            const totalCount = await admin_why_us_model.countDocuments({
                status: { $ne: ADMIN_STATUS.DELETED },
                name: {
                    $regex: search_key
                }
            });
            const totalPages = Math.ceil(totalCount / limit);
            const currentPage = page;

            return showResponse(true, admin_usecase.why_us_fetched_successfully, { totalCount, totalPages, currentPage, use_cases }, statusCodes.SUCCESS);
        }


        if (data_type == DATA_TYPE.USE_CASE) {
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

            return showResponse(true, admin_usecase.usecase_fetched_successfully, { totalCount, totalPages, currentPage, use_cases }, statusCodes.SUCCESS);
        }

        return showResponse(false, admin_usecase.something_went_wrong, null, statusCodes.API_ERROR);

    },

    update_usecase: async (data: any, image: any): Promise<ApiResponse> => {
        const { usecase_id, name, description, data_type } = data;

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

        if (data_type == DATA_TYPE.OUR_SERVICES) {
            const is_usecase_exist = await admin_our_services_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
            if (!is_usecase_exist) {
                return showResponse(false, admin_usecase.service_not_found, null, statusCodes.API_ERROR);
            }
            const res = await admin_our_services_model.findOneAndUpdate({ _id: usecase_id }, updated_obj, { new: true });
            if (!res) {
                return showResponse(false, admin_usecase.service_update_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.service_update_success, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.WHY_US) {
            const is_usecase_exist = await admin_why_us_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
            if (!is_usecase_exist) {
                return showResponse(false, admin_usecase.why_us_not_found, null, statusCodes.API_ERROR);
            }
            const res = await admin_why_us_model.findOneAndUpdate({ _id: usecase_id }, updated_obj, { new: true });
            if (!res) {
                return showResponse(false, admin_usecase.why_us_update_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.why_us_update_success, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.USE_CASE) {
            const is_usecase_exist = await admin_use_case_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
            if (!is_usecase_exist) {
                return showResponse(false, admin_usecase.usecase_not_found, null, statusCodes.API_ERROR);
            }
            const res = await admin_use_case_model.findOneAndUpdate({ _id: usecase_id }, updated_obj, { new: true });
            if (!res) {
                return showResponse(false, admin_usecase.usecase_update_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.usecase_update_success, res, statusCodes.SUCCESS);
        }

        return showResponse(false, admin_usecase.usecase_update_error, null, statusCodes.API_ERROR);

    },

    delete_usecase: async (usecase_id: string, data_type: number): Promise<ApiResponse> => {
        if (data_type == DATA_TYPE.OUR_SERVICES) {
            const is_usecase_exist = await admin_our_services_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
            if (!is_usecase_exist) {
                return showResponse(false, admin_usecase.service_not_found, null, statusCodes.API_ERROR);
            }
            const res = await admin_our_services_model.findOneAndUpdate({ _id: usecase_id }, { status: ADMIN_STATUS.DELETED }, { new: true });
            if (!res) {
                return showResponse(false, admin_usecase.service_delete_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.service_delete_success, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.WHY_US) {
            const is_usecase_exist = await admin_why_us_model.findOne({ _id: usecase_id, status: { $ne: ADMIN_STATUS.DELETED } });
            if (!is_usecase_exist) {
                return showResponse(false, admin_usecase.why_us_not_found, null, statusCodes.API_ERROR);
            }
            const res = await admin_why_us_model.findOneAndUpdate({ _id: usecase_id }, { status: ADMIN_STATUS.DELETED }, { new: true });
            if (!res) {
                return showResponse(false, admin_usecase.why_us_delete_error, null, statusCodes.API_ERROR);
            }
            return showResponse(true, admin_usecase.why_us_delete_success, res, statusCodes.SUCCESS);
        }

        if (data_type == DATA_TYPE.USE_CASE) {
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

        return showResponse(false, admin_usecase.usecase_delete_error, null, statusCodes.API_ERROR);
    }



}
export default admin_useCase_handler;