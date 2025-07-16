
import { deleteAndClearCart, setCart } from "../Persist-redux/cartSlice.js";
import { deleteShoppingCart } from "../APIs/ShoppingCarts.js";
import { addOrder } from "../APIs/Orders.js";
import { removePersonal } from "../Persist-redux/personalDetailsSlice.js";
import { removeShipping } from "../Persist-redux/shippingDetailsSlice.js";
import { removePayment } from "../Persist-redux/paymentDetailsSlice.js";
import { useSelector,useDispatch } from "react-redux";

// הוספה לסל
export function addToCart(product, products, dispatch) {
    
    
    const updatedProducts =products? [...products] :  []; //* עותק חדש

    // נבדוק אם המוצר כבר קיים במוצרים
    const productExsit = updatedProducts.findIndex(
        (item) => item.productId === product._id
    );

    // אם כן
    if (productExsit !== -1) {
        // ניצור עותק חדש של האובייקט כי רידקס לא מאפשר שינוי ישיר של תוכן
        const updatedProduct = {
            // נעתיק את התכונות
            ...updatedProducts[productExsit],
            // נשנה את הכמות למה שהיה +1
            quantity: updatedProducts[productExsit].quantity + 1,
        };

        // נעדכן את האובייקט החדש במערך החדש
        updatedProducts[productExsit] = updatedProduct;
    }
    // אחרת ניצור חדש 
    else {
        const productInCart = {
            productId: product._id,
            price: product.price,
            name: product.name,
            technicalDescription: product.technicalDescription,
            image: product.image,
            quantity: 1,
        };
        updatedProducts.push(productInCart);
    }

    // נעדכן את המחיר
    const totalPrice = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // ניצור סל 
    const newCart = {
        products: updatedProducts,
        totalPrice: totalPrice,
    };
    // נעדכן
    dispatch(setCart(newCart));
}

// מחיקה מהסל
export function removeFromCart(productId, productsInCart, dispatch) {

    const updatedProducts = [...productsInCart];

    // נמצא אינדקס של המוצר למחיקה
    const productIndex = updatedProducts.findIndex(item => item.productId === productId);
    //   נשמור את המוצר
    const product = updatedProducts[productIndex];

    if (product.quantity === 1) {
        // אם הכמות 1 - נמחק את המוצר מהמערך
        updatedProducts.splice(productIndex, 1);
    } else {
        // אחרת ניצור עותק חדש עם כמות פחות 1 ונחליף במערך
        const newProduct = {
            ...product,
            quantity: product.quantity - 1
        };
        updatedProducts[productIndex] = newProduct;
    }

    //  נחשב שוב את המחיר
    const totalPrice = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // ניצור אובייקט סל חדש
    const updatedCart = {
        products: updatedProducts,
        totalPrice
    };

    // נשלח את העדכון לרידקס
    dispatch(setCart(updatedCart));

}

// רציתי להשתמש ביוז סלקטור ולא הייתה לי שום דרך חוץ מלהפוך את זה לסוג של קומפוננט הוק
export  function useSaveOrder() {
    //ניקח את המידע מהרידקס
    const personalDetails = useSelector(state => state.personalDetails.formData);
    const shippingDetails = useSelector(state => state.shippingDetails.formData);
    const paymentDetails=useSelector(state=> state.paymentDetails.formData);
    const cart= useSelector(state => state.cart);
    const dispatch=useDispatch();

    const saveOrder = async (navigate) => {
        const { Fname, Lname, phone, email } = personalDetails;
        const { ApartmentNumber, city, street, deliveryType } = shippingDetails;
        const {visa,CSV}=paymentDetails;

         // בדיקה אם אחד מהשדות ריק
        if (
            !Fname || !Lname || !phone || !email ||
            !ApartmentNumber || !city || !street || !deliveryType ||
            !visa || !CSV 
        ) {
            throw new Error('נא למלא את כל פרטי ההזמנה לפני השליחה');
        }

        const order = {
            customerDetails: {
                Fname,
                Lname, 
                email,
                phone,
                address: {
                    city,
                    street,
                    ApartmentNumber,
                }
            },
            status: 'ממתין',
            totalPrice: cart.totalPrice,
            products: cart.products, // נשתמש במוצרים מהסל,
            Orderdate: Date.now(),
        };

        try {
            // נוסיף הזמנה
            const newOrder = await addOrder(order);
            dispatch(deleteAndClearCart());
            dispatch(removePersonal());
            dispatch(removePayment());
            dispatch(removeShipping());
            
            navigate('/orderConfirmation',{state: newOrder})

        } catch (err) {
            console.error(err);
            return;
        }
    };

    return saveOrder;
}

// למה עותק חדש? כי הסטור הוא כמו סטייט - משווה כתובות ולכן צריך מערך חדש והפונקציה מקבלת רפרנס ולא עותק