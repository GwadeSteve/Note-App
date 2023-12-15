import React from 'react';

const DateComponent = ({ date }) => {
  const formattedDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateTime = formattedDate.toLocaleDateString(undefined, options);

  return (
    <div className="List-Date">
      <div className="tag"><span></span> General</div>
      <div className="Date">{formattedDateTime}</div>
    </div>
  );
}

export default DateComponent;
