import express from 'express';
import UserController from '../Controllers/UserController.js';//יבאתי את הקונטרולר של המשתמשים
import { authorizeAdmin } from '../Middlewares.js';

//נשתמש בראוטר - נתיב של אקספרס שמשמש כמו הנתב הראשי רק בקטן
const UserRouter = express.Router();

UserRouter.get('/', authorizeAdmin, UserController.getUsers);
// אין לקבל לפי מזהה כי משתמש לא אמור לקבל לפי מזהה אלא רק את עצמו
UserRouter.get('/me', UserController.getMyUser);
UserRouter.post('/sign-up', UserController.addUser);
UserRouter.post('/login', UserController.login);
UserRouter.delete('/:id', authorizeAdmin, UserController.deleteUser);
// כי המשתמש מעדכן את המשתמש של עצמו - לכן ניקח מהטוקן urlלדעתי לעדכן משתמש לא צריך מזהה מ 
UserRouter.put('/', UserController.updateUser);

export default UserRouter;