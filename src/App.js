import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'

import {homepage} from '../package.json';

import HomePage from './pages/HomePage';
import MakerPage from './pages/MakerPage';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <Router basename={homepage}>
      <Switch>
        <Route path="/make">
          <MakerPage />
        </Route>
        <Route path="/play">
          <PlayerPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
