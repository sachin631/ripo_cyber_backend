import statusCodes from "../../constant/statusCodes";
import { ApiResponse } from "../../utils/interface.utils";
import { showResponse } from "../../utils/response.utils";
import { admin_common, adminAuth } from "../../constant/responseMessages/admin.response.message";
import admin_common_model from "../../models/admin/admin.common.model";
import admin_faq_model from "../../models/admin/admin.faq.model";
import { ADMIN_STATUS } from "../../constant/app.constant";


const admin_common_handler = {

    privacy_terms_about: async (data: any): Promise<ApiResponse> => {
        const { privacy_policy, terms_condition, about_us } = data;
        const update_obj: any = {};
        if (privacy_policy) {
            update_obj.privacy_policy = privacy_policy;
        }
        if (terms_condition) {
            update_obj.terms_condition = terms_condition
        }
        if (about_us) {
            update_obj.about_us = about_us
        }
        const res = await admin_common_model.findOneAndUpdate({}, update_obj, {upsert: true, new: true });
        if (!res) {
            return showResponse(false, admin_common.common_update_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.common_update_success, res, statusCodes.SUCCESS);
    },

    privacy_terms_about_detail: async (): Promise<ApiResponse> => {
        const res = await admin_common_model.findOne({});
        if (!res) {
            return showResponse(false, admin_common.common_fetched_err, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.common_fetched_success, res, statusCodes.SUCCESS);
    },

    create_faq: async (data: any): Promise<ApiResponse> => {
        const { question, answer } = data;
        const is_que_exist = await admin_faq_model.findOne({ question: question });
        if (is_que_exist) {
            return showResponse(false, admin_common.question_exist, null, statusCodes.API_ERROR);
        }
        const res = await admin_faq_model.create({
            question,
            answer
        });
        if (!res) {
            return showResponse(false, admin_common.question_create_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.question_store_success, res, statusCodes.SUCCESS);
    },

    faq_listing: async (): Promise<ApiResponse> => {
        const faq = await admin_faq_model.find({});
        if (faq.length == 0) {
            return showResponse(false, admin_common.question_not_found, faq, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.question_fetched, faq, statusCodes.SUCCESS)
    },

    update_faq: async (data: any): Promise<ApiResponse> => {
        const { question_id, question, answer } = data;
        const is_que_exist = await admin_faq_model.findOne({ _id: question_id });
        if (!is_que_exist) {
            return showResponse(false, admin_common.question_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_faq_model.updateOne({ _id: question_id }, {
            question,
            answer
        }, { new: true });

        if (!res) {
            return showResponse(false, admin_common.question_update_failed, null, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.question_update_success, res, statusCodes.SUCCESS);
    },
    delete_faq: async (data: any): Promise<ApiResponse> => {
        const { question_id } = data;
        const is_que_exist = await admin_faq_model.findOne({ _id: question_id, status: ADMIN_STATUS.ACTIVE });
        if (!is_que_exist) {
            return showResponse(false, admin_common.question_not_found, null, statusCodes.API_ERROR);
        }
        const res = await admin_faq_model.findOneAndUpdate({ _id: question_id, status: ADMIN_STATUS.ACTIVE }, { status: ADMIN_STATUS.DELETED }, { new: true });
        if (!res) {
            return showResponse(false, admin_common.delete_faq_error, res, statusCodes.API_ERROR);
        }
        return showResponse(true, admin_common.delete_faq_success, res, statusCodes.SUCCESS);

    }
//

}
export default admin_common_handler;