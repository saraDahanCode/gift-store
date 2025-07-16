import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    errors:
    {
        fname: false,
        lname: false,
        phone: false,
        email: false
    },
    //סטייט ששומר את ערכי האינפוטים
    formData: {
        Fname: '',
        Lname: '',
        phone: '',
        email: ''
    },

} 

export const personalDetailsSlice = createSlice({
    name: 'personalDetails',
    initialState,
    reducers: {
        setPersonalFormData: (state, action) => {
            state.formData = action.payload;
        },
        setPersonalErrors: (state, action) => {
            state.errors = action.payload;
        },
         removePersonal: (state) => {
            console.log('removePersonal')
            state.formData ={};
        }
    }
});
export default personalDetailsSlice.reducer
export const { setPersonalFormData,setPersonalErrors,removePersonal } = personalDetailsSlice.actions;