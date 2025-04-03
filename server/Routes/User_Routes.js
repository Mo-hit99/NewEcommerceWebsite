import express from 'express'
import { UserForgotPassword, UserGetDataAll, UserGetDataById, UserLogin, UserRegister, UserResetPassword, UserVerify , UserAddAddress } from '../Controller/User_Controller.js';

export const User_Routes = express.Router();

User_Routes.get('/',UserGetDataAll);
User_Routes.get('/:id',UserGetDataById);
User_Routes.post('/register',UserRegister);
User_Routes.post('/login',UserLogin);
User_Routes.post('/verify',UserVerify);
User_Routes.post('/:currentUserId/address',UserAddAddress);
User_Routes.post('/forgotpassword', UserForgotPassword);
User_Routes.post('/resetpassword/:token', UserResetPassword);
