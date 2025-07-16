import express, { application } from "express"
import ShoppingCartController from '../Controllers/ShoppingCartController.js'
import { authorizeAdmin } from '../Middlewares.js';



const ShoppingCartRouter=express();
ShoppingCartRouter.get('/',authorizeAdmin,ShoppingCartController.getAllShoppingCarts)
ShoppingCartRouter.get('/mine',ShoppingCartController.getMyShoppingCart)
ShoppingCartRouter.post('/',ShoppingCartController.updateOrCreateCart)
ShoppingCartRouter.delete('/',ShoppingCartController.deleteShoppingCart)

export default ShoppingCartRouter;
