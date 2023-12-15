import React from 'react';
import DateComponent from './DateComponent';
import { Link } from 'react-router-dom';
import '../pages/Auth.css';

const ListItem = ({ note }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="Note">
      <Link to={`/notes/${note.id}`}>
        <DateComponent date={note?.updated_at}/>
        <p className='note-title'>{truncateText(note?.title, 70)}</p>
        <p className='note-content'>{truncateText(note?.content, 140)}</p>
      </Link>
    </div>
  );
}

export default ListItem;
