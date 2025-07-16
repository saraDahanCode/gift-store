
import mongoose, { version } from "mongoose";


const ProductInCartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: String,
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}, { versionKey: false });


const ShoppingCartSchema = new mongoose.Schema({

   
    userId:
    {
        type: mongoose.Schema.Types.ObjectId, //אומר לו : אני רוצה את האובייקט של איידי שקיים במודול של מונגוס
        required: true,
        ref: "User" //User אומר לו שהמזהה הזה מתייחס למסמך שנמצא בתוך הקולקשן של המודל 
    },

   
    products: {
        type: [ProductInCartSchema],//מזהה ייחודי של אובייקט
        required: true, //שדה חובה
        default: [], //אתחול דיפולטיבי
    },
    totalPrice:
    {
        type: Number,
        required: true
    }



}, { versionKey: false })//עושה שלא יתסווף למסמך את השדה של איזו גרסה הוא
export const ShoppingCartModel = mongoose.model("ShoppingCarts", ShoppingCartSchema, "ShoppingCarts"); //מייצא את המודל של המשתמש


