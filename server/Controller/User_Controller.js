import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { optTemplate } from "../template/otpTemplate.js";
import { updatePasswordTemplate } from "../template/updatepasswordsucessfully.js";
dotenv.config();

// expire date jwt
const Max_age = 3 * 24 * 60 * 60;

// create token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: Max_age * 100,
  });
};

// otp generate function
function generateOtp() {
  let otp = "";
  otp = Math.floor(Math.random() * 9000 + 1000).toString();
  return otp;
}

export const UserGetDataAll = async (req, res) => {
  try {
    const user = await User.find();
    const safeUsers = user.map((user) => ({
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      phone: user.phone,
      address: user.address
    }));
    res.status(200).json(safeUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const UserGetDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const safeUsersById = {
      _id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      phone: user.phone,
    };
    res.status(200).json(safeUsersById);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

// update user
export const UserDateUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const user = await User.findOneAndUpdate( id, { name, email, phone });
    res.status(200).json(user);
  } catch (error) {
    console.log(object)
    res.status(400).json({ error: error });
  }
}

// delete user
export const UserDateDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const delete_data = await User.findOneAndDelete({ _id: id });
    res.status(200).json(delete_data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

// register
export const UserRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const otp = generateOtp();
    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8 characters long and contain atleast one uppercase,lowercase,number and special character",
      });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!otp) {
       return res.status(400).json({ message: "Invalid otp" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
      otp,
    });
    const token = createToken(user._id);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODE_MAIL_ID,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // This will bypass the self-signed certificate check
      },
    });
    let mailOptions = {
      from: `"e-commerce" <${process.env.NODE_MAIL_ID}>`,
      to: `${user.email}`,
      subject: "verification Email",
      html: optTemplate(user.name, otp),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });

    res.status(201).json({ email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        error.response?.message || "Registration failed. Please try again.",
    });
  }
};

// login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(user._id);
    // Set the token in an HttpOnly cookie
    res.status(201)
    .json({ 
        email,
        token,
        message: "Login successful"
    });
  } catch (error) {
    console.log(error);
  }
}

// otp verify
export const UserVerify = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    const user = await User.findOne({ otp: code });
    if (!user) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    user.isVerified = true;
    user.otp = null;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User verification failed" });
  }
};

// forgot password
export const UserForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODE_MAIL_ID,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // This will bypass the self-signed certificate check
      },
    });

    let mailOptions = {
      from: `"e-commerce" <${process.env.NODE_MAIL_ID}>`,
      to: `${user.email}`,
      subject: "Reset your Password",
      html: `<p>Reset Your Password
             Click on the following link to reset your password:
             ${process.env.SERVER_HTTP_LINK+"/resetpassword/" + token},
             The link will expire in 10 minutes.</p>
             If you didn't request a password reset, please ignore this email.`,
    };

   await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
    res.status(201).json({ message:"success full get Email"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Password reset failed" });
  }
};

// reset password
export const UserResetPassword = async (req, res) => {
  try {
    const  {token}  = req.params;
    const { password } = req.body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "At least one lowercase letter.",
        message1: "At least one uppercase letter.",
        message2: "At least one digit.",
        message3: "At least one digit.,characters at least 8 characters long.",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let user = await User.findByIdAndUpdate(
      { _id: decodedToken._id },
      { password: hash }
    );
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    await user.save();
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.NODE_MAIL_ID,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // This will bypass the self-signed certificate check
      },
    });

    let mailOptions = {
      from: `"e-commerce" <${process.env.NODE_MAIL_ID}>`,
      to: `${user.email}`,
      subject: "Reset your Password",
      html: updatePasswordTemplate(user.name, "e-commerce"),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
    res.send({ Status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Password reset failed" });
  }
};


export const UserAddAddress = async (req,res)=>{
  try {
    const { email, addressTitle,address, city, state , zipCode} = req.body;
     const {currentUserId} = req.params;
     
     if(!addressTitle || !address || !city || !state || !zipCode || !email){
       return res.status(400).send({
         message: "all field required",
        });
      }
    const user = await User.findById(currentUserId);
      // Check if user exists
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
     const newAddress  = {
      email,
      addressTitle,
      address,
      city,
      state,
      zipCode
     }
     user.address.push(newAddress)

     await user.save();
     res.status(201).send({message:'address add!'})
  } catch (error) {
    console.log(error)
  }
}