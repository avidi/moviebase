export const setSearchQuery = (query = '') => ({
  type: 'SET_SEARCH_QUERY',
  query
});

export const setSearchBy = (searchBy = 'title') => ({
  type: 'SET_SEARCH_BY',
  searchBy
});