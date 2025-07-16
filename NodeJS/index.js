import connectDB from "../NodeJS/database.js";//יבאתי את החיבור למסד נתונים
import express from 'express'// יבאתי ספרייה שיוצרת שרת
import cors from 'cors'// יבאתי ספרייה שמאפשרת לי לעבוד עם cors
import bodyParser from 'body-parser'// יבאתי את הספרייה שיש בה פונקציה שממירה מידע
import UserRouter from './Routers/UserRouter.js'// יבאתי את הראוטר של המשתמשים
import OrderRouter from "./Routers/OrderRouter.js";
import ShoppingCartRouter from "./Routers/ShoppingCartRouter.js";
import ProductRouter from "./Routers/ProductRouter.js"
import CategoryRouter from "./Routers/CategoryRouter.js"
import { authenticateToken } from "./Middlewares.js";
import dotenv from 'dotenv';



const app = express()
const port = 3000;
connectDB();

app.use(cors());//מאפשר לקבל בקשות ממקורות שונים

app.use((req, res, next) => {
  // אם זה בקשה לקבל קטגוריות או מוצרים — לא דורש טוקן
  if (
    (req.method === 'GET' && req.path.startsWith('/products')) ||
    (req.method === 'GET' && req.path.startsWith('/categories')) ||
    (req.method === 'POST' && req.path.startsWith('/users')) 
  ) {
    return next();
  }

  // כל השאר — דורש טוקן
  authenticateToken(req, res, next);
});


app.use(bodyParser.json())
app.use('/users', UserRouter)
app.use('/orders', OrderRouter)
app.use('/shoppingCarts', ShoppingCartRouter)
app.use('/products', ProductRouter)
app.use('/categories', CategoryRouter)


//אמירה לשרת להאזין לבקשות בפורט 3000
app.listen(port, () =>
    console.log(`Example app listening on http://localhost:${port}`)
)

