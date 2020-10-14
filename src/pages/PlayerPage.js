import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import PuzzlePlayer from '../components/puzzlePlayer/PuzzlePlayer';
import {decodeGameCode} from './gameDecoder';

const mockCode = '10x10:(1)0(2)0(1)0(2)0(1)0(2)2(3)0(1)0(2)45(2)42(6)9(10)6(4)0(1)2(5)0(4)4(6)12(2)23(2)10(2)1(2)11(3)0(2)0(2)0(1)0';

export default function PlayerPage() {

  const [game, setGame] = useState(null);
  const [gameCode, setGameCode] = useState(mockCode);

  useEffect(() => {
    const session = readStateFromSession();
    setGame(session.game);
  }, []);

  useEffect(() => {
    window.sessionStorage['puzzlePlayer'] = JSON.stringify({game});
  }, [game])


  function startGame() {
    try {
      const {width, height, hints} = decodeGameCode(gameCode);
      setGame({width, height, hints, pixels: initializePixels(width, height)});
    }
    catch(err) {
      alert('invalid game code');
    }
  }

  if (game) {
    return (
      <PuzzlePlayer 
          {...game} 
          onChangePixels={(pixels) => setGame({...game, pixels})}
          onReset={() => setGame({...game, pixels: initializePixels(game.width, game.height)})}
          onExit={() => setGame(null)}
          />
    )
  }
  else {
    return (
      <div>
        <nav className="enterGame-navigation">
          <Link to="/">Back</Link>
        </nav>
        <div className="enterGameContainer">
          <p className="enterGame-text">Enter game code</p>
          <input className="enterGame-input" 
                value={gameCode} onChange={e => setGameCode(e.target.value)} 
                type="text"></input>
          <button className="enterGame-button" onClick={startGame}>Start</button>
        </div>
      </div>
    )
  }
}


function readStateFromSession() {
  try{
    return JSON.parse(window.sessionStorage['puzzlePlayer']);
  }
  catch(e) {
    console.log(e);
    return {game: null}
  }
}

function initializePixels(width, height) {
  const pixels = [];
  for(let i = 0; i < height; i++) {
    pixels.push([]);
    for(let j = 0; j < width; j++) {
      pixels[i].push('blank');
    }
  }
  return pixels;
}