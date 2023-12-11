import React from 'react';

function RandomNote({ quotes }) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return (
    <div>
      <h1>Random Note</h1>
      <p>" {randomQuote.quote}</p>
      <p>{randomQuote.title} - <span>Gwade Steve</span></p>
    </div>
  );
}

export default RandomNote;
