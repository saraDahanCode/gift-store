import mongoose from "mongoose";
//יצירת סכימה (מבנה) של תי קטגוריות
const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 10,
    },
    image: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 50
    },
}, { versionKey: false })//עושה שלא יתסווף למסמך את השדה של איזו גרסה הוא
//ייצוא המודל
export const CategoryModel = mongoose.model("Category", CategorySchema,"Categories"); //מייצא את המודל של המשתמש