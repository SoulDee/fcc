import Editor from './Editor';
import Previewer from './Previewer';
import './App.css';
import { useState } from 'react';
import { marked } from 'marked';
import { DEFAULT_INNER_HTML } from './default_html.js';

function App() {
  const [content, setContent] = useState(DEFAULT_INNER_HTML);
  const [html, setHtml] = useState(marked.parse(DEFAULT_INNER_HTML, { breaks: true }));

  const handleChange = (event) => {
    setContent(event.target.value);
    setHtml(marked.parse(event.target.value, { breaks: true }));
  };

  return (
    <>
      <div className='app'>
        <Editor content={content} onInput={handleChange} />
        <Previewer content={html} />
      </div>
    </>
  );
}

export default App;
