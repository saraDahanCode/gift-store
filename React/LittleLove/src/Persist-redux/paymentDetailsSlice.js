import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    errors:
    {
        visa: false,
        year: false,
        month: false,
        CSV: false,

    },
    //סטייט ששומר את ערכי האינפוטים
    formData: {
        visa: '',
        year: '',
        month: '',
        CSV: ''

    },

}

export const paymentDetailsSlice = createSlice({
    name: 'paymentDetails',
    initialState,
    reducers: {
        setPaymentFormData: (state, action) => {
            state.formData = action.payload;
        },
        setPaymentErrors: (state, action) => {
            state.errors = action.payload;
        },
        removePayment: (state) => {
            state.formData = {};
        }
    }
});
export default paymentDetailsSlice.reducer
export const { setPaymentFormData, setPaymentErrors, removePayment } = paymentDetailsSlice.actions;