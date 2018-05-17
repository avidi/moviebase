import React from 'react';
import { connect } from 'react-redux';
import MovieListItem from './MovieListItem';
import selectMovies from '../selectors/movies';

const MovieList = (props) => (
  <div className="movieList">
    <div className="movies">
      {
        props.movies.map((movie) => {
          return <MovieListItem key={movie.id} {...movie} />
        })
      }
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    movies: selectMovies(state.movies, state.filters)
  };
};

export default connect(mapStateToProps)(MovieList);