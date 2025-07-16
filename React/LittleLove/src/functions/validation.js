

export const basicValidate = (values) => {

    // נבדוק אילו שגיאות יש
    return {
        username: values.username === '',
        adress: values.address === '',
        phone: values.phone === '' || !/^\d{10}$/.test(values.phone),
        email: values.email === '' || !/\S+@\S+\.\S+/.test(values.email),

    };

}
export const registerValidate = (values) => {
    return {
        ...basicValidate(values),
        password: values.password === '' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)
    }
}

export const loginVlidate = (values) => {
    return {

        email: values.email === '' || !/\S+@\S+\.\S+/.test(values.email),
        password: values.password === '' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)


    };

}
//input פונקציה שפועלת בעת כתיבת ערך ל
export function Change(e, dispatch, formData, errors, actions) {

    const { name, value } = e.target;//name= שם הinput


    const updatedFormData = {
        ...formData,//העתקת החלקים שלא השתנו באובייקט של הסטייט
        [name]: value//שינוי 
    };
    //דרך הסטייט input עדכון הערך של ה 
    dispatch(actions.setFormData(updatedFormData));

    if (value !== '') {

        //אם האינפוט לא ריק אז נעדכן שאין שגיאה 
        // על זה לא חשבתי לבד
        const updateErrors = {
            ...errors,
            [name]: false //false המיקום באובייקט הסטייט של השגיאות שמייצג את האינפוט הנוכחי יכיל 
        }
        //עדכון אובייקט הסטייט שמחזיק את השגיאות
        dispatch(actions.setErrors(updateErrors))

    }

}

//פונקציה של בדיקת תקינות שתפעל בעת לחיצה 
export function validatePersonal(e, formData) {
    e.preventDefault(); //מונע שליחה אוטומטית של הטופס

    // בנינו אובייקט של שגיאות חדש
    //בכל מפתח נשמור האם קיימת השגיאה הזו?
    //true אם כן יהיה 
    return {
        fname: formData.fname === '',
        lname: formData.lname === '',
        phone: formData.phone === '' || !/^\d{10}$/.test(formData.phone), // לוודא מספר פלאפון תקין
        email: formData.email === '' || !/\S+@\S+\.\S+/.test(formData.email) // אימייל תקין
    };


}
export function validatePayment(formData) {
    // e.preventDefault(); //מונע שליחה אוטומטית של הטופס

    const today = new Date();
    const selectedDate = new Date(formData.date);
    return {
        visa: formData.visa === '' || !/^\d{16}$/.test(formData.visa),
        CSV: formData.CSV === '' || !/^\d{3}$/.test(formData.CSV)
     
    };

}

export function validateShipping(e, formData) {

    e.preventDefault(); //מונע שליחה אוטומטית של הטופס
    return {
        street: formData.street === '' || /^\d+$/.test(formData.street),
        ApartmentNumber: formData.ApartmentNumber === '' || /^\D+$/.test(formData.ApartmentNumber)  // 

    };
}

