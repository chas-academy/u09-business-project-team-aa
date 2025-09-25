const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Saved = require('../models/Saved');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Auth middleware
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

// Save a recipe for the user
router.post('/', auth, async (req, res) => {
    const { recipe } = req.body;
    if (!recipe) return res.status(400).json({ error: 'No recipe provided' });

    try {
        const saved = new Saved({
            userId: req.userId,
            title: recipe.title,
            recipeId: recipe.id,
            image: recipe.image
        });
        await saved.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save recipe', details: err.message });
    }
});

// Get all saved recipes for the user
router.get('/', auth, async (req, res) => {
    try {
        const recipes = await Saved.find({ userId: req.userId });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch saved recipes', details: err.message });
    }
});

// Delete a saved recipe
router.delete('/:id', auth, async (req, res) => {
    try {
        await Saved.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete recipe', details: err.message });
    }
});

module.exports = router;
