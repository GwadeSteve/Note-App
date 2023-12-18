import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineFrown } from 'react-icons/ai';

const NoNotes = () => {
  return (
    <div className="no-results-message">
          <AiOutlineFrown size={50} className="no-results-icon" />
          <h3>Oops, no notes found!</h3>
          <p>Create one now. Click <Link to='/notes/create'>Here</Link></p>
        </div>
      );
    };

export default NoNotes
