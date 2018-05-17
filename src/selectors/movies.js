import moment from 'moment';


export default (movies, { query, searchBy, sortBy, startDate, endDate }) => {
  return movies.filter((movie) => {
    console.log(searchBy);

    let queryMatch;
    if(query) {
      switch(searchBy) {
        case 'title':
        case 'year':
        case 'genre':
        case 'rating': {
          queryMatch = movie[searchBy].toLowerCase().includes(query.toLowerCase());
          break;
        }
        case 'actors': {
          for(let i =0; i < movie.actors.length; i++) {
            if(queryMatch = movie.actors[i].label.toLowerCase().includes(query.toLowerCase())) {
              break;
            }
          }
          break;
        }
        default:
          queryMatch = true;
      }
    } else {
      queryMatch = true;
    }

    // const textMatch = typeof text !== 'string' || movie.title.toLowerCase().includes(text.toLowerCase());
    return queryMatch;
  }).sort((a, b) => {
    if (sortBy === 'year') {
      return a.year < b.year ? 1 : -1;
    }
  });
}
