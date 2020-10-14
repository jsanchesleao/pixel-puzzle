import React from 'react';
import {Link} from 'react-router-dom';
import './home.scss';

export default function HomePage() {
  return (
    <div className="homeContainer">
      <div className="homeLinks">
        <Link to="/make">Make</Link>
        <Link to="/play">Play</Link>
      </div>
    </div>
  )
}