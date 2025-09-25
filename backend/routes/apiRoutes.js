const express = require('express');
const router = express.Router();
const axios = require('axios');

const SPOON_API = 'https://api.spoonacular.com/recipes';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// search for recipes
router.get('/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const response = await axios.get(`${SPOON_API}/complexSearch`, {
            params: { 
                query, 
                apiKey: API_KEY,
                number: 5
            }
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Search failed', details: err.message });
    }
});

module.exports = router;