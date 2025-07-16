import { UserModel } from "../Models/UserModel.js"; //מייבא את המודל של המשתמש
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

// TODO להצפין סיסמאות
const UserController = {

    //GET
    getUsers: async (req, res) => {
        console.log("getUsers called!");

        try {
            // מוציאים את כל המשתמשים בלי שדה הסיסמה
            const users = await UserModel.find().select('-password');

            return res.status(200).json({
                success: true,
                message: "Users got successfully",
                data: users
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    getMyUser: async (req, res) => {
        console.log("getById called!")
        const id = req.user.userId;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "missing id",

            });
        }

        try {
            let user = await UserModel.findById(id).select('-password'); // לא להחזיר את הסיסמה
            if (!user)
                return res.status(404).json({
                    success: false,
                    message: "User didnt found!"
                })

            return res.status(200).json({
                success: true,
                message: "User Got successfully",
                data: user
            });

        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },
    //PUT
    updateUser: async (req, res) => {
        const id = req.user.userId
        const { email, name, phone, address } = req.body;
        if (!name || !email || !address || !phone)
            return res.status(400).json(
                {
                    success: false,
                    status: 400,
                    message: "missing detail!"
                })


        const userEmail = await UserModel.findOne({ email });
        if (userEmail && userEmail._id != id)
            return res.status(409).json(
                {
                    success: false,
                    status: 409,
                    message: "Email already in use"
                })

        try {
            const role = req.user.role

            const user = await UserModel.findByIdAndUpdate(id,
                { name, email, address, phone, role },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: userWithoutPassword
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
    addUser: async (req, res) => {

        console.log('addUser');

        const { name, email, password, address, phone } = req.body;

        if (!name || !email || !address || !phone || !password)
            return res.status(400).json(
                {
                    success: false,
                    status: 400,
                    message: "missing detail!"
                })

        // אם האימייל קיים
        const userEmail = await UserModel.findOne({ email });
        if (userEmail)
            return res.status(409).json(
                {
                    success: false,
                    status: 409,
                    message: "Email already in use"
                })

        // בדיקת תקינות סיסמא
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
            return res.status(400).json({
                success: false,
                message: "הסיסמא חייבת להכיל לפחות 6 תווים: אות אחת גדולה, אות אחת קטנה ומספר"

            })
        }

        try {
            const role = 'user'
            const hashedPassword = await bcrypt.hash(password, 10); // הצפנת הסיסמה
            const newUser = await UserModel.create({ name, email, password: hashedPassword, address, phone, role });

            // הסרת הסיסמה מהאובייקט המוחזר
            const userWithoutPassword = newUser.toObject();
            delete userWithoutPassword.password;

            res.status(200).json({
                success: true,
                message: "user created successfuly",
                data: userWithoutPassword,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
    },

    // POST
    login: async (req, res) => {

        console.log('login called from server')
        const { email, password } = req.body;
      
        if (!email || !password)
            return res.status(400).json({
                success: false,
                message: "missing details"
            })

        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "user not found"
            })

      

        const isMatch = await bcrypt.compare(password.trim(), user.password.trim());
     
        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "wrong password"
            })

        // יצירת טוקן 
        // שליפה מהמשתני סביבה
        const secret = process.env.JWT_SECRET;
        // יצירת טוקן עם פיילוד-המידע, והסקרט- המחרוזת הסודית כדי ליצור חותמת
        const token = jwt.sign({ userId: user.id, role: user.role, userName: user.name }, secret)
        return res.json({
            message: 'login sucsses',
            accessToken: token,
            user:
            {
                userId: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role

            }
        })


    },
    //Delete
    deleteUser: async (req, res) => {
        const id = req.params.id;
        if (!id)
            //bad reqest שגיאת 400 כלומר  
            res.status(400).json({
                success: false,
                message: "missing id"
            })
        else
            //אני אמורה לטפל בשאר השגיאות והתקינות
            try {
                //תחפש את המשתמש ותמחק אותו
                const user = await UserModel.findByIdAndDelete(id);
                //לא מצאתי את המשתמש
                if (!user)
                    //שגיאה של 404
                    return res.status(404).json({
                        success: false,
                        message: "User didnt found!"
                    })
                //אחרת הצלחה 

                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                    data: user
                });

            }
            //תוספ שגיאות שקשורות למערכת או שרת
            catch (err) {
                //שגיאה של 500
                //שגיאות אלו קשורות לבעיות בשרת 
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
    },


}



export default UserController;
// מה למדתי מעמוד זה?
// אי אפשר להחזיר 2 תגובות אחת אחרי השנייה גם אם זה בפונקצייה נפרדת
// דבר נוסף -אין חובה שסיסמא תהיה ייחודית כי היא גם ככה מוצפנת