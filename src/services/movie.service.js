import axios from 'axios'

const baseUrl = 'https://api.themoviedb.org/3'
const API_KEY = '9b3473090f1e12cfe06bf553d50591bf'
const CancelToken = axios.CancelToken;
let cancel;

const makeCallWithCancel = (url) => {
  if(!!cancel) {
      cancel();
  }
    
  return axios.get(url, {
    cancelToken: new CancelToken((c) => {
      cancel = c;
    })
  });
};

export const getActorsByName = (actorQuery) => {
  const url = `${baseUrl}/search/person?api_key=${API_KEY}&language=en-US&query=${actorQuery}&page=1&include_adult=false`;
  return makeCallWithCancel(url).then((response) => {
    cancel = '';
    const actors = response.data.results.slice(0,49).map(
      (actor) => ({ label: actor.name, value: actor })
    );

    return new Promise((res,rej) => {res(actors)});
  }).catch((error) => {
    console.log(error);
  });
};

export const getMoviesByName = (movieQuery) => {
  const url = `${baseUrl}/search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  return makeCallWithCancel(url).then((response) => {
    cancel = '';
    const movies = response.data.results.slice(0,49).map(
      (movie) => ({ label: movie.title, value: movie })
    );

    return new Promise((res, rej) => {res(movies)});
  }).catch((error) => {
    console.log(error);
  });
};

export const getMovieDetailsById = (id) => {
    const url = `${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,release_dates`;
    return axios.get(url, {}).then((response) => {
      let details = {};
      const results = response.data;
      details.genre = results.genres ? results.genres[0].name : '';
      details.year = results.release_date ? results.release_date.split('-')[0] : '';
      details.poster = results.poster_path ? results.poster_path : '';
      details.actors = [];

      for(let i = 0; i < 3; i++) {
        if(!!!results.credits.cast[i]) {
          break;
        }
        details.actors.push({label: results.credits.cast[i].name, value: results.credits.cast[i]});
      }

      details.rating = '';
      results.release_dates.results.forEach((element) => {
        if(element['iso_3166_1'] === 'US') {
          for(let i = 0; i < element.release_dates.length; i++) {
            if(element.release_dates[i].certification) {
              details.rating = element.release_dates[i].certification;
              break;
            }
          }
        }
      });

      return new Promise((res, rej) => {res(details)});
    }).catch((error) => {
      console.log(error);
    });
}