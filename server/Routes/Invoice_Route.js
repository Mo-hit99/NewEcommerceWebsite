import express from 'express'
import { createInvoiceRouter, deleteInvoiceRouter, getByIdInvoiceRouter, getInvoiceRouter, getRemainingDeliveryDays, updateInvoiceRouter, updateOrderStatus } from '../Controller/InvoiceController.js';


const Invoice_Router = express.Router();




Invoice_Router.get('/payment/invoice',getInvoiceRouter);
Invoice_Router.get('/payment/invoice/:id',getByIdInvoiceRouter);
Invoice_Router.post('/payment/createinvoice',createInvoiceRouter);
Invoice_Router.put('/payment/invoice/:id',updateInvoiceRouter);
Invoice_Router.delete('/payment/invoice/:id',deleteInvoiceRouter);
Invoice_Router.put('/payment/order/:invoiceId/updateStatus',updateOrderStatus);
Invoice_Router.get('/payment/invoice/:invoiceId/remainingdays',getRemainingDeliveryDays);



export default Invoice_Router;