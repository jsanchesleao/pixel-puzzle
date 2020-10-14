import React from 'react';
import {Link} from 'react-router-dom';
import './puzzleMaker.scss';

import {SolveBoard} from './puzzleMakerFunctions';

export default function PuzzleMaker({
  width, height, hints, pixels, onChangeHints, onChangePixels, onChangeSize, onClear
}) {

  function makeCells() {
    let rows = [];
    for(let i = 0; i < height; i++) {
      let row = [];
      for(let j = 0; j < width; j++) {
        let cell = (
          <Cell key={`c${j}x${i}`} 
                painted={isPixelPainted(pixels, i, j)}
                hint={getHint(i, j)}
                onClick={() => togglePainted(i, j)} ></Cell>
        )
        row.push(cell);
      }
      rows.push(row);
      rows.push(<RowSeparator key={`separator-${i}`} />)
    }
    return rows;
  }

  function isPixelPainted(pixels, row, column) {
    const rowObject = pixels[row] ? pixels[row] : {};
    return !!rowObject[column];
  }

  function togglePainted(row, column) {
    const rowObject = pixels[row] ? pixels[row] : {};
    const newPixels = {
      ...pixels, 
      [row]: {
        ...rowObject, [column]: !isPixelPainted(pixels, row, column)
      }
    };
    const solver = new SolveBoard(newPixels, width, height);
    const newHints = solver.generateHints();
    onChangePixels(newPixels);
    onChangeHints(newHints);
  }

  function getHint(row, column) {
    const rowObject = hints[row] ? hints[row] : {};
    return typeof rowObject[column] === 'number' ? rowObject[column] : '';
  }

  function generateNumbers() {
    const solver = new SolveBoard(pixels, width, height);
    let finalHints = countHints(hints) > 0 ? hints : solver.generateHints();
    for(let i = 0; i < Math.min(width * height * 10, 1000); i++) {
      const newHints = solver.generateHints();
      if (countHints(newHints) === 0) {
        alert('impossible figure for our current algorithm');
        return;
      }
      if (!finalHints || (countHints(newHints) < countHints(finalHints))) {
        finalHints = newHints;
      }
      console.log('Optimization Round: ' + i + ' \t\t size is: ' + countHints(finalHints));
    }
    onChangeHints( finalHints );
  }

  function countHints(hints) {
    return Object.values(hints)
      .map(Object.values)
      .map(row => row.filter(hint => hint !== null))
      .map(row => row.length)
      .reduce((a, b) => a + b, 0)
  }

  const setSize = (width, height) => (e) => {
    e.preventDefault();
    onChangeSize({width, height});
  }

  async function copyGameCode() {
    const gameCode = generateGameCode(hints, width, height);
    try {
      await navigator.clipboard.writeText(gameCode);
    }
    catch(err) {
      window.prompt('Copy the game code below', gameCode);
    }
  }

  return (

    <div className="puzzleMaker">
      <div className="puzzleMaker-floatingAction">
        <Link to="/">Back</Link>
      </div>
      <div className="puzzleMaker-controls">
        <div className="puzzleMaker-sizes">
          <label>Change puzzle size</label>
          <button className="puzzleMaker-sizeButton" onClick={setSize(5, 5)}>5x5</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(10, 10)}>10x10</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(10, 15)}>10x15</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(15, 10)}>15x10</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(15, 15)}>15x15</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(15, 20)}>15x20</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(20, 15)}>20x15</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(20, 20)}>20x20</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(20, 25)}>20x25</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(25, 20)}>25x20</button>
          <button className="puzzleMaker-sizeButton" onClick={setSize(25, 25)}>25x25</button>
        </div>
        <button className="puzzleMaker-reset" onClick={onClear}>Reset</button>
        <button className="puzzleMaker-optimize" onClick={generateNumbers}>
          Optimize Hints
        </button>
      </div>
      <div className="puzzleMaker-maker">
        <div className="puzzleMaker-board">
          {makeCells()}
        </div>
        <div className="puzzleMaker-gameCode" onClick={copyGameCode} title="click to copy">
          <p>
            {generateGameCode(hints, width, height)}
          </p>
        </div>
      </div>
      
    </div>

  );

}

function RowSeparator() {
  return <div className="puzzleMaker-rowSeparator"></div>
}

function Cell({painted, hint, onClick}) {
  return (
    <div onClick={onClick} className={`puzzleMaker-cell ${painted ? '--painted' : ''}`}>
      {hint}
    </div>
  );
}

function generateGameCode(hints, width, height) {
  const header = `${width}x${height}:`;
  const flattened = [].concat.apply([], Object.values(hints).map(list => Object.values(list)));
  const [serialized, ] = flattened.reduce(function([serialized, nullCount], nextHint) {
    if (nextHint === null) {
      return [serialized, nullCount + 1]
    }
    else if (nullCount > 0){
      return [`${serialized}(${nullCount})${nextHint}`, 0];
    }
    else {
      return [`${serialized}${nextHint}`, 0];
    }
  }, ['', 0]);
  return header + serialized;
}