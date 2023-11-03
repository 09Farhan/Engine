const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.MONGO_DB_URL || 3000;
const MongoClient = require ('mongodb').MongoClient; //de4SFjYChpAVv5Ef
app.use(express.json());

const mongoURI = "mongodb+srv://A1A2:de4SFjYChpAVv5Ef@cluster0.jvcuxph.mongodb.net/?retryWrites=true&w=majority"
const users = {};
const transactionHistory = [];

// Generate a unique user ID
const generateUserId = () => {
    return 'user-' + Math.floor(Math.random() * 1000);
};

// Initialize the user with a balance of 100 Rs
app.post('/initialize', (req, res) => {
    const userId = generateUserId();
    users[userId] = { balance: 100 };
    res.json({ userId });
});

// Handle transactions
app.post('/transaction', (req, res) => {
    const { senderId, receiverId, amount } = req.body;

    if (!users[senderId] || !users[receiverId] || amount <= 0 || users[senderId].balance < amount) {
        res.status(400).json({ error: 'Invalid transaction' });
    } else {
        users[senderId].balance -= amount;
        users[receiverId].balance += amount;
        transactionHistory.push({ senderId, receiverId, amount });
        res.json({ message: 'Transaction successful' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});