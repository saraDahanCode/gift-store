import express from 'express';
import CategoryController from '../Controllers/CategoryController.js';//יבאתי את הקונטרולר של המשתמשים
import { authorizeAdmin } from '../Middlewares.js';


//נשתמש בראוטר - נתיב של אקספרס שמשמש כמו הנתב הראשי רק בקטן
const CategoryRouter=express.Router();

CategoryRouter.get('/',CategoryController.getCategories);
CategoryRouter.get('/:id', CategoryController.getById);
CategoryRouter.post('/',authorizeAdmin,CategoryController.addCategory);
CategoryRouter.put('/:id',authorizeAdmin,CategoryController.updateCategory);


export default CategoryRouter;