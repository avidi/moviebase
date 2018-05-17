import React from 'react';
import { connect } from 'react-redux';
import MovieForm from './MovieForm';
import { editMovie, removeMovie } from '../actions/movies';

const EditMoviePage = (props) => {
  return (
    <div>
      <MovieForm
        movie={props.movie}
        onSubmit={(movie) => {
          props.dispatch(editMovie(props.movie.id, movie));
          props.history.push('/');
        }}
      />
      <button 
        className="button button--remove"
        onClick={() => {
          props.dispatch(removeMovie({ id: props.movie.id }));
          props.history.push('/');
        }}>Remove
      </button>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    movie: state.movies.find((movie) => movie.id == props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditMoviePage);