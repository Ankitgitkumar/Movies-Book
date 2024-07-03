// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import MovieSearch from './components/MovieSearch';
import MovieDetail from './components/MovieDetail';
import MovieSlider from './components/MovieSlider';
import MovieUpload from './components/MovieUpload';

import "./App.css";

const App = () => {
  return (

    <Router>
    
        <div>
        <Navbar/>
          <Routes>
            <Route path="/" element={<MovieSlider />} />
            <Route path="/movies/:title" element={<MovieDetail/>} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/upload" element={<MovieUpload/>} />
            
          </Routes>
         
        </div>
       
      
    </Router>

  );
};

export default App;
