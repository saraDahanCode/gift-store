import { createSlice } from '@reduxjs/toolkit';
import { addProductApi } from '../APIs/Products.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    products: [],
    loading: true

};

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData) => {
    try {
      const newProduct = await addProductApi(productData);
      return newProduct;
    } catch (err) {
      // נזרוק שגיאה שנוכל לתפוס בקומפוננטה
        throw new Error(err.message || 'Failed to add product');
    }
  }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.loading = false;
        }
    }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

