const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const cheerio = require('cheerio');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DBConnection Successfull!"))
.catch((err)=>{
    console.log(err);
});

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  genre: String,
  plot: String,
  poster: String,
  links: [String],
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.post('/api/movies', async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

 
// app.get('/api/movies', async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.status(200).json(movies);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });



 app.get('/api/movies', async (req, res) => {
  try {
    let movies;
    if (req.query.title) {
      movies = await Movie.find({ title: { $regex: new RegExp('^' + req.query.title + '$', 'i') } });
    } else {
      movies = await Movie.find();
    }
    if (movies.length > 0) {
      res.status(200).send(movies);
    } else {
      res.status(404).send({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});






app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
