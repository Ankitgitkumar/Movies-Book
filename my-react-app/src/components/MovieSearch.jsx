

// import React, { useState } from 'react';
// import axios from 'axios';

// const MovieSearch = () => {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [trailer, setTrailer] = useState('');
//   const [error, setError] = useState('');

//   const fetchMovies = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/movies?title=${query}`);
//       const data = response.data;
//       if (data.length > 0) {
//         setMovies(data);
//         setTrailer('');
//         setError('');
//       } else {
//         fetchTrailer(query);
//         setError('Full Movie uploaded soon!');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchTrailer = async (title) => {
//     const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your actual YouTube API key
//     const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title} trailer&type=video&key=${YOUTUBE_API_KEY}`);
//     const data = await response.json();

//     if (data.items && data.items.length > 0) {
//       const videoId = data.items[0].id.videoId;
//       setTrailer(`https://www.youtube.com/watch?v=${videoId}`);
//     } else {
//       setTrailer('');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchMovies();
//   };

//   return (
//     <div className="movie-search">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for a movie"
//         />
//         <button type="submit">Search</button>
//       </form>
//       {error && <p>{error}</p>}
//       {movies.length > 0 ? (
//         <div className="movie-list">
//           {movies.map(movie => (
//             <div key={movie._id} className="movie-item">
//               <h2>{movie.title}</h2>
//               <p>{movie.year}</p>
//               <p>{movie.genre}</p>
//               <p>{movie.plot}</p>
//               <img src={movie.poster} alt={movie.title} style={{width:"50px", height:"50px"}}/>
//               {movie.link && <a href={movie.link} target="_blank" rel="noopener noreferrer">Watch Movie</a>}
//             </div>
//           ))}
//         </div>
//       ) : (
//         trailer && (
//           <div className="trailer">
//             <h3>Watch Trailer</h3>
//             <a href={trailer} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default MovieSearch;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/movies?title=${query}`);
      if (response.status === 200) {
        navigate(`/movies/${query}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError(<p style={{color:"black"}}>Movie not found. Please check the spelling</p>);
      } else {
        console.error(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="movie-search">
    <h1 >Movie Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          style={{marginBottom:"10px"}}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default MovieSearch;
