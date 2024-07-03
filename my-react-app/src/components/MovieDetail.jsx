import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies?title=${title}`);
        if (response.status === 200) {
          setMovie(response.data[0]);
        }
      } catch (error) {
        setError('Movie not found. Please check the spelling or the movie will be uploaded soon.');
      }
    };
    fetchMovie();
  }, [title]);


  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-detail" style={{marginLeft:"10px", marginTop:"80px"}}>
      <h2 style={{marginTop:"30px"}}>{movie.title}</h2>
      <p>{movie.year}</p>
      <p>{movie.genre}</p>
      <p>{movie.plot}</p>
      <img src={movie.poster} alt={movie.title} style={{height:"400px",width:"50%",marginLeft:"10px"}}/>
      {movie.links && movie.links.length > 0 && (
        <div>
          <h3>Get Links</h3>
          <ul>
            {movie.links.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Link {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
