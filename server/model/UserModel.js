import mongoose from 'mongoose';

const UserAddress = mongoose.Schema({
    email:{type:String},
    addressTitle:{
        type:String
    },
    address:{
        type:String
    },
    city:{
      type:String
    },
    state:{
      type:String
    },
    zipCode:{
      type: Number
    },
    createdAt: { type: Date, default: Date.now }
},{timestamps:true})
const userSchema = mongoose.Schema({
    name: { type: String},
    email:{ type: String,unique: true,lowercase:true},
    password:{ type: String},
    phone:{type:String},
    otp:{type:String},
    address:[UserAddress],
    isVerified:{type:Boolean,default:false},
  },{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;