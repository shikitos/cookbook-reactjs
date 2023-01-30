const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


router.get('/', (req, res) => {
  res.send('Welcome to the cookbook API!');
});

// Get all recipes
router.get('/recipes', (req, res) => {
  Recipe.find({})
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Get a specific recipe by ID
router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new recipe
router.post('/recipes', (req, res) => {
  console.log("New POST request....");
  const newRecipe = new Recipe({
    name: req.body.name,
    urlIdName: req.body.urlIdName,
    review: req.body.review,
    tags: req.body.tags,
    preparationTime: req.body.preparationTime,
    description: req.body.description,
    image: req.body.image,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    nutrition: req.body.nutrition,
    creationTime: req.body.creationTime
  });
  newRecipe
    .save()
    .then(result => res.status(201).json({
      message: "Recipe added successfully",
      createdRecipe: {
        id: result.id,
        name: result.name,
        urlIdName: result.urlIdName,
        review: result.review,
        tags: result.tags,
        preparationTime: result.preparationTime,
        description: result.description,
        image: result.image,
        instructions: result.instructions,
        ingredients: result.ingredients,
        nutrition: result.nutrition,
        creationTime: result.creationTime
      }
    }))
    .catch(err => res.status(500).json({ error: err }));
});



// Update a recipe
router.patch('/recipes/:id', (req, res) => {
  console.log("Update recipe");
  Recipe.updateOne({ _id: req.params.id }, { $set: req.body })
  .exec()
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({
  error: err
  }));
});

// Delete a recipe
router.delete('/recipes/:id', (req, res) => {
  Recipe.remove({ _id: req.params.id })
  .exec()
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({
  error: err
  }));
});

// Search for a recipe by name
router.get('/recipes/search/:name', (req, res) => {
  console.log("GET BY NAME");
  console.log(req.params.name)
  Recipe.find({ name: { $regex: req.params.name, $options: 'i' } })
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

