
export const getAllCategories = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllCategories called');

    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error fetching categories');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error
    }
};

export const getCategoryById = async ({ id } = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('getCategoryById called');

    try {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error fetching category');
        }
        return result.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error
    }
}

export const addCategoryApi= async ({
    name,
    description,
    image,
    background
} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('addCategory called');
    
    try {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                image,
                background
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error fetching categories');
        }

        const data = result.data;
        console.log('Category added successfully:', data);
        return data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};


// הארות נלוות

//*  Promise  הפונקציה   היא אסינכרונית ולכן היא תמיד תחזיר
//undefined אם לא מוגדר משו אחר אז היא תחזיר
// בתוך הפונקציה קראתי לפונקציה אחרת
// שהיא מחזירה מידע
// אם לא נחזיר את המידע שהפונקציה הפניית מחזירה אז הפונקציה החיצונית לא תחזיר כלום כי היא
// קיבלה את המידע והחליטה לא להחזיר אותו הלאה
// undefined ולכן יחזור
// ולכן חייב להחזיר 