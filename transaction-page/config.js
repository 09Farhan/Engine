const mongoose = require('mongoose');

// Replace 'your-database-name' with the name of your MongoDB database
const mongoURI = 'mongodb+srv://A1A2:de4SFjYChpAVv5Ef@cluster0.jvcuxph.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event handlers for database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});