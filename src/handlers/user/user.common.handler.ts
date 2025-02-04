import { ADMIN_STATUS, DATA_TYPE, USER_STATUS } from "../../constant/app.constant";
import { admin_common, admin_usecase, admin_user, internship_category, youCareer } from "../../constant/responseMessages/admin.response.message";
import { user_common } from "../../constant/responseMessages/user.response.message";
import statusCodes from "../../constant/statusCodes";
import admin_common_model from "../../models/admin/admin.common.model";
import admin_contactUs_model from "../../models/admin/admin.contactUs.model";
import admin_internship_category__model from "../../models/admin/admin.internshipCategory.model";
import admin_internship_category__details_model from "../../models/admin/admin.internshipDetails.model";
import admin_our_services_model from "../../models/admin/admin.ourServices.model";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import admin_why_us_model from "../../models/admin/admin.whyUs.model";
import admin_work_together_model from "../../models/admin/admin.workTogether.model";
import admin_your_carrer_model from "../../models/admin/admin.youCarrer.model";
import user_model from "../../models/user/user.auth.models";
import { ApiResponse } from "../../utils/interface.utils"
import { showResponse } from "../../utils/response.utils";

const user_common_handler = {
    contact_us: async (data: any): Promise<ApiResponse> => {
        const { name, email, phone_number, message } = data;
        const contact_us = await admin_contactUs_model.create({ name, email, phone_number, message });
        if (!contact_us) {
            return showResponse(false, user_common.contact_us_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, user_common.contact_us_success, null, statusCodes.SUCCESS);
    },

    usecase_listing: async (data_type?: any): Promise<ApiResponse> => {

        if (data_type == DATA_TYPE.OUR_SERVICES) {
            const use_cases = await admin_our_services_model.aggregate([
                {
                    $match: {
                        status: { $eq: USER_STATUS.ACTIVE },

                    }
                },

            ]);

            return showResponse(true, admin_usecase.our_service_fetched_successfully, { use_cases }, statusCodes.SUCCESS);
        }


        if (data_type == DATA_TYPE.WHY_US) {
            const use_cases = await admin_why_us_model.aggregate([
                {
                    $match: {
                        status: { $eq: USER_STATUS.ACTIVE },

                    }
                },


            ]);



            return showResponse(true, admin_usecase.why_us_fetched_successfully, { use_cases }, statusCodes.SUCCESS);
        }


        if (data_type == DATA_TYPE.USE_CASE) {
            const use_cases = await admin_use_case_model.aggregate([
                {
                    $match: {
                        status: { $eq: USER_STATUS.ACTIVE },

                    }
                },

            ]);

            return showResponse(true, admin_usecase.usecase_fetched_successfully, { use_cases }, statusCodes.SUCCESS);
        }

        return showResponse(false, admin_usecase.something_went_wrong, null, statusCodes.API_ERROR);

    },

    privacy_terms_about_detail: async (): Promise<ApiResponse> => {
        const res = await admin_common_model.findOne({});
        if (!res) {
            return showResponse(false, admin_common.common_fetched_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.common_fetched_success, res, statusCodes.SUCCESS);
    },

    faq_listing: async (): Promise<ApiResponse> => {
        const faq = await admin_common_model.find({ status: ADMIN_STATUS.ACTIVE });
        if (faq.length == 0) {
            return showResponse(false, admin_common.question_not_found, faq, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.question_fetched, faq, statusCodes.SUCCESS)
    },

    work_together_detail: async (): Promise<ApiResponse> => {
        const res = await admin_work_together_model.findOne({});
        if (!res) {
            return showResponse(false, admin_common.workTogether_fetched_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.workTogether_fetched_success, res, statusCodes.SUCCESS);
    },

    internship_category_listing: async (): Promise<ApiResponse> => {

        const internship_categoryy = await admin_internship_category__model.aggregate([
            {
                $match: {
                    status: { $eq: ADMIN_STATUS.ACTIVE },

                }
            },


        ]);

        return showResponse(true, internship_category.internship_category_fetched_successfully, internship_categoryy, statusCodes.SUCCESS);
    },

    get_internship_details: async (internship_category_id: string): Promise<ApiResponse> => {
        const is_category_exist = await admin_internship_category__model.findOne({ _id: internship_category_id, status: { $eq: ADMIN_STATUS.ACTIVE } });
        console.log(is_category_exist, 'is_category_exist');
        if (!is_category_exist) {
            return showResponse(false, internship_category.internship_category_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_internship_category__details_model.findOne({ category_id: internship_category_id, status: ADMIN_STATUS.ACTIVE });
        if (!res) {
            return showResponse(false, internship_category.err_while_fetch_category_details, null, statusCodes.API_ERROR);
        }
        return showResponse(true, internship_category.category_details_fetched_successfully, res, statusCodes.SUCCESS);
    },

    detail: async (user_id: any): Promise<ApiResponse> => {
        const user_list = await user_model.findOne({ _id: user_id, status: { $eq: USER_STATUS.ACTIVE } });
        if (!user_list) {
            return showResponse(false, admin_user.user_not_found, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_user.user_detail_fetched_success, user_list, statusCodes.SUCCESS);
    },

    career_detail: async (): Promise<ApiResponse> => {
        const res = await admin_your_carrer_model.findOne({});
        if (!res) {
            return showResponse(false, youCareer.you_career_fetched_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, youCareer.you_career_fetched_success, res, statusCodes.SUCCESS);
    },


}

export default user_common_handler