import React, {useState, useEffect} from 'react';
import PuzzleMaker from '../components/puzzleMaker/PuzzleMaker';

export default function MakerPage() {

  const [pixels, setPixels] = useState({});
  const [hints, setHints] = useState({});
  const [size, setSize] = useState({width: 5, height: 5});

  useEffect(() => {
    const session = readStateFromSession();
    setPixels(session.pixels);
    setHints(session.hints);
    setSize(session.size)
  }, []);

  useEffect(() => {
    window.sessionStorage['puzzleMaker'] = JSON.stringify({pixels, hints, size})
  }, [hints, pixels, size]);

  function clear() {
    setPixels({});
    setHints({});
  }


  return (
    <PuzzleMaker 
        width={size.width} 
        height={size.height}
        hints={hints}
        pixels={pixels}
        onChangeHints={setHints}
        onChangePixels={setPixels}
        onChangeSize={setSize} 
        onClear={() => clear()}
        />
  )
}


function readStateFromSession() {
  try{
    return JSON.parse(window.sessionStorage['puzzleMaker']);
  }
  catch(e) {
    return {hints: {}, pixels: {}, size: {width: 5, height: 5}}
  }
}