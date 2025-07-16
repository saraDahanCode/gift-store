import express from 'express';
import OrderController from '../Controllers/OrderController.js';
import { authorizeAdmin } from '../Middlewares.js';



//נשתמש בראוטר - נתיב של אקספרס שמשמש כמו הנתב הראשי רק בקטן
const OrderRouter=express.Router();

// נחסום גישה עבור מתשמש שאינו מנהל
OrderRouter.get('/',authorizeAdmin,OrderController.getAllOrders);
OrderRouter.get('/Mine',OrderController.getMyOrders)
OrderRouter.get('/:id', OrderController.getById);
OrderRouter.post('/',OrderController.addOrder);
OrderRouter.delete('/:id', OrderController.deleteOrder);
OrderRouter.put('/:id', OrderController.updateOrder);

export default OrderRouter;
// הארות לorders
//  הפרדתי בין הפונקציות והוספתי נוספות כדי למנוע את הבדיקה של האם מנהל בתוך האנדפוניט כי ככה היה לי נראה יותר הגיוני
// אחרי שחשבתי שאלתי את GPT והוא הסביר לי על העקרון של הפרדת אחריות(כמו ב C# קצת )
// ושצריך להפריד בין האימות ללוגיקה וזה הגיוני כי אני לא אתן למישו להגיע עד האנדפוינט ואז לגלות שהוא לא מנהל
// זה פחות בטיחותי ולכן חילקתי ככה

// תפקיד המידלוור הוא לטפל בכל המעטפת של הבקשה ללא טיפול בבקשה
// להוסיף מידע, לאמת , לבדוק שגיאות מסויימות אבל לא לטפל בה