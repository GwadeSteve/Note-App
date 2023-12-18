import React from 'react';

const DateComponent = ({ date, color }) => {
  const formattedDate = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateTime = formattedDate.toLocaleDateString(undefined, options);

  const spanStyle = {
    backgroundColor: color,
    width: '10px',
    height: '10px',
    borderRadius: '100%',
    marginRight: '10px'
  };

  return (
    <div className="List-Date">
      <div className="tag"><span style={spanStyle}></span> General</div>
      <div className="Date">{formattedDateTime}</div>
    </div>
  );
}

export default DateComponent;
