import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCategoryApi } from '../APIs/Categories.js';
const initialState = {
    categories: [],
    loading: true

};


export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (categoryData) => {
    try {
      const newCategory = await addCategoryApi(categoryData);
      return newCategory;
    } catch (err) {
       throw new Error(err.message || 'Failed to add category');
    }
  }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
     reducers: {
        setCategories: (state, action) => {
            
            state.categories = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
                state.loading = false;
            })
            .addCase(addCategory.rejected, (state, action) => {
                console.error('Failed to add category:', action.error.message);
                state.loading = false;
            });
    },
   
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
