import { data } from 'react-router-dom';
import { CategoryModel } from '../Models/CategoryModel.js'
import { ProductModel } from '../Models/ProductModel.js';

// ברוך השם טוב
const CategoryController = {

    // GET
    // : הצגת כל הקטגוריות
    getCategories: async (req, res) => {

        console.log("getCategories called!");

        try {
            // ניקח מהמודל
            const categories = await CategoryModel.find();
            //נחזיר את המידע וגם סטטוס הצלחה 
           
            return res.status(200).json({
                success: true,
                message: "categories retrieved successfully",
                data: categories
            });
        }
        catch (err) {
            //נחזיר שגיאה ומסר של שגיאה
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    // GET
    // בלחיצה על קטגוריה
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
            let category = await CategoryModel.findById(id);
            if (!category)
                return res.status(404).json({
                    success: false,
                    message: "Category didnt found!"
                })

            return res.status(200).json({
                success: true,
                message: "Category retrieved successfully",
                data: category
            });


        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    //POST
    addCategory: async (req, res) => {
        console.log('addCategory called');
        const { name, image, background, description } = req.body;

        if (!name || !background || !image || !description)
            return res.status(400).json({
                success: false,
                message: "missing detail!",

            });
        try {

            const newCategory = await CategoryModel.create({ name, image, background, description });
            return res.status(200).json({
                success: true,
                message: "category created successfully",
                data: newCategory
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    // PUT
    updateCategory: async (req, res) => {
        const id = req.params.id;
        if (!id)
            res.status(400).json({
                success: false,
                message: "missing id"
            })
        const { name, image, discription, background } = req.body;
        if (!name || !image || !discription || !background)
            return res.status(400).json({
                success: false,
                message: "missing detail!",

            });
        else
            try {

                const category = await CategoryModel.findByIdAndUpdate(id, { name, image, discription, background });
                if (!category)
                    res.status(404).json({
                        success: false,
                        message: "Category not found"
                    });
                return res.status(200).json({
                    success: true,
                    message: "Category updated successfully"
                });
            }
            catch (err) {
                res.status(500).json({
                    success: true,
                    message: err.message
                });
            }
    }
    // DELETE - לא צריך כי זה יסבך אותנו עם מוצרים נוספים כי אם מחקתי קטגוריה מסוימת המוצרים שלה אמורים להימחק גם מבחינה לוגית

}
export default CategoryController;