const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: Array, required: true },
    image: { 
        data: Buffer, 
        contentType: String },
    category: { type: String },
    description: { type: Array, required: true }
});

module.exports = new mongoose.model('Recipe', recipeSchema);
