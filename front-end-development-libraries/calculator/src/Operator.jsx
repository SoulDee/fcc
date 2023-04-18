export default function Operator({ id, value, content, customClass, onTrigger }) {
  function handleTrigger() {
    onTrigger(value, content);
  }

  return (
    <>
      <div id={id} className={customClass} onClick={handleTrigger}>
        {content}
      </div>
    </>
  );
}
