import { useEffect, useRef, useState } from 'react';
import './DrumPad.css';

const PAD_DEFAULT_CLASS = 'drum-pad';

function DrumPad({ data, volume, triggered }) {
  const [padClass, setPadClass] = useState('drum-pad');

  const ref = useRef(null);

  useEffect(() => {
    ref.current.volume = volume;

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
  
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  });

  function handleClick() {
    ref.current.play();
    console.log(ref.current.volume);
    triggered(data.name);
  }

  function handleKeydown(e) {
    if (e.key.toUpperCase() === data.id) {
      handleClick();
      setPadClass(`${PAD_DEFAULT_CLASS} active`);
    }
  }

  function handleKeyup(e) {
    if (e.key.toUpperCase() === data.id) {
      setPadClass(PAD_DEFAULT_CLASS);
    }
  }

  return (
    <>
      <div id={'drum-pad' + data.id} className={padClass} onClick={handleClick}>
        <audio id={data.id} className='clip' ref={ref} src={data.url} onClick={handleClick}></audio>
        {data.id}
      </div>
    </>
  );
}

export default DrumPad;
