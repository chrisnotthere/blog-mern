const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = 'mysecretsshhh';

app.use(cors({
  credentials: true, 
  origin:'http://localhost:3000'
})); // cors middleware
app.use(express.json()); // json body parser

mongoose.connect('mongodb+srv://admin:sXQYmaPkQET5O2PS@blog-mern.hnveb6l.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ 
      username, 
      password: bcrypt.hashSync(password, salt)
     })
    res.json({ userDoc })
  } catch (err) {
    res.status(400).json({ err })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username })
    const passOK = bcrypt.compareSync(password, userDoc.password)
    if (passOK) {
      //logged in
      jwt.sign({ username, id:userDoc._id }, secret, {}, (err, token) => {
        if (err) {
          res.status(400).json({ err })
        } else {
          res.cookie('token', token).json('ok');
        }
      })

      // res.json()
    } else {
      //wrong password
      res.status(400).json('Wrong credentials')
    }

  } catch (err) {
    res.status(400).json({ err })
  }
})

app.listen(4000)