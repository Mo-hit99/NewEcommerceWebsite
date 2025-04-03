import mongoose from "mongoose";

const Gst = mongoose.Schema({
   gst : {
       type : Number,
       required : true
   },
},{timestamps:true});

const gstSchema = mongoose.model('gst',Gst);
export {gstSchema} ;