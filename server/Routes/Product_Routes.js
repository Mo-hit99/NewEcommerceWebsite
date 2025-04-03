import express from 'express'
import { createProductData, DeleteProductData, getAllProductData, getProductDataById} from '../Controller/Product_Controller.js'
import upload from '../Multer_image/Multer_image.js'
export const Product_router = express.Router()

// get data
Product_router.get('/productData',getAllProductData)

// get by id
Product_router.get('/productData/:id',getProductDataById)

// create data
Product_router.post('/productData',upload.array('image',5),createProductData)

// delete product

Product_router.delete('/productData/:id', DeleteProductData)

