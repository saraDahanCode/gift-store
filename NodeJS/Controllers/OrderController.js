import { data } from "react-router-dom";
import { OrderModel } from '../Models/OrderModel.js' //מייבא את המודל של המשתמש

// טוב ב"ה
const OrderController = {

    //GET
    getAllOrders: async (req, res) => {

        console.log("getOrders called!");

        try {
            const orders = await OrderModel.find();
           
            //נחזיר את המידע וגם סטטוס הצלחה 
            return res.status(200).json({
                success: true,
                message: "Orders retrieved successfully",
                data: orders
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

    getMyOrders: async (req, res) => {
        console.log("getMyOrders called!")
        //middleware ניקח את מזהה המשתמש מהמידע שהצטרף לבקשה על ידי ה
        const id = req.user.userId;

        try {
            const orders = await OrderModel.find({ userId: id });
            if (!orders)
                return res.status(404).json({
                    success: false,
                    message: "Orders not found!"
                })

            return res.status(200).json({
                success: true,
                message: "Orders retrieved successfully",
                data: orders
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

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
            const order = await OrderModel.findById(id);
            if (!order)
                return res.status(404).json({
                    success: false,
                    message: "Order not found!"
                })

            return res.status(200).json({
                success: true,
                message: "Order retrieved successfully",
                data: order
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
    addOrder: async (req, res) => {
        console.log('addOrder called');

        // validation of the request body
        const { products, totalPrice, Orderdate, status, customerDetails } = req.body;

        if (!products || !Array.isArray(products) ||
            !totalPrice || !Orderdate || !status ||
            !customerDetails || !customerDetails.Fname || !customerDetails.Lname ||
            !customerDetails.email || !customerDetails.phone ||
            !customerDetails.address || !customerDetails.address.city ||
            !customerDetails.address.street || !customerDetails.address.ApartmentNumber) {
            return res.status(400).json(
                {
                    success: false,
                    message: "  missing details"
                });
        }


        // validation of each product in the products array
        for (let i = 0; i < products.length; i++) {
            if (!products[i].productId || !products[i].quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Missing productId or quantity at index ${i}`
                });
            }
        }
        // תיקח את המזהה של המשתמש שיצר את ההזמנה הזו מהמידע שהצטרף לבקשה
        const userId = req.user.userId;
        try {

            const newOrder = await OrderModel.create({ userId, products, totalPrice, Orderdate, status, customerDetails });
            return res.status(200).json({
                success: true,
                message: "Order created successfully",
                data: newOrder
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    //Delete
    deleteOrder: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing order ID"
            });
        }

        try {
            // שליפת ההזמנה לפי מזהה
            const order = await OrderModel.findById(id);

            // בדיקה אם ההזמנה קיימת
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            // בדיקה שהמשתמש הנוכחי הוא זה שביצע את ההזמנה
            if (order.userId.toString() !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized: You are not allowed to delete this order"
                });
            }

            // מחיקה בפועל
            await OrderModel.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Order deleted successfully"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
    ,
    //PUT
    updateOrder: async (req, res) => {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing order ID"
            });
        }

        const { products, totalPrice, Orderdate, status } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0 || !totalPrice || !Orderdate || !status) {
            return res.status(400).json({
                success: false,
                message: "Missing or invalid details in order request"
            });
        }

        // ולידציה על כל מוצר
        for (let i = 0; i < products.length; i++) {
            if (!products[i].productId || !products[i].quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Missing productId or quantity at index ${i}`
                });
            }
        }

        try {
            const order = await OrderModel.findById(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            // בדיקת בעלות
            if (order.userId.toString() !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized: You are not allowed to update this order"
                });
            }

            // עדכון בפועל
            await OrderModel.findByIdAndUpdate(id, {
                products,
                totalPrice,
                Orderdate,
                status
            });

            return res.status(200).json({
                success: true,
                message: "Order updated successfully"
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }


}
export default OrderController;