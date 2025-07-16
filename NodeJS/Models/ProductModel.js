import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true //מנקה רווחים מיותרים
    },
    description: {
        type: String,
        maxlangth: 20,
        trim: true //מנקה רווחים מיותרים
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    // בלי רף זה לא באמת קשר רשמי
    categoryId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    technicalDescription:
    {
        type: String,
        required: true

    },
    image:
    {
        type: String,
        required: true
    },
    isBestSeller: {
        type: Boolean,
        default: false //אם לא צוין אז ברירת מחדל היא לא
    }
}
    , { versionKey: false })//עושה שלא יתסווף למסמך את השדה של איזו גרסה הוא
export const ProductModel = mongoose.model("Product", ProductSchema, "Products"); //מייצא את המודל של המשתמש
