const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String },
    ingredients: { type: Array  },
    instructions: { type: Array  },
    image: { type: String },
    category: { type: String },
    description: { type: Array }
});

module.exports = new mongoose.model('Recipe', recipeSchema);
