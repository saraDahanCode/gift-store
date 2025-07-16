
export const getAllProducts = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllProducts called');

    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

          const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'שגיאה בקבלת המוצרים');
        }
        console.log(result);
        return result.data;

    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error; // תמשיך לזרוק את השגיאה למעלה אם רוצים לטפל בה במקום אחר
    }
};

// עובד ב"ה
export const getProductById = async (
    id
) => {
    console.log('getProductById called');
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }

        
        return result.data;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const addProductApi = async ({
    name,
    description,
    categoryId,
    technicalDescription,
    image,
    price
} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('AddProduct called');
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name,
                description,
                categoryId,
                technicalDescription,
                image,
                price
            })
        });

        const   result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }

        return result.data;
    } catch (error) {
        throw new Error(error.message);
    }
};