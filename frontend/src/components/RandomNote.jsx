import React from 'react';

function RandomNote({ quotes }) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return (
    <div>
      <h2>Random Note</h2>
      <p>Quote: {randomQuote.quote}</p>
      <p> <span>{randomQuote.title}</span> - Author: Gwade Steve</p>
    </div>
  );
}

export default RandomNote;
