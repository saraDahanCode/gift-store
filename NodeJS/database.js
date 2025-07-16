
import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config(); //טוען את משתני הסביבה מקובץ .env


const uri=process.env.CONNECTION_STRING; //כתובת החיבור למסד נתונים



//מתחבר למסד נתונים על ידי הספרייה מונגווס
//החיבור הוא חיבור לא מאובטח
const connectDB=async() => {
    await mongoose.connect(uri);
}
//נותן לי את האובייקט שהוא מכיל את המידע על החיבור למסד נתונים
const database = mongoose.connection;


//נאזין לאירוע של שגיאה במונגו ונטפל בו
database.on('error', (error) => {
    console.log(error)
});

//נאזין לאירוע של חיבור למסד נתונים
//הפונקציה תקרא רק פעם אחת (once)
database.once('connected', () => {
    console.log('Database connected!');
})


//נייצא את החיבור למסד נתונים
export default connectDB
