import './Display.css';

export default function Display({ id, output, input }) {
  return (
    <>
      <div id="display-content">
        <div id='output'>{output}</div>
        <div id={id}>{input}</div>
      </div>
    </>
  );
}
