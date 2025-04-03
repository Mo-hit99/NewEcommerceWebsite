import express from 'express'
import {AdminUserGetDataAll,AdminUserGetDataById,AdminUserLogin,AdminUserRegister,AdminUserVerify,AdminUserResetPassword,AdminUserForgotPassword} from '../Controller/AdminUserData_Controller.js'
export const Admin_Routes = express.Router();

Admin_Routes.get('/',AdminUserGetDataAll);
Admin_Routes.get('/:id',AdminUserGetDataById);
Admin_Routes.post('/register',AdminUserRegister);
Admin_Routes.post('/login',AdminUserLogin);
Admin_Routes.post('/verify',AdminUserVerify);
Admin_Routes.post('/forgotpassword', AdminUserForgotPassword);
Admin_Routes.post('/resetpassword/:token', AdminUserResetPassword);