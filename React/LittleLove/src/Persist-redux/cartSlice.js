
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addShoppingCart, deleteShoppingCart, getMyShoppingCart } from '../APIs/ShoppingCarts.js';

const initialState = {
  products: [],
  totalPrice: 0,
};

// שמירת הסל למסד (רק אם המשתמש מחובר)
export const saveCart = createAsyncThunk(
  'cart/saveCart',
  async (_, thunkAPI) => {
    const cart = thunkAPI.getState().cart;
    const hasProducts = cart?.products?.length > 0;
    if (!hasProducts) return;

    try {
      await addShoppingCart({
        products: cart.products,
        totalPrice: cart.totalPrice,
      });
      return {
        products: cart.products,
        totalPrice: cart.totalPrice
      };
    } catch (err) {
      console.error('Error saving shopping cart:', err);
      throw err;
    }
  }
);

// שליפת הסל מהשרת לאחר התחברות
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    console.log('Fetching cart from server...');
    try {
      const cart = await getMyShoppingCart();
      return cart;
    } catch (err) {
      if (err.message === 'Cart not found') return null;
     
    }
  }
);

// מחיקת סל לגמרי מהשרת
export const deleteAndClearCart = createAsyncThunk(
  'cart/deleteAndClearCart',
  async (_,thunkAPI) => {
    const {dispatch}= thunkAPI;
    try {
      await deleteShoppingCart({ products: [], totalPrice: 0 });
     
    } catch (err) {
      console.error('Error deleting shopping cart:', err);
    }
     dispatch(clearCart())
  }
);

// סלאייס הסל
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },
    clearCart: (state) => {
      state.products = [];
      state.totalPrice = 0;
      localStorage.removeItem('persist:root:cart');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
      }
    })
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
