import React from 'react';
import { connect } from 'react-redux';
import MovieForm from './MovieForm';
import { addMovie } from '../actions/movies';

const AddMoviePage = (props) => (
  <div>
    <h1>Add Movie</h1>
    <MovieForm
      onSubmit={(movie) => {
        props.dispatch(addMovie(movie));
        props.history.push('/');
      }} />
  </div>
);

export default connect()(AddMoviePage);