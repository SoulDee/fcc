import './Editor.css'

export default function Editor({ content, onInput }) {
  return (
    <>
      <textarea name='markdown-editor' id='editor' defaultValue={content} onInput={onInput} />
    </>
  );
}
