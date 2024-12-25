const express = require ("express");
const Route=express.Router();

//user router's
import user_auth_router from "./users/users.auth.route"
Route.use('/user/auth',user_auth_router);

//admin router's
import admin_auth_router from "./admin/admin.auth.route";
import admin_user_router from "./admin/admin.user.route";
import admin_common_router from './admin/admin.common.route';

Route.use('/admin/auth',admin_auth_router);
Route.use('/admin/user',admin_user_router);
Route.use('/admin/common',admin_common_router);

export default Route
