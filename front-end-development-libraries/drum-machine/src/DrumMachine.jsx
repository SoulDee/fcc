import { useEffect, useRef, useState } from 'react';
import './DrumMachine.css';
import DrumPad from './DrumPad';
import Display from './Display';
import VolumeControl from './VolumeControl';
import { Musics } from './musics';

function DrumMachine({musics}) {
  const [message, setMessage] = useState('');
  const [volume, setVolume] = useState(0.6);

  const timerRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  });

  function handleKeydown(e) {
    const node = getNode(e);
    node && node.handleKeydown();
  }

  function handleKeyup(e) {
    const node = getNode(e);
    node && node.handleKeyup();
  }

  function handleTriggered(message) {
    handleMessage(message);
  }

  function handleVolumeChange(e) {
    const { value } = e.target;
    handleMessage(`Volume: ${(value * 100).toFixed(0)}`);
    setVolume(value);
  }

  function handleMessage(message) {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setMessage('');
    }, 1000);

    setMessage(message);
  }

  function getNodesMap() {
    if (!nodesRef.current) {
      nodesRef.current = new Map();
    }

    return nodesRef.current;
  }

  function getNode(e) {
    const map = getNodesMap();
    const id = e.key.toUpperCase();
    return map.get(id);
  }

  return (
    <>
      <div id='drum-machine'>
        <div className='drum-pads-container'>
          {musics.map((music) => (
            <DrumPad
              ref={(node) => {
                const map = getNodesMap();

                if (node) {
                  map.set(music.id, node);
                } else {
                  map.delete(music.id);
                }
              }}
              key={music.id}
              volume={volume}
              data={music}
              triggered={handleTriggered}
            />
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

function App() {
  return <DrumMachine musics={Musics} />
}

export default App;
