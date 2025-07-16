
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './userSlice.js';
import categoryReducer from './categoriesSlice.js'
import productReducer from './productsSlice.js'
import cartReducer from './cartSlice.js'
import personalDetailsReducer from './personalDetailsSlice.js'
import shippingDetailsReducer  from './shippingDetailsSlice.js'
import paymentDetailsReducer from './paymentDetailsSlice.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// הסבר על הספרייה
// פועל בדיוק כמו רידקס 
// ההבדל היחיד הוא שהנתונים נשמרים בלוקל סטורג
// ואז בכל ריצה או רענון הרידקס מתעדכן מחדש מהלוקל
// שליפת המידע בקומפוננטות נעשה דרך הרידקס
// ולא דרך הלוקל
// ורידקס עצמו גם מעדכן את הלוקל
// וכך מרוויחים נקיות אבטחה ומהירות


const persistConfig = {
  // תחת איזה מפתח לשמור את המידע בלוקל
  key: 'root',
  // איפה לשמור
  storage,
  // איזה מידע לשמור
  // 
  whitelist: ['user', 'product', 'category','cart','paymentDetails','personalDetails','shippingDetails']

};

// רדיוסר שמאפשר לשים בתוכו כמה רדיוסרים
const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer ,
  user: userReducer,
  cart : cartReducer,
  paymentDetails: paymentDetailsReducer,
  personalDetails: personalDetailsReducer,
  shippingDetails: shippingDetailsReducer

});
// הופך את הרדיוסר למתמיד כלומר שהמידע ייטען מהלוקל
const persistedReducer = persistReducer(persistConfig, rootReducer);

// יצירת הסטור
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
