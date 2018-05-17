import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1 className="header__title">MovieBase</h1>
    <NavLink className="header__link" to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink className="header__link" to="/add" activeClassName="is-active">Add Movie</NavLink>
    <NavLink className="header__link" to="/about" activeClassName="is-active">About</NavLink>
    <img className="header__movie-db-logo" src={window.location.origin + '/img/movie-db-logo.png'}/>
  </header>
);

export default Header;