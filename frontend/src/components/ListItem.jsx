import React from 'react';
import DateComponent from './DateComponent';
import { Link } from 'react-router-dom';
import '../pages/Auth.css';

const ListItem = ({ note }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const colors = ['#3F8DE3', '#2D9B06', '#F05050', '#CBA93A', '#D950F0'];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="Note">
      <Link to={`/notes/${note.id}`}>
        <DateComponent date={note?.updated_at} color={getRandomColor()}/>
        <p className='note-title'>{truncateText(note?.title, 45)}</p>
        <p className='note-content'>{truncateText(note?.content, 50)}</p>
      </Link>
    </div>
  );
}

export default ListItem;
