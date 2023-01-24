const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
const apiRoutes = require('./routes/api.js');
const bodyParser = require('body-parser');
app.use(cors());

const mongodb_uri = process.env.MONGO_DB_BASE_URL;

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
  
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine
app.set("view engine", "ejs");
  
// Use API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
