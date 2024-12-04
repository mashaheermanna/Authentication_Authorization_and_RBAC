const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Server setup
const app = express();
const PORT = 3000;

// Secret key for JWT
const SECRET_KEY = 'my_secret_key';

// Mock user data (instead of database)
const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
    { id: 2, username: 'user', password: bcrypt.hashSync('userpass', 8), role: 'user' },
];

// Login function
function login(username, password) {
    const user = users.find(u => u.username === username);

    if (!user) {
        console.error('Invalid Username');
        return null;
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        console.error('Invalid Password');
        return null;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    console.log(`Login successful for ${username}. Token: ${token}`);
    return token;
}

// Example API endpoint
app.get('/test-login', (req, res) => {
    // To test the credentials 
    const username = 'user'; // username
    const password = 'userpass'; //  password

    const token = login(username, password);
    if (token) {
        res.send({ message: 'Login successful',username, token });
    } else {
        res.status(401).send({ message: 'Login failed', username });
    }
});

// server listener
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
