const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


router.get('/', (req, res) => {
  res.send('Welcome to the cookbook API!');
});

// Get all recipes
router.get('/recipes', (req, res) => {
  Recipe.find()
    .select('_id name ingredients instructions image category')
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/recipes', (req, res) => {
  Recipe.find()
    .exec()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get a specific recipe by ID
router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .select('_id name ingredients instructions image category')
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new recipe
router.post('/recipes', (req, res) => {
  console.log("New POST request....");
  const newRecipe = new Recipe({
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description
  });
  newRecipe
    .save()
    .then(result => res.status(201).json({
      message: "Recipe added successfully",
      createdRecipe: {
        id: result.id,
        name: result.name,
        ingredients: result.ingredients,
        instructions: result.instructions,
        image: result.image,
        category: result.category,
        description: result.description
      }
    }))
    .catch(err => res.status(500).json({ error: err }));
});



// Update a recipe
router.patch('/recipes/:id', (req, res) => {
  Recipe.update({ _id: req.params.id }, { $set: req.body })
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
  Recipe.find({ name: { $regex: req.params.name, $options: 'i' } })
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

