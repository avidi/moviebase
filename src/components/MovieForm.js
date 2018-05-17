import React from 'react';
import axios from 'axios'
import moment from 'moment';
import { CSSTransitionGroup } from 'react-transition-group'
import { SimpleSelect, MultiSelect } from 'react-selectize';
import 'react-selectize/themes/index.css';
import uuid from 'uuid';

const baseUrl = 'https://api.themoviedb.org/3'
const API_KEY = '9b3473090f1e12cfe06bf553d50591bf'

const CancelToken = axios.CancelToken;
let cancel;

export default class MovieForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.movie ? props.movie.id : '',
      title: props.movie ? props.movie.title : '',
      genre: props.movie ? props.movie.genre : '',
      actors: props.movie ? props.movie.actors : [],
      year: props.movie ? props.movie.year : '',
      rating: props.movie ? props.movie.rating : '',
      poster: props.movie ? props.movie.poster : '',
      titleAutoCompleteList: [],
      actorsAutoCompleteList: [],
      loading: false,
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  }
  onLookupTitleChange = (titleObj) => {
    if(titleObj) {
      const {value: {title, id} = {}} = titleObj;
      this.setState(() => ({ id, title }));
    } else {
      this.setState(() => ({id: '', title: ''}));
    }
  };
  onGenreChange = (e) => {
    const genre = e.target.value;
    this.setState(() => ({ genre }));
  };
  onActorsChange = (actors) => {
    this.setState(() => ({ actors }));
  };
  onYearChange = (e) => {
    const year = e.target.value;
    this.setState(() => ({ year }));
  };
  onRatingChange = (e) => {
    const rating = e.target.value;
    this.setState(() => ({ rating }));
  };
  onLookupTitleSearchChange = (titleSearch) => {
    titleSearch = titleSearch.trim()
    if(titleSearch.length > 0) {
      if(!!cancel) {
        cancel();
      }
      
      const url = `${baseUrl}/search/movie?api_key=${API_KEY}&language=en-US&query=${titleSearch}&page=1&include_adult=false`
      axios.get(url, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        })
      }).then((response) => {
        cancel = '';
        const movies = response.data.results.slice(0,49).map(
          (movie) => ({ label: movie.title, value: movie })
        );

        this.setState({ titleAutoCompleteList: movies });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  onActorSearchChange = (actorSearch) => {
    actorSearch = actorSearch.trim();
    if(actorSearch.length > 0) {
      if(!!cancel ) {
        cancel();
      }

      const url = `${baseUrl}/search/person?api_key=${API_KEY}&language=en-US&query=${actorSearch}&page=1&include_adult=false`;
      axios.get(url, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        })
      }).then((response) => {
        cancel = '';
        const actors = response.data.results.slice(0,49).map(
          (actor) => ({ label: actor.name, value: actor })
        );

        this.setState({ actorsAutoCompleteList: actors });
      }).catch((error) => {
        console.log(error);
      });

    }
  };
  onAddLookup = () => {
    const url = `${baseUrl}/movie/${this.state.id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,release_dates`;
    axios.get(url, {}
    ).then((response) => {
      console.log(response);
      const results = response.data;
      const genre = results.genres ? results.genres[0].name : '';
      const year = results.release_date ? results.release_date.split('-')[0] : '';
      const poster = results.poster_path ? results.poster_path : '';
      const actors = [];

      for(let i = 0; i < 3; i++) {
        if(!!!results.credits.cast[i]) {
          break;
        }
        actors.push({label: results.credits.cast[i].name, value: results.credits.cast[i]});
      }

      let rating = '';
      results.release_dates.results.forEach((element) => {
        if(element['iso_3166_1'] === 'US') {
          for(let i = 0; i < element.release_dates.length; i++) {
            if(element.release_dates[i].certification) {
              rating = element.release_dates[i].certification;
              break;
            }
          }
        }
      });
      
      this.props.onSubmit({
        id: this.state.id,
        title: this.state.title,
        genre,
        actors,
        year,
        rating,
        poster
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  onAddManual = (e) => {
    e.preventDefault();
    
    if(!this.state.title) {
      this.setState(() => ({ error: 'Please provide a movie title' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        id: uuid(),
        title: this.state.title,
        genre: this.state.genre,
        actors: this.state.actors,
        year: this.state.year,
        rating: this.state.rating,
      });
    }
  }
  render() {
    return (
      <div className="movie-form container">
        {!!this.state.loading && 
        <div className="spinner-container">
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
          </div>
        </div>
        }
        {!!!this.props.movie && 
          <div>
            <div className="movie-lookup">
              <h3>Movie Lookup (Recommended)</h3>
              <div className="movie-lookup__form">
                <SimpleSelect
                  placeholder="Title"
                  options={this.state.titleAutoCompleteList}
                  defaultValue={this.state.title}
                  onSearchChange={this.onLookupTitleSearchChange}
                  onValueChange={this.onLookupTitleChange}
                  renderToggleButton={() => (false)}
                />
                <button className="button" disabled={!!!this.state.id} onClick={this.onAddLookup}>Add Movie</button>
              </div>
            </div>
            <div className="movie-form-divider">
              <p>-- <i>or</i> --</p>
            </div>
          </div>
        }
        <form onSubmit={this.onAddManual}>
          <div>
            {!!!this.props.movie && <h3>Manual Insert</h3>}
            {this.state.error && <p>{this.state.error}</p>}
            <div className="manual-insert">
              <div className="manual-insert__section">
                <input
                  className="movie-form__input"
                  type="text"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.onTitleChange}
                />
                <input
                  className="movie-form__input"
                  type="text"
                  placeholder="Genre"
                  value={this.state.genre}
                  onChange={this.onGenreChange}
                />
              </div>
              <div className="manual-insert__section">
                <input
                  className="movie-form__input"
                  type="text"
                  placeholder="Year"
                  value={this.state.year}
                  onChange={this.onYearChange}
                />
                <input
                  className="movie-form__input"
                  type="text"
                  placeholder="Rating"
                  value={this.state.rating}
                  onChange={this.onRatingChange}
              />
              </div>
              <div className="manual-insert__section">
                <MultiSelect
                  placeholder="Actors"
                  options={this.state.actorsAutoCompleteList}
                  defaultValues={this.state.actors}
                  onSearchChange={this.onActorSearchChange}
                  onValuesChange={this.onActorsChange}
                  renderToggleButton={() => (false)}
                />
              </div>
              <button className="button">{this.props.movie ? 'Edit Movie': 'Add Movie'}</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}