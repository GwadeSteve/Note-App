import React, { useState, useEffect } from 'react';
import LogOutBtn from '../components/LogOutBtn';
import ListItem from '../components/ListItem';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`/api/notes`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`, // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        console.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div>
      <LogOutBtn />
      <div className="Notes-List">
        {notes.length === 0 ? (
          <h3>You have no notes for the moment</h3>
        ) : (
          notes.map((note, index) => <ListItem key={index} note={note} />)
        )}
      </div>
    </div>
  );
};

export default NotesList;
