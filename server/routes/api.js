const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}--${file.fieldname}`);
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
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: fileFilter
});

// app.post("/single", upload.single("image"), (req, res) => {
//   if (req.file) {
//     res.send("Single file uploaded successfully");
//   } else {
//   res.status(400).send("Please upload a valid image");
// }
// });

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
// Step 8 - the POST handler for processing the uploaded file

router.post('/recipes', upload.single('image'), (req, res, next) => {
  console.log(
    "UPLOADING"
  );
	let obj = {
		_id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: req.file.mimetype
		},
		category: req.body.category,
    description: req.body.description
	}
	newRecipe.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log('saved');
		}
	});
});



/*router.post('/recipes', upload.single('image'), (req, res) => {
  const newRecipe = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    image: {
      data: req.file.path,
      contentType: req.file.mimetype
    },
    category: req.body.category,
    description: req.body.description
  });
  newRecipe
    .save()
    .then(result => res.status(201).json({
      message: "Recipe added successfully",
      createdRecipe: {
        _id: result._id,
        name: result.name,
        ingredients: result.ingredients,
        instructions: result.instructions,
        image: result.image,
        category: result.category,
        description: result.description
      }
    }))
    .catch(err => res.status(500).json({ error: err }));
});*/



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

