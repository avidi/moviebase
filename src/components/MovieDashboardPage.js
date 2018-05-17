import React from 'react';
import MovieList from './MovieList';
import MovieListFilters from './MovieListFilters';

const MovieDashboardPage = () => (
  <div>
    <MovieListFilters />
    <MovieList />
  </div>
);

export default MovieDashboardPage;