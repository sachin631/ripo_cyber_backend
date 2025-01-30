
const adminAuth = {
    register_success: 'admin register successfully',
    register_failed: 'admin register failed',
    admin_exist: 'admin already exist with this email or phone number',
    admin_not_exist: 'admin not exist with this email',
    password_incorrect: 'password is incorrect',
    login_success: 'admin login successfully',
    logout_success: 'admin logout successfully',
    otp_send_success: 'otp send successfully',
    invalid_otp: 'invalid otp',
    valid_otp: 'otp verified successfully',
    profile_update_failed: 'profile update failed',
    profile_update_success: 'profile updated successfully',
    admin_not_found: 'admin not found',
    admin_found_success: 'admin found successfully'
}

const admin_user = {
    user_not_found: 'user not found',
    user_list_fetched_success: 'user list fetched successfully',
    user_detail_fetched_success: 'user detail fetched successfully',
    user_deleted_success: 'user deleted successfully'
}

const admin_common = {
    common_update_err: 'Common content update error',
    common_update_success: 'Common content update successfully',
    common_fetched_success: 'Common content fetched successfully',
    common_fetched_err: 'Error while fetched common content ',
    question_store_success: 'Question store successfully',
    question_exist: "Question already exist",
    question_create_failed: 'Question create failed',
    question_not_found: "Question not found",
    question_fetched: 'Question fetched successfully',
    question_update_failed: 'Question update failed',
    question_update_success: 'Question update successfully',
    delete_faq_success: 'faq deleted successfully',
    delete_faq_error: 'Error while deleting faq',
}

const admin_home = {
    home_content_update_success: 'Home content updated successfully',
    home_content_update_failed: 'Home content update failed',
    home_content_fetched_success: 'Home content fetched successfully',
    home_content_fetched_err: 'Error while fetched home content ',
}

const youCareer = {
    you_career_update_success: 'You career updated successfully',
    you_career_update_failed: 'You career update failed',
    you_career_fetched_success: 'You career fetched successfully',
    you_career_fetched_err: 'Error while fetched you career ',
}

const admin_usecase = {
    usecase_create_successfully: 'your usecase created successfully',
    usecase_create_error: 'error while creating usecase',
    usecase_not_found: 'invalid useCase, usecase not found',
    usecase_found_success: 'usecase found successfully',
    usecase_update_success: 'usecase updated successfully',
    usecase_update_error: 'error while updating usecase',
    usecase_delete_success: 'usecase deleted successfully',
    usecase_delete_error: 'error while deleting usecase',

    service_create_successfully: 'your service created successfully',
    service_create_error: 'error while creating service',
    why_us_create_successfully: 'your why us created successfully',
    why_us_create_error: 'error while creating why us',
    our_service_fetched_successfully: 'our service fetched successfully',
    why_us_fetched_successfully: 'why us fetched successfully',
    usecase_fetched_successfully: 'usecase fetched successfully',
    service_not_found: 'invalid service, service not found',
    service_update_error: 'error while updating service',
    service_update_success: 'service updated successfully',
    why_us_not_found: 'invalid why us, why us not found',
    why_us_update_error: 'error while updating why us',
    why_us_update_success: 'why us updated successfully',
    service_delete_error: 'error while deleting service',
    service_delete_success: 'service deleted successfully',
    why_us_delete_error: 'error while deleting why us',
    why_us_delete_success: 'why us deleted successfully',
    something_went_wrong: 'something went wrong',
}

const admin_contact_us = {
    contact_us_retrived_success: 'contact us retrieved successfully',
    contact_us_retrived_error: 'error while retrieving contact us',
    contact_us_delete_success: 'contact us deleted successfully',
    contact_us_delete_error: 'error while deleting contact us',
    contact_us_not_found: 'invalid contact us, contact us not found',
}
const internship_category = {
    internship_category_create_success: 'internship category created successfully',
    internship_category_create_error: 'error while creating internship category',
    internship_category_update_success: 'internship category updated successfully',
    internship_category_update_error: 'error while updating internship category',
    internship_category_delete_success: 'internship category deleted successfully',
    internship_category_delete_error: 'error while deleting internship category',
    intership_category_already_exist: 'internship category already exist',
    internship_category_fetched_successfully: 'internship category fetched successfully',
    internship_category_fetched_error: 'error while fetching internship category',
    internship_category_not_found: 'invalid internship category, internship category not found',
    err_while_update_category_details: 'error while updating internship category details',
    category_details_updated_successfully: 'category details updated successfully',
    err_while_fetch_category_details: 'error while fetching internship category details',
    category_details_fetched_successfully: 'category details fetched successfully'
}

export { adminAuth, admin_user, admin_common, admin_home, youCareer, admin_usecase, admin_contact_us, internship_category }