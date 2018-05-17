import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddMoviePage from '../components/AddMoviePage';
import MovieDashboardPage from '../components/MovieDashboardPage';
import Header from '../components/Header';
import AboutPage from '../components/AboutPage';
import NotFoundPage from '../components/NotFoundPage';
import EditMoviePage from '../components/EditMoviePage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={MovieDashboardPage} exact={true}/>
        <Route path="/add" component={AddMoviePage}/>
        <Route path="/edit/:id" component={EditMoviePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;