import './Previewer.css'

export default function Previewer({ content }) {
  return (
    <>
      <div id='preview' dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}
