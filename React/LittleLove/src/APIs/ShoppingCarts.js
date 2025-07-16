
export const getAllShoppingCarts = async () => {
  const token = localStorage.getItem('jwtToken');
  console.log('getAllShoppingCards called');

  try {
    const response = await fetch('http://localhost:3000/shoppingCarts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'שגיאה בקבלת הסלים');
    }

    
    console.log(result);
    return result.data;
  } catch (error) {
    console.error('Error fetching shoppingCarts:', error);
    throw error;
  }
};

export const getMyShoppingCart = async () => {
  const token = localStorage.getItem('jwtToken');
  console.log('getShoppingCardsById called');

  try {
    const response = await fetch('http://localhost:3000/shoppingCarts/mine', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });

     const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'שגיאה בקבלת סל הקניות');
    }

   
    console.log(result);
    return result.data;
  } catch (error) {
    console.error('Error fetching shoppingCart:', error);
    throw error;
  }
};

export const addShoppingCart = async ({ products, totalPrice } = {}) => {
  const token = localStorage.getItem('jwtToken');
  console.log('addShoppingCart called');

  try {
    const response = await fetch('http://localhost:3000/shoppingCarts', {
      method: 'POST',
      body: JSON.stringify({ products, totalPrice }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'שגיאה בהוספת סל קניות');
    }
    console.log(result);
    return result.data;
  } catch (error) {
    console.error('Error adding shoppingCart:', error);
    throw error;
  }
};

export const deleteShoppingCart = async () => {
  const token = localStorage.getItem('jwtToken');
  console.log('deleteShoppingCart called');

  try {
    const response = await fetch('http://localhost:3000/shoppingCarts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });

     const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'שגיאה במחיקת סל קניות');
    }
    console.log('shoppingCart deleted:', result);
    return result.data;
  } catch (error) {
    console.error('Error deleting shoppingCart:', error);
    throw error;
  }
};