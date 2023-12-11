import React from 'react';

const DateComponent = ({ date }) => {
  const formattedDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateTime = formattedDate.toLocaleDateString(undefined, options);

  return (
    <div>
      {formattedDateTime}
    </div>
  );
}

export default DateComponent;
