import React from 'react';
import '../pages/Auth.css';

function RandomNote({ quotes }) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return (
    <div className='Random'>
      <div>
        <h1>Random <span className='Highlight'>Note</span></h1>
      </div>
      <div>
        <p>" {randomQuote.quote}</p>
      </div>
      <div>
        <p><span className='Highlight'>{randomQuote.title} - </span><span>Gwade Steve</span></p>
      </div>
    </div>
  );
}

export default RandomNote;
