import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    errors:
    {
        ApartmentNumber: false,
        street: false
    },
    //סטייט ששומר את ערכי האינפוטים
    formData: {
        ApartmentNumber: '',
        street: '',
        city: '',
        deliveryType: ''
    },

}

export const shippingDetailsSlice = createSlice({
    name: 'shippingDetails',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setShippingErrors: (state, action) => {
            state.errors = action.payload;
        },
         removeShipping: (state) => {
            state.formData ={};
        }
    }
});
export default shippingDetailsSlice.reducer
export const { setFormData, setShippingErrors,removeShipping } = shippingDetailsSlice.actions;