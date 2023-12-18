import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import NoNotes from '../components/NoNotes';
import Nav from '../components/Nav';
import './Auth.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token ) {
      navigate('/')
    }
    getNotes();
  }, [navigate]);

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

  const colors = ['#3F8DE3', '#2D9B06', '#F05050', '#CBA93A', '#D950F0'];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const randomColor = getRandomColor();

  return (
    <div>
      <Nav />
      <div className="main">
        <div className="Note-head">
          <h1 className="Main-t">Notes</h1>
          <p className="Count"><span>{notes.length}</span></p>
        </div>
        <div className="Notes-List">
          {notes.length === 0 ? (
            <NoNotes />
          ) : (
            notes.map((note, index) => <ListItem key={index} note={note} randomColor={randomColor} />)
          )}
        </div>
      </div>
      <AddButton/>
    </div>
  );
};

export default NotesList;
