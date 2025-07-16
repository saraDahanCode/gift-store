import { ProductModel } from "../Models/ProductModel.js";
import { mongoose } from "mongoose";

// מושלם ב"ה
const ProductController = {
    // GET
    getProducts: async (req, res) => {
        console.log("getProducts called!");
        try {

            const products = await ProductModel.find({})

            if (!products || products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "getProducts retrieved successfully",
                data: products
            })


        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
    ,
    // GET
    getById: async (req, res) => {
        console.log("getById called!")
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing id",

            });
        }

        try {
            let product = await ProductModel.findById(id);
            if (!product)
                return res.status(404).json({
                    success: false,
                    message: "Product not found!"
                })

            return res.status(200).json({
                success: true,
                message: "Product retrieved successfully",
                data: product
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    // POST
    addProduct: async (req, res) => {
        console.log('addProduct called');
        const { name, description, price, categoryId, technicalDescription, image } = req.body;

        // Validate the input
        if (!name || !description || !price || !categoryId || !technicalDescription || !image) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid details in product request",
            });
        }

        try {

            const newProduct = await ProductModel.create({ name, description, price, categoryId, technicalDescription, image });
            return res.status(200).json({
                success: true,
                message: "Product created successfully",
                data: newProduct
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },



}

export default ProductController;