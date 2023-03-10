const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String },
    urlIdName: { type: String },
    review: { type: Number },
    tags: { type: Array },
    preparationTime: { type: String },
    description: { type: String },
    recipeEmotions: {type : String },
    howToStep: { type: Array },
    image: { type: String },
    instructions: { type: Array },
    ingredients: { type: Array  },
    nutrition: { type: Array },
    categories: { type: Array },
    creationTime : { type : Date, default: Date.now },
    servings: { type: Number },
});

module.exports = new mongoose.model('Recipe', recipeSchema);
