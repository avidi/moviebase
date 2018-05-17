const moviesReducerDefaultState = [];
export default (state = moviesReducerDefaultState, action) => {
  let newState = '';
  switch(action.type) {
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies
      ];
    case 'ADD_MOVIE':
      newState = [
        ...state,
        action.movie
      ];
      localStorage.setItem('movies', JSON.stringify(newState));
      return newState;
    case 'REMOVE_MOVIE':
      newState = state.filter(({ id }) => id !== action.id);
      localStorage.setItem('movies', JSON.stringify(newState));
      return newState;
    case 'EDIT_MOVIE':
      newState = state.map((movie) => {
        if (movie.id === action.id) {
          return {
            ...movie,
            ...action.updates
          }
        } else {
          return movie;
        }
      });
      localStorage.setItem('movies', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
