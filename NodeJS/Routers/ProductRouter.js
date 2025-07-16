import ProductController from "../Controllers/ProductController.js";
import express from "express"
import { authorizeAdmin } from '../Middlewares.js';

const ProductRouter=express.Router();
ProductRouter.get('/',ProductController.getProducts)
ProductRouter.get('/:id',ProductController.getById)
ProductRouter.post('/',authorizeAdmin,ProductController.addProduct)

export default ProductRouter;

