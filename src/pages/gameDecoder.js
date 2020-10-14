export function decodeGameCode(gameCode) {
  const match = gameCode.match(/(\d+)x(\d+):(.*)/);
  const width = Number(match[1]);
  const height = Number(match[2]);
  const data = match[3];
  
  const hintsList = [];
  let reading = 'hint' 
  let skips = '';
  data.split('').forEach(char => {
    if (char === '(') {
      reading = 'skips';
    }
    else if (char === ')') {
      for(let i = 0; i < Number(skips); i++) {
        hintsList.push('');
      }
      reading = 'hint'
      skips = '';
    }
    else if (reading === 'hint'){
      hintsList.push(char)
    }
    else if (reading === 'skips') {
      skips = skips + char;
    }
  });

  const hints = [];
  for(let i = 0; i < height; i++) {
    hints.push([]);
    for(let j = 0; j < width; j++) {
      const index = i * height + j;
      const value = hintsList[index] === undefined ? '' : hintsList[index];
      hints[i].push(value);
    }
  }

  return {width, height, hints};
}