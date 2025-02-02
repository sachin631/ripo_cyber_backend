import { DATA_TYPE, USER_STATUS } from "../../constant/app.constant";
import { admin_usecase } from "../../constant/responseMessages/admin.response.message";
import { user_common } from "../../constant/responseMessages/user.response.message";
import statusCodes from "../../constant/statusCodes";
import admin_contactUs_model from "../../models/admin/admin.contactUs.model";
import admin_our_services_model from "../../models/admin/admin.ourServices.model";
import admin_use_case_model from "../../models/admin/admin.useCase.model";
import admin_why_us_model from "../../models/admin/admin.whyUs.model";
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


}

export default user_common_handler