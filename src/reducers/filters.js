const filtersReducerDefaultState = {
  query: '',
  searchBy: 'title',
  sortBy: 'year'
};

export default (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        query: action.query
      }
    case 'SET_SEARCH_BY':
      return {
        ...state,
        searchBy: action.searchBy
      }
    default:
      return state;
  }
};