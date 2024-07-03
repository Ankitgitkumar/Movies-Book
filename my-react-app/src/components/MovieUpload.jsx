import React, { useState } from 'react';
import axios from 'axios';
import './MovieUpload.css';

const MovieUpload = () => {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    genre: '',
    plot: '',
    poster: '',
    links: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/movies', {
        ...movie,
        links: movie.links.split(',').map(link => link.trim()),
      });
      alert('Movie uploaded successfully!');
      setMovie({
        title: '',
        year: '',
        genre: '',
        plot: '',
        poster: '',
        links: '',
      });
    } catch (error) {
      console.error('Error uploading movie:', error);
      alert('Failed to upload movie');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={movie.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input type="text" name="year" value={movie.year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input type="text" name="genre" value={movie.genre} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Plot</label>
          <textarea name="plot" value={movie.plot} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Poster URL</label>
          <input type="text" name="poster" value={movie.poster} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Links (comma separated)</label>
          <input type="text" name="links" value={movie.links} onChange={handleChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default MovieUpload;

