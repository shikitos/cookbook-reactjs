const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

// replace <dbuser> and <dbpassword> with your own MongoDB username and password
const mongodb_uri = process.env.MONGO_DB_BASE_URL;

mongoose.connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));