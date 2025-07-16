# Gift Shop Web Application

This is a gift shop website managing users, shopping carts, orders, and more.

The project uses:

- React with Redux Toolkit + Persist for state management  
- Node.js with Express backend  
- JWT for authentication  
- MongoDB as the database  

---

## Environment Variables

Create a `.env` file in the **NodeJS** folder with the following variables (replace the values with your own secret keys):

```
JWT_SECRET=your_jwt_secret_key_here
CONNECTION_STRING=your_mongodb_connection_string_here
```

**Important:** Do **not** commit your actual secret keys or connection strings to the repository.  
Use a `.gitignore` file to exclude `.env` files from being pushed to GitHub.

---

## Setup and Running the Project

### Install dependencies:

Open your terminal and run:

```bash
# Client (React)
cd React
npm install


# Server (Node.js)
cd NodeJS
npm install



```

### Run the project:

Open two terminal windows or tabs, and run:

```bash
# Start backend server
cd NodeJS
node index.js   # or use nodemon if installed

# Start frontend React app
cd /React
npm run dev
```

---

## Usage

Open your browser and go to `http://localhost:3000` to access the React frontend, which communicates with the backend server on its configured port.

---

## Recommendations

- Consider adding a `.env.example` file without sensitive values to show required environment variables.  
- Use nodemon for automatic server restarts during development.  
- Make sure to add `.env` files to `.gitignore` to keep secrets safe.
