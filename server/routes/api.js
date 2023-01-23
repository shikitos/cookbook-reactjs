const express = require('express');
const router = express.Router();
const Recipe = require('./models/recipe');
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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

// Get a specific recipe by ID
router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .select('_id name ingredients instructions image category')
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

// // Add a new recipe
// router.post('/recipes', upload.single('image'), (req, res) => {
//   const newRecipe = new Recipe({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     ingredients: req.body.ingredients,
//     instructions: req.body.instructions,
//     image: req.file.path,
//     category: req.body.category
//   });

//   newRecipe
//     .save()
//     .then(result =>