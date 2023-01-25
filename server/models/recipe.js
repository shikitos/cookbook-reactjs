const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String },
    review: { type: Number },
    tags: { type: Array },
    time: { type: String },
    description: { type: String },
    image: { type: String },
    instructions: { type: String },
    ingredients: { type: Array  },
    nutrition: { type: Array },
});

module.exports = new mongoose.model('Recipe', recipeSchema);
