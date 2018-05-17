import React from 'react';
import { Link } from 'react-router-dom';

const MovieListItem = ({dispatch, id, title, year, genre, rating, actors, poster }) => (
  <Link to={`/edit/${id}`}>
    <div className="movie">
      {poster && <img className="movie__poster" src={`https://image.tmdb.org/t/p/w300/${poster}`}/>}
      <div className="movie__info">
        <p>{title}</p>
        <p>{year}</p>
      </div>
    </div>
  </Link>
);

export default MovieListItem;