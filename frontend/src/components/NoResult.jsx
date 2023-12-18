import React from 'react'
import { AiOutlineFrown } from 'react-icons/ai';

const NoResult = () => {
    return (
        <div className="no-results-message">
          <AiOutlineFrown size={50} className="no-results-icon" />
          <h3>Oops, no notes found!</h3>
          <p>Try adjusting your search terms.</p>
        </div>
      );
    };

export default NoResult
