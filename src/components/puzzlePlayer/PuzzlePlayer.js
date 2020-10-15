import React, {useState, useEffect} from 'react';
import './puzzlePlayer.scss';

export default function PuzzlePlayer({hints, pixels, onChangePixels, onReset, onExit, width, height}) {

  const [keys, setKeys] = useState({shift: false});

  useEffect(() => {
    function enterKeys(e) {
      if (e.key === 'Shift') { setKeys(keys => ({...keys, shift: true}))}
    }
  
    function leaveKeys(e) {
      if (e.key === 'Shift') { setKeys(keys => ({...keys, shift: false}))}
    }
    document.body.addEventListener('keydown', enterKeys);
    document.body.addEventListener('keyup', leaveKeys);
    return () => {
      document.body.removeEventListener('keydown', enterKeys);
      document.body.removeEventListener('keyup', leaveKeys);
    }
  }, []);

  const toggleCellState = (row, column) => e => {
    e.preventDefault();
    const pixelValues = ['blank', 'painted', 'crossed'];
    const current = pixelValues.indexOf(pixels[row][column]);
    const newValue = pixelValues[  (keys.shift ? current + 2 : current + 1) % pixelValues.length ];
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