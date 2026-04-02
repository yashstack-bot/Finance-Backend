const express = require('express');
const { register, login } = require('./controllers/authController');
const { 
    createRecord, 
    getDashboardSummary, 
    updateRecord, 
    deleteRecord 
} = require('./controllers/recordController');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * 1. Access Control Middleware (Requirement #4)
 * This guard ensures that only users with the 'ADMIN' role 
 * can perform sensitive write/delete operations.
 */
const checkAdmin = (req, res, next) => {
    const userRole = req.headers['role']; 
    if (userRole !== 'ADMIN') {
        return res.status(403).json({ error: "Access Denied: Admins Only" });
    }
    next();
};

/**
 * 2. Public Routes
 */
// Health Check (Requirement #5 - Useful for Deployment verification)
app.get('/', (req, res) => {
    res.send('🚀 Finance Backend is Running smoothly!');
});

// Authentication Routes (Requirement #1)
app.post('/register', register);
app.post('/login', login);

// Dashboard Analytics (Requirement #3)
app.get('/summary', getDashboardSummary);

/**
 * 3. Protected Routes - ADMIN ONLY (Requirement #2 & #4)
 */
// Create a new financial record
app.post('/records', checkAdmin, createRecord); 

// Update an existing record by ID
app.put('/records/:id', checkAdmin, updateRecord);

// Delete a record by ID
app.delete('/records/:id', checkAdmin, deleteRecord);

/**
 * 4. Server Initialization
 * Updated for Render Deployment:
 * We use process.env.PORT for cloud hosting and '0.0.0.0' to bind to all network interfaces.
 */
const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ✅ Server is live at port ${PORT}
    ----------------------------------------------
    🚀 Ready for Internship Evaluation!
    ----------------------------------------------
    `);
});