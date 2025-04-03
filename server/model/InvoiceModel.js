import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
   productId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "productsData",
   },
   productName: { type: String, required: true },
   productDescription: { type: String },
   productBrand: { type: String },
   productSize: { type: String },
   productPrice: { type: Number, required: true },
   productImg: { type: String },
   quantity: { type: Number, required: true },
   subTotal: { type: Number, required: true }, // productPrice * quantity
 });
const InvoiceSchema = mongoose.Schema(
  {
   orderId: { type: String, unique: true },
   paymentId: { type: String },
   CustomerName: { type: String, required: true },
   CustomerEmail: { type: String, required: true },
   CustomerAddress: {type: String, required: true},
   cartItems: [CartItemSchema],
   totalQuantity: { type: Number, required: true },
   totalAmount: { type: Number, required: true },
   estimatedDeliveryDate: { type: Number, default: 5 },
   status:{
    type : String,
    enum : ['Order Placed','Processed','Shipped','Out for Delivery','Delivered'],
    default: 'Order Placed',
   },
   statusUpdates:[
    {
      status : String,
      updatedAt : {type:Date,default:Date.now},
    }
   ]

 },
 { timestamps: true }
);

const invoiceModel = mongoose.model("Invoice", InvoiceSchema);

export { invoiceModel };