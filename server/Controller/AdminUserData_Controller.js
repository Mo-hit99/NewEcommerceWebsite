import Admin from "../model/AdminUserModel.js";
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

export const AdminUserGetDataAll = async (req, res) => {
  try {
    const adminUserData = await Admin.find();
    const adminSafeUsersData = adminUserData.map((adminUser) => ({
      _id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
      createdAt: adminUser.createdAt,
    }));
    res.status(200).json(adminSafeUsersData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const AdminUserGetDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const adminUserData = await Admin.findById(id);
    const adminSafeUsersData = {
        _id: adminUserData._id,
        email: adminUserData.email,
        name: adminUserData.name,
      };
    res.status(200).json(adminSafeUsersData);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

// update user
export const AdminUserDateUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const adminUserData = await Admin.findOneAndUpdate( id, { name, email });
    res.status(200).json(adminUserData);
  } catch (error) {
    console.log(object)
    res.status(400).json({ error: error });
  }
}

// delete user
export const AdminUserDateDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const adminUserDataDelete = await Admin.findOneAndDelete({ _id: id });
    res.status(200).json(adminUserDataDelete);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

// register
export const AdminUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const otp = generateOtp();
    if (!email || !password || !name) {
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
    const exist = await Admin.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!otp) {
       return res.status(400).json({ message: "Invalid otp" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const adminUserData = await Admin.create({
      name,
      email,
      password: hashPassword,
      otp,
    });
    const token = createToken(adminUserData._id);

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
      to: `${adminUserData.email}`,
      subject: "verification Email",
      html: optTemplate(adminUserData.name, otp),
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
export const AdminUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const adminUserData = await Admin.findOne({ email });
    if (!adminUserData) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const match = await bcrypt.compare(password, adminUserData.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createToken(adminUserData._id);
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
export const AdminUserVerify = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    const adminUserData = await Admin.findOne({ otp: code });
    if (!adminUserData) {
      return res.status(400).json({ message: "Invalid otp" });
    }
    adminUserData.isVerified = true;
    adminUserData.otp = null;
    await adminUserData.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User verification failed" });
  }
};

// forgot password
export const AdminUserForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const adminUserData = await Admin.findOne({ email });
    if (!adminUserData) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const token = jwt.sign({ _id: adminUserData._id }, process.env.JWT_SECRET, {
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
      to: `${adminUserData.email}`,
      subject: "Reset your Password",
      html: `<p>Reset Your Password
             Click on the following link to reset your password:
             ${process.env.SERVER_HTTP_LINK + "/admin/resetpassword/" + token},
             The link will expire in 10 minutes.</p>
             If you didn't request a password reset, please ignore this email.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
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
export const AdminUserResetPassword = async (req, res) => {
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
    let adminUserData = await Admin.findByIdAndUpdate(
      { _id: decodedToken._id },
      { password: hash }
    );
    if (!adminUserData) {
      return res.status(401).send({ message: "no user found" });
    }
    await adminUserData.save();
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
      to: `${adminUserData.email}`,
      subject: "Reset your Password",
      html: updatePasswordTemplate(adminUserData.name, "e-commerce"),
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
