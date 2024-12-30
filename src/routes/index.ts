const express = require ("express");
const Route=express.Router();

//user router's
import user_auth_router from "./users/users.auth.route";
import user_common_router from "./users/users.common.route";

Route.use('/user/auth',user_auth_router);
Route.use('/user/common',user_common_router);


//admin router's
import admin_auth_router from "./admin/admin.auth.route";
import admin_user_router from "./admin/admin.user.route";
import admin_common_router from './admin/admin.common.route';
import admin_home_router from './admin/admin.home.route';
import admin_your_career_router from './admin/admin.yourCareer.route';
import admin_useCase from './admin/admin.useCase.route';
import admin_contactUs_router from './admin/admin.contactUs.route';
import admin_internship_category_router from './admin/admin.internship.category.route';

Route.use('/admin/auth',admin_auth_router);
Route.use('/admin/user',admin_user_router);
Route.use('/admin/common',admin_common_router);
Route.use('/admin/home',admin_home_router);
Route.use('/admin/youCareer',admin_your_career_router);
Route.use('/admin/useCase',admin_useCase);
Route.use('/admin/contactUs',admin_contactUs_router);
Route.use('/admin/internship/category',admin_internship_category_router);

export default Route
