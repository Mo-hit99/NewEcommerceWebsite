import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    name: { type: String},
    email:{ type: String,unique: true,lowercase:true},
    password:{ type: String},
    otp:{type:String},
    isVerified:{type:Boolean,default:false},
  },{timestamps:true});

const Admin = mongoose.model('AdminUser', adminSchema);
export default Admin;