import './LogicGroup.css';

export default function LoginGroup({ onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <>
      <div className='logic-group'>
        <div className='logic-item'>
          <input type='radio' name='logic' id='immediate' defaultChecked value={0} onChange={handleChange} />
          <label htmlFor='immediate'>Immediate Logic</label>
        </div>

        <div className='logic-item'>
          <input disabled type='radio' name='logic' value={1} onChange={handleChange} />
          <label htmlFor='formula'>Formula Logic</label>
        </div>
      </div>
    </>
  );
}
