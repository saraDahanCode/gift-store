import mongoose, { version } from "mongoose";//מייבא גם את התכונה של גרסה , לא ברור למה צריך את זה כאן

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, //מייבא את האובייקט של איידי של מונגו,
        required: true,
        ref: "User" //רפרנס למודל של המשתמשים  
        //בעצם אומר לו למי זה קשור 

    },
    customerDetails: {
        Fname: {
            type: String,
            required: true,
            trim: true,
        },
        Lname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            city: { type: String, required: true },
            street: { type: String, required: true },
            ApartmentNumber: { type: String, required: true },
            // postalCode: { type: String, required: true }
        }
    }
    ,
    products:
        //מערך שכל איבר בו הוא בסכימה:
        //בשיטת הרפרנסיג ולא בהטמעה כי יכול להיות מלא מוצרים
        [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,//מזהה ייחודי של אובייקט
                    required: true, //שדה חובה
                    ref: "Product"//אומר לו מאיפה הוא שואב את המידע
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1,
                }
            }
        ],
    totalPrice:
    {
        type: Number,
        required: true
    },
    Orderdate:
    {
        type: Date,
        required: true,
        default: Date.now // אתחול דיפולטיבי לתאריך הנוכחי
    },
    status:
    {
        type: String,//חייב לציין את הסוג 
        enum: ["ממתין", "נשלח", "הגיע", "בוטל"],//אלו האופציות האפשריות
        default: "ממתין", // אתחול דיפולטיבי
        required: true,
    }
}, { versionKey: false })//עושה שלא יתסווף למסמך את השדה של איזו גרסה הוא

export const OrderModel = mongoose.model("Order", OrderSchema, "Orders"); //מייצא את המודל של המשתמש