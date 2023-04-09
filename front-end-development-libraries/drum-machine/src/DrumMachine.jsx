import { useState } from 'react';
import './DrumMachine.css';
import DrumPad from './DrumPad';
import Display from './Display';
import VolumeControl from './VolumeControl';
import { Musics } from './musics';

function DrumMachine() {
  const [message, setMessage] = useState('');
  const [volume, setVolume] = useState(0.6);
  const [timer, setTimer] = useState(-1);

  function handleTriggered(message) {
    handleMessage(message);
  }

  function handleVolumeChange(e) {
    const { value } = e.target;
    handleMessage(`Volume: ${(value * 100).toFixed(0)}`);
    setVolume(value);
  }

  function handleMessage(message) {
    if (timer !== -1) {
      clearTimeout(timer);
    }

    const id = setTimeout(() => {
      setMessage('');
      setTimer(-1);
    }, 1000);
    setTimer(id);

    setMessage(message);
  }

  return (
    <>
      <div id='drum-machine'>
        <div className='drum-pads-container'>
          {Musics.map((music) => (
            <DrumPad key={music.id} volume={volume} data={music} triggered={handleTriggered} />
          ))}
        </div>
        <div className='action-box'>
          <div className='create-by'>By SoulDee</div>
          <Display message={message} />
          <VolumeControl volume={volume} onChange={handleVolumeChange} />
        </div>
      </div>
    </>
  );
}

export default DrumMachine;
