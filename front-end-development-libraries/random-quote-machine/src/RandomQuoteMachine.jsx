import { useState } from 'react';
import './RandomQuoteMachine.css';
import { randomQuote } from './quotes';
import QuoteBox from './QuoteBox';
import { useEffect } from 'react';
import { ThemeContent } from './content';
import { randomFloat, randomInt } from './utils';

function RandomQuoteMachine() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [theme, setTheme] = useState({ primary: '' });

  const randomHSL = () => {
    const h = randomInt(0, 360);
    const s = randomFloat(10, 50);
    const l = randomFloat(10, 50);
    return `hsl(${h} ${s}% ${l}%)`;
  };

  const handleNewQuote = () => {
    const { hitokoto, from_who, from } = randomQuote();
    setQuote({ text: hitokoto, author: from_who ? from_who : `《${from}》` });
    setTheme({ primary: randomHSL() });
  };

  useEffect(() => {
    handleNewQuote();
  }, []);

  return (
    <>
      <ThemeContent.Provider value={theme}>
        <div id='app' style={{ backgroundColor: theme.primary }}>
          <QuoteBox quote={quote} onNewQuote={handleNewQuote} />
          <div className='name'>By SoulDee</div>
        </div>
      </ThemeContent.Provider>
    </>
  );
}

export default RandomQuoteMachine;

