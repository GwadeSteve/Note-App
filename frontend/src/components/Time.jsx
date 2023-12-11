import React from 'react'

const Time = ({date}) => { 
  const formattedTime = new Date(date);
  const options = { hour: 'numeric', minute: 'numeric' };
  const formattedDateTime = formattedTime.toLocaleTimeString(undefined, options);

  return (
    <div>
      {formattedDateTime}
    </div>
  );
}

export default Time
