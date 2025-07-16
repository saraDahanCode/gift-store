// פירוק= לכתוב משתנים בתוך {}
// עובד ב"ה
export const login = async ({ email, password }) => {
    console.log('login called');
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        // בדיקת סטטוס התשובה
        if (!response.ok) {
            // ניקח את התגובה שחזרה
            throw new Error(result.message);
        }

        localStorage.setItem('jwtToken', result.accessToken);
       console.log('Login successful:', result.user);
        return result.user;
    } catch (error) {

        throw error;
    }
};


export const signUp = async ({ name, email, password, phone, address } = {}) => {
    console.log('signUp called');
  
    try {
        const response = await fetch('http://localhost:3000/users/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone, address })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        console.log('User created:', result);
        return result.data;

    } catch (error) {
        console.error('Error in signUp:', error);
        throw error;
    }
};


// שונה
export const getAllUsers = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getAllUsers called');

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// עובד ב"ה
export const getMyUser = async () => {
    const token = localStorage.getItem('jwtToken');
    console.log('getMyUser called');

    try {
        const response = await fetch(`http://localhost:3000/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch user');
        }

        
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// שונה
export const update= async ({
    name,
    email,
    phone,
    address
} = {}) => {
    const token = localStorage.getItem('jwtToken');
    console.log('updateUser called');
    // console.log({ name, email, phone, address });

    try {
        const response = await fetch('http://localhost:3000/users/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ name, email, phone, address })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        console.log(result);
        return result.data;

    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// מה למדתי מעמוד זה?
//לא מעיף שגיאות חוץ מהשגיאות רשת ושרת
// אם אני רוצה לטפל בשגיאות אחרות אני צריכה להעיף בעצמי שגיאה על ידי הבדיקה של הסטטוס של הבקשה
// ולכן שיניתי את צורת הקוד