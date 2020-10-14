import React from 'react';
import './puzzlePlayer.scss';

export default function PuzzlePlayer({hints, pixels, onChangePixels, onReset, onExit, width, height}) {

  const toggleCellState = (row, column) => e => {
    e.preventDefault();
    const pixelValues = ['blank', 'painted', 'crossed'];
    const current = pixels[row][column];
    const newValue = pixelValues[ (pixelValues.indexOf(current) + 1) % pixelValues.length ];
    onChangePixels({
      ...pixels,
      [row]: {
        ...pixels[row],
        [column]: newValue
      }
    });
  }

  function makeCells() {
    let rows = [];
    for(let i = 0; i < height; i++) {
      let row = [];
      for(let j = 0; j < width; j++) {
        let cell = (
          <div  className={`puzzlePlayer-cell --${pixels[i][j]}`}
                onClick={toggleCellState(i, j)}
                key={`c${j}x${i}`}>
            {hints[i][j]}
          </div>
        )
        row.push(cell);
      }
      rows.push(row);
      rows.push(<div className="puzzlePlayer-separator" key={`separator-${i}`} />)
    }
    return rows;
  }

  function useSmall() {
    return width >= 20 || height >= 20;
  }

  return (
    <div className="puzzlePlayer">
      <div className="puzzlePlayer-controls">
        <button className="puzzlePlayer-resetButton" onClick={onReset}>Reset</button>
        <button className="puzzlePlayer-backButton" onClick={onExit}>Back</button>
      </div>
      <div className={`puzzlePlayer-player ${useSmall() ? '--small' : ''}`}>
        <div className="puzzlePlayer-board">
          {makeCells()}
        </div>
      </div>
    </div>
  )
}