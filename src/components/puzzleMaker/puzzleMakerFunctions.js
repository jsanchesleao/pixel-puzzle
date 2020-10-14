export class SolveBoard {

  constructor(pixels, width, height) {
    this.pixels = pixels;
    this.width = width;
    this.height = height;
  }

  generateHints() {
    this._initializeCells();
    const refineResult = this._refineHints();
    if (refineResult === 'success') {
      const hints = this._extractHints();
      return hints;
    }
    else {
      return {};
    }
  }


  getCell(row, column) {
    if ((row >= 0) && (column >= 0) && (row < this.height) && (column < this.width)) {
      return this._cells[ (row * this.width) + column ];
    }
    else {
      return null;
    }
  }

  _initializeCells() {
    this._cells = [];
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        this._cells.push( new SolveCell({
          row: i,
          column: j,
          board: this,
          shouldPaint: pixelShoudBePainted(this.pixels, i, j)
        }));
      }
    }
    this._cells.forEach(cell => cell.initialize());
  }

  _refineHints() {

    let roundCount = 0;

    while(true) {
      roundCount++;
      const candidates = this._cells.filter( cell => cell.canBeSolved());
      const solved = this._cells.filter( cell => cell.isSolved() );
      if (solved.length === this._cells.length) {
        return 'success';
      }
      else if (candidates.length === 0) {
        return 'impossible';
      }
      else if (roundCount > 10000) {
        return 'impossible';
      }
      else {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        const randomCandidate = candidates[randomIndex];
        randomCandidate.solve();
      }
    }
  }

  _extractHints() {
    const hints = {};
    this._cells.forEach(cell => {
      if(!hints[cell.row]) {
        hints[cell.row] = {};
      }
      hints[cell.row][cell.column] = cell.extractSolvedHint()
    });
    return hints;
  }

}

function pixelShoudBePainted(pixels, row, column) {
  const rowObject = pixels[row] || {};
  return rowObject[column] || false;
}

class SolveCell {

  constructor({row, column, board, shouldPaint}) {
    this.row = row;
    this.column = column;
    this.board = board;
    this.shouldPaint = shouldPaint;

    this._hint = null;
    this._needsHint = false;
    this._state = 'blank'; // 'blank' | 'crossed' | 'painted'
    this._vicinity = [];
  }

  initialize() {
    this._initializeVicinity();
    this._initializeHint();
  }

  _initializeVicinity() {
    for(let i = this.row - 1; i <= this.row + 1; i++) {
      for(let j = this.column - 1; j <= this.column + 1; j++) {
        const cell = this.board.getCell(i, j);
        if (cell) {
          this._vicinity.push(cell);
        }
      }
    }
  }

  _initializeHint() {
    this._hint = this._vicinity
                   .filter(cell => cell.shouldPaint)
                   .length;
  }

  canBeSolved() {
    if (this.isSolved()) {
      return false;
    }
    const crossed = this._vicinity.filter(cell => cell.isCrossed());
    const painted = this._vicinity.filter(cell => cell.isPainted());
    
    return (this._vicinity.length - crossed.length === this._hint) ||
           (painted.length === this._hint);
  }

  isSolved() {
    return this._vicinity.filter(cell => cell.isBlank()).length === 0;
  }

  solve() {
    if (!this.canBeSolved()) {
      throw new Error('Attempted to solve an impossible cell', this);
    }
    this._needsHint = true;
    const painted = this._vicinity.filter(cell => cell.isPainted());
    const blank = this._vicinity.filter(cell => cell.isBlank());
    if (this._hint === painted.length) {
      blank.forEach(cell => cell.cross());
    }
    else {
      blank.forEach(cell => cell.paint());
    }

  }

  paint() {
    this._state = 'painted';
  }

  cross() {
    this._state = 'crossed';
  }

  isPainted() {
    return this._state === 'painted';
  }

  isCrossed() {
    return this._state === 'crossed';
  }

  isBlank() {
    return this._state === 'blank';
  }

  extractSolvedHint() {
    if (this._needsHint) {
      return this._hint;
    }
    else {
      return null;
    }
  }

}