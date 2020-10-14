import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css'

import HomePage from './pages/HomePage';
import MakerPage from './pages/MakerPage';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <Router>
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
