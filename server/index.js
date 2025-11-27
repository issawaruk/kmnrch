const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// LOGIN
app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/login.html'));
});

// REGISTER
app.get('/auth/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/register.html'));
});

// RECOVERY
app.get('/recovery', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/recovery.html'));
});

// HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/templates/index.html'));
});

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'user@example.com' && password === '12345') {
        res.status(200).json({
            success: true,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

// Language API
app.get('/api/lang/:langCode', (req, res) => {
    const filePath = path.join(__dirname, `../locales/${req.params.langCode}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Language not found' });
        res.status(200).json(JSON.parse(data));
    });
});

// ❗ สำคัญมาก — ต้องส่งกลับเป็น handler เพื่อใช้กับ Serverless
module.exports = app;
