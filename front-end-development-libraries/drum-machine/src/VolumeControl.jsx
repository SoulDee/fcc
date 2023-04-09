import './VolumeControl.css';

export default function VolumeControl({ volume, onChange }) {
  return (
    <>
      <input className='volume' type='range' min={0} max={1} step={0.01} defaultValue={volume} onInput={onChange} />
    </>
  );
}
