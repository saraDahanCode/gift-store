

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signUp, update } from '../APIs/Users.js';
import { clearCart, saveCart } from './cartSlice.js';

const initialState = {
  userDetails: {
    name: '',
    email: '',
    role: '',
    phone: '',
    address: ''
  },
  loggedIn: false
};

// יציאה מהמערכת – שומרים סל ומנקים סטייט
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_,thunkAPI) => {
    console.log("logoutUser");
    const { dispatch } = thunkAPI;
    // נשמור את הסל במסד נתונים
    await dispatch(saveCart());
    dispatch(clearCart()); // ננקה את הסל ברידקס
    return;
  }
);

// התחברות – מאמתים, שומרים סל אם קיים, ומחזירים את המשתמש
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (values) => {
   
    let user;
    try {
      user = await login({
        email: values.email.trim(),
        password: values.password.trim(),
      });
    } catch (err) {
      throw new Error('אימייל או סיסמה שגויים');
    }
    return user;
  }
);

// עדכון פרטי משתמש
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values) => {
    console.log('clientUpdate');
    let user;
    try {
      user = await update({
        email: values.email.trim(),
        name: values.username.trim(),
        address: values.address.trim(),
        phone: values.phone.trim()
      });
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }

    return user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (values) => {
    console.log('registerUser');
    console.log(values);
    let user;
    try {
      user = await signUp({
        email: values.email.trim(),
        name: values.username.trim(),
        address: values.address.trim(),
        phone: values.phone.trim(),
        password: values.password.trim()
      });
    } catch (err) {
      throw err;
    }

    return user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('persist:root:user');
        return initialState;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loggedIn = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log('user updated', action.payload);
        state.userDetails = action.payload;
      })
  }
});


export default userSlice.reducer;
