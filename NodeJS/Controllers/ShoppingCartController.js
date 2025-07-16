

import { ShoppingCartModel } from '../Models/ShoppingCartModel.js';

const ShoppingCartController = {

    getAllShoppingCarts: async (req, res) => {
        try {
            const shoppingCarts = await ShoppingCartModel.find();
            if (!shoppingCarts || shoppingCarts.length === 0) {
                return res.status(404).json({ success: false, message: "No shopping carts found" });
            }
            return res.status(200).json({ success: true, message: "shoppingCarts retrieved successfully", data: shoppingCarts });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    },

    getMyShoppingCart: async (req, res) => {
        const id = req.user.userId;
        try {
            const shoppingCart = await ShoppingCartModel.findOne({ userId: id });
            if (!shoppingCart)
                return res.status(404).json({ success: false, message: "Shopping cart not found!" });

            return res.status(200).json({ success: true, message: "ShoppingCart retrieved successfully", data: shoppingCart });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },


    updateOrCreateCart: async (req, res) => {
        const { products, totalPrice } = req.body;
        const userId = req.user.userId;

        if (!Array.isArray(products)) {
            return res.status(400).json({ success: false, message: "Invalid products format" });
        }

        try {
            const updatedCart = await ShoppingCartModel.findOneAndUpdate(
                { userId },
                { products, totalPrice },
                { upsert: true, new: true }
            );

            res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    },


    deleteShoppingCart: async (req, res) => {
        const id = req.user.userId;
        try {
            const shoppingCart = await ShoppingCartModel.findOneAndDelete({ userId: id });
            if (!shoppingCart) {
                return res.status(404).json({ success: false, message: "ShoppingCart not found" });
            }
            return res.status(200).json({ success: true, message: "ShoppingCart deleted successfully" });
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }

};

export default ShoppingCartController;








// addOrMergeCart: async (req, res) => {
//     const { products: clientProducts } = req.body;
//     const userId = req.user.userId;

//     if (!Array.isArray(clientProducts) || clientProducts.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing or invalid cart details",
//         });
//     }

//     try {
//         const existingCart = await ShoppingCartModel.findOne({ userId });
//         const mergedProducts = [];

//         if (existingCart) {
//             const existingProducts = existingCart.products.map(item =>
//                 item.toObject ? item.toObject() : item
//             );

//             // נעתיק את המוצרים הקיימים למערך חדש
//             existingProducts.forEach(item => {
//                 mergedProducts.push({ ...item });
//             });

//             // נעבור על מוצרי הלקוח ונמזג
//             clientProducts.forEach(clientItemRaw => {
//                 const clientItem = clientItemRaw.toObject ? clientItemRaw.toObject() : clientItemRaw;
//                 const price = Number(clientItem.price);
//                 const quantity = Number(clientItem.quantity);

//                 if (isNaN(price) || isNaN(quantity)) {
//                     throw new Error(`Invalid price or quantity for item ${clientItem.productId}`);
//                 }

//                 // נבדוק אם המוצר כבר קיים ב mergedProducts לפי productId
//                 const existingIndex = mergedProducts.findIndex(
//                     item => item.productId.toString() === clientItem.productId.toString()
//                 );

//                 if (existingIndex >= 0) {
//                     // מוצר קיים, נשווה כמות ונעדכן לכמות הגדולה ביותר
//                     const existingItem = mergedProducts[existingIndex];
//                     const existingQuantity = Number(existingItem.quantity);

//                     if (isNaN(existingQuantity)) {
//                         throw new Error(`Invalid quantity for existing item ${existingItem.productId}`);
//                     }

//                     mergedProducts[existingIndex] = {
//                         ...existingItem,
//                         quantity: Math.max(existingQuantity, quantity)
//                     };
//                 } else {
//                     // מוצר חדש, נוסיף
//                     mergedProducts.push({ ...clientItem });
//                 }
//             });
//         } else {
//             // אין סל קודם, פשוט משתמשים במוצרים של הלקוח
//             clientProducts.forEach(item => {
//                 mergedProducts.push(item.toObject ? item.toObject() : item);
//             });
//         }


//         // נוודא שכל אובייקט הוא רגיל (למקרה שמוצרים הגיעו ממסד הנתונים)
//         const cleanMergedProducts = mergedProducts.map(item =>
//             item.toObject ? item.toObject() : item
//         );

//         // נחשב את המחיר הכולל מחדש
//         const totalPrice = cleanMergedProducts.reduce((sum, item) => {
//             const price = Number(item.price);
//             const quantity = Number(item.quantity);

//             if (isNaN(price) || isNaN(quantity)) {
//                 throw new Error(`Invalid price or quantity for item ${item.productId}`);
//             }

//             return sum + price * quantity;
//         }, 0);

//         const updatedCart = await ShoppingCartModel.findOneAndUpdate(
//             { userId },
//             { products: cleanMergedProducts, totalPrice },
//             { upsert: true, new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: existingCart ? "Cart merged successfully" : "Cart saved successfully",
//             data: updatedCart
//         });

//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message
//         });
//     }
// },