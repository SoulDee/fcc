import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './DrumPad.css';

const PAD_DEFAULT_CLASS = 'drum-pad';

const DrumPad = forwardRef(({ data, volume, triggered }, ref) => {
  const [padClass, setPadClass] = useState('drum-pad');

  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    handleKeydown() {
      handleClick();
      setPadClass(`${PAD_DEFAULT_CLASS} active`);
    },
    handleKeyup() {
      setPadClass(PAD_DEFAULT_CLASS);
    },
  }));

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  function handleClick() {
    audioRef.current.play();
    triggered(data.name);
  }

  return (
    <>
      <div id={'drum-pad' + data.id} className={padClass} onClick={handleClick}>
        <audio id={data.id} className='clip' ref={audioRef} src={data.url} onClick={handleClick}></audio>
        {data.id}
      </div>
    </>
  );
});

export default DrumPad;
