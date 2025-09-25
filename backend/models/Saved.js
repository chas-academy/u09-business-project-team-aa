const mongoose = require('mongoose');

const SavedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title : String,
    recipeId : String,
    image : String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Saved', SavedSchema);