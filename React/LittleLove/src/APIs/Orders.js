// עובד ב"ה

export const getMyOrders = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getMyOrders called');

    try {
        const response = await fetch('http://localhost:3000/orders/Mine', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            console.error(result.message);
            throw new Error(result.message);
        }

        console.log(result);
        return result.data;

    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// עובד ב"ה
export const getAllOrders = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllOrders called');
    try {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

         const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch orders');
        } 
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getOrderById = async ({ id  } = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('getOrderById called');
    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

         const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch order');
        }

       
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const addOrder = async ({
    products,
    totalPrice,
    Orderdate,
    status,
    customerDetails
} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('addOrder called');

    try {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            body: JSON.stringify({
                products,
                totalPrice,
                Orderdate,
                status,
                customerDetails
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to add order');
        }

        return result.data;
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};

export const deleteOrder = async ({ id } = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('deleteOrder called');

    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to delete order');
        }

        console.log(result);
        return result.data ;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

export const updateOrder = async (id) => {
    const token = localStorage.getItem('jwtToken');
    console.log('updateOrder called');

    try {
        const response = await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to update order');
        }

        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error in updating order:', error);
        throw error;
    }
};



// מה למדתי מעמוד זה?
// response זה המעטפת של התגובה.
// הוא לא מכיל עדיין את המידע — רק את הסטטוס, הכותרות, והיכולת לקרוא את הגוף.
// response.json- זה המידע האמיתי שהשרת החזיר.