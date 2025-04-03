import mongoose from "mongoose";
const ReviewProduct = mongoose.Schema({
    name:{type:String},
    rating:{
        type:Number,
        default:0,
    },
    comment:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})

const ProductData = mongoose.Schema({
    productName:{type:String},
    brand:{type:String},
    price:{type:Number},
    discount:{type:Number},
    description:{type:String},
    category:{type:String},
    imageUrl:[{type:String}],
    // colors: [{ type: String }],
    sizes: [{ type: String }],
    reviews:[ReviewProduct],
    numReviews: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
      },
},{timestamps:true});

const ProductSchema = mongoose.model('productsData',ProductData);
export {ProductSchema} ;