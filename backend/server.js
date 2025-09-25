require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// import routes
const authRoutes = require('./routes/authRoutes');
const savedRoutes = require('./routes/savedRoutes');
const apiRoutes = require('./routes/apiRoutes');

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/recipes', apiRoutes);

// test route
app.get('/', (req, res) => res.send('backend is running'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));