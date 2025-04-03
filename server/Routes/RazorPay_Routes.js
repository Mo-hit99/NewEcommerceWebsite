import express from 'express'
import { createPaymentOrder,verifyPaymentOrder,getPaymentDetails } from '../Controller/RazorPayController.js';
const RazorPay_router = express.Router();

// get order

RazorPay_router.get('/payment', getPaymentDetails)

//  create order
RazorPay_router.post('/payment/order',createPaymentOrder);

// verify
RazorPay_router.post ('/payment/verify',verifyPaymentOrder)


export default RazorPay_router;