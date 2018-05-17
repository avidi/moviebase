import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addMovies } from './actions/movies';
import { setTextFilter } from './actions/filters';
import getMovies from './selectors/movies';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


const store = configureStore();

const movies = JSON.parse(localStorage.getItem('movies'));

if(movies) {
  store.dispatch(addMovies(movies));
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));