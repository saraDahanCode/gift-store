
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "unknoun",
        trim: true,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: "פורמט האימייל לא תקין"
        }
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },
    address: {
        type: String
    }
}, { versionKey: false });

export const UserModel = mongoose.model("User", UserSchema, "Users");
