import uuid from 'uuid';

export const addMovies = (movies) => ({
  type: 'ADD_MOVIES',
  movies
});

export const addMovie = (
    {
      id = uuid(),
      title = '',
      genre = '',
      actors = [],
      year = '',
      rating = '',
      poster = ''
    } = {}
  ) => ({
    type: 'ADD_MOVIE',
    movie: {
      id,
      title,
      genre,
      actors,
      year,
      rating,
      poster
    }
});

export const removeMovie = ({ id } = {}) => ({
  type: 'REMOVE_MOVIE',
  id
});

export const editMovie = (id, updates) => ({
  type: 'EDIT_MOVIE',
  id,
  updates
});