import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieSlider.css';




  const  MovieSlider=()=>{

  return(
    <div className="movie-slider">
      <div className="marquee">
        
          <div className="marquee-content">
            <img src="https://i.ytimg.com/vi/ZG1hrxC7zyE/maxresdefault.jpg" alt="image" />
            <img src="https://rare-gallery.com/mocahbig/63925-Harry-Potter-And-The-Deathly-Hallows-Part-1-HD-Wallpaper.jpg" alt="image" />
          </div>

      </div>
    </div>
  )
  }
export default MovieSlider;
