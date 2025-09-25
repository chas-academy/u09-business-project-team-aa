const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Saved = require('../models/Saved');

const JWT_SECRET = process.env.JWT_SECRET;

// auth middleware
function auth(req, res, next) { 
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// save recipes for user
router.post('/', auth, async (req, res) => {
 const saved = new Saved({ ...req.body, userId: req.userId });
 await saved.save();
 res.json(saved);
});

// get saved recipes for user
router.get('/', auth, async (req, res) => {
 const recipes = await Saved.find({ userId: req.userId });
 res.json(recipes);
});

// delete saved recipe by id
router.delete('/:id', auth, async (req, res) => {
    await Saved.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;