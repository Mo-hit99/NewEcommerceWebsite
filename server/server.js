import express  from 'express'
import path  from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import mongooseConnection from './MongodbConnection/mongooseConnection.js'
import {User_Routes} from './Routes/User_Routes.js'
import { Product_router } from './Routes/Product_Routes.js'
import { Admin_Routes } from './Routes/AdminUserData_Routes.js'
import RazorPay_router from './Routes/RazorPay_Routes.js'
import Invoice_Router from './Routes/Invoice_Route.js'
import { gst_router } from './Routes/gst.js'

dotenv.config()
// Express
const app = express();
// Port
const port = process.env.PORT || 3000;
// Get the directory name
const dirname = path.dirname(import.meta.dirname);


// Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: [ 
        "'self'", 
        "https://api.razorpay.com",
        "https://checkout.razorpay.com" 
      ],
      imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com", "https://tailwindui.com", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", 
        "https://checkout.razorpay.com"
      ],
      scriptSrcElem: [
        "'self'", 
        "https://checkout.razorpay.com"
      ],
      connectSrc: [
        "'self'", 
        "https://checkout.razorpay.com",
        "https://lumberjack.razorpay.com", // Added to allow tracking requests
      ]
    },
  }
}));

// CORS
app.use(cors({
  origin: '*', // Allow all origins or specify the exact origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Body parser
app.use(express.json())
// Cookie parser
app.use(cookieParser());
// routes
app.use('/api/v1/users',User_Routes)
app.use('/api/v1/products',Product_router)
app.use('/api/v1/AdminUsers',Admin_Routes)
app.use('/api/v1/razorpay',RazorPay_router)
app.use('/api/v1/invoices',Invoice_Router)
app.use('/api/v1/gsts',gst_router)

// server client
app.use('/',express.static(path.join(dirname, 'client/dist')));

// server admin
app.use('/admin',express.static(path.join(dirname, 'Admin/dist')))

app.use('/productData',express.static("uploads"));

// // all routes for admin
app.get('/admin/*',(req,res)=>{
  res.sendFile(path.join(dirname,'Admin/dist/index.html'))
})

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client/dist/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  mongooseConnection();
});