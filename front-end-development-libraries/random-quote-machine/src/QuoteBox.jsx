import { useContext } from 'react';
import './QuoteBox.css';
import { ThemeContent } from './content';
import { useState } from 'react';

export default function QuoteBox({ quote, onNewQuote }) {
  const TWEET_URL = 'https://twitter.com/intent/tweet';

  const theme = useContext(ThemeContent);

  const [opacity, setOpacity] = useState(1);
  const [timer, setTimer] = useState(-1);

  const handleClick = () => {
    if (timer !== -1) return;

    setOpacity(0);

    setTimer(
      setTimeout(() => {
        onNewQuote();
        clearTimeout(timer);
        setOpacity(1);
        setTimer(-1);
      }, 1000),
    );
  };

  return (
    <>
      <div id='quote-box'>
        <div style={{ color: theme.primary, opacity: opacity }} id='text'>
          {quote.text}
        </div>
        <div style={{ color: theme.primary, opacity: opacity }} id='author'>
          {' '}
          - {quote.author}
        </div>
        <div className='buttons-box'>
          <div className='icon-box'>
            <a style={{ backgroundColor: theme.primary }} className='icon-button' id='tweet-quote' href={TWEET_URL} target='_blank'>
              <i className='fa fa-twitter'></i>
            </a>
          </div>
          <button style={{ backgroundColor: theme.primary }} className='button' id='new-quote' onClick={handleClick}>
            New Quote
          </button>
        </div>
      </div>
    </>
  );
}
