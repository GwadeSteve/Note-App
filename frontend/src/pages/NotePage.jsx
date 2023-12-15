import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Auth.css';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {

    const token = localStorage.getItem('userToken');
    if (!token ) {
      console.log('Token Not found')
      navigate('/');
    }
    if (!id) {
      navigate('/notes');
    } else if (id === "create") {
      setNote({ title: '', content: '' });
    } else {
      const getNote = async () => {
        try {
          const token = localStorage.getItem('userToken');
          let response = await fetch(`/api/notes/${id}/`, {
            method: 'GET',
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.ok) {
            let data = await response.json();
            setNote(data);
          } else {
            setNote({ title: '', content: '' });
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      };
      getNote();
    }
  }, [id, navigate]);

  const updateNote = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await fetch(`/api/notes/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(note),
      });
      setTimeout(() => {
        navigate('/notes');
        alert('Note updated successfully!');
      }, 500);
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note. Please try again.');
    }
  }

  const deleteNote = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await fetch(`/api/notes/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      setTimeout(() => {
        navigate('/notes');
        alert('Note deleted successfully!');
      }, 500);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
    }
  }

  const createNote = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await fetch(`/api/notes/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(note),
      });
      setTimeout(() => {
        navigate('/notes');
        alert('Note created successfully!');
      }, 500);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    }
  }

  const handleSubmit = () => {
    if (id !== 'create' && !note.content) {
      deleteNote();
      setTimeout(() => {
        alert('You saved a Note with an empty content and hence was deleted.');
      }, 500);
    } else if (id !== 'create' && !note.title && !note.content) {
      deleteNote();
      setTimeout(() => {
        alert('You saved a Note with an empty title and content and hence was deleted.');
      }, 500);
    } else if (id !== 'create') {
      updateNote();
    } else if (!note.title || !note.content) {
      alert('Please enter both title and content.');
    } else {
      createNote();
    }
  }

  let formatDate = (date) => {
    const formattedDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDateTime = formattedDate.toLocaleDateString(undefined, options);
    return formattedDateTime
  }

  let formatTime = (date) => {
    const formattedTime = new Date(date);
    const options = { hour: 'numeric', minute: 'numeric' };
    const formattedDateTime = formattedTime.toLocaleTimeString(undefined, options);
    return formattedDateTime
  }


  return (
    <div className='TextAreas'>
      { id !== 'create' ? (
      <>
        <div className='LastEdit'>Last edit on {formatDate(note.updated_at)} at {formatTime(note.updated_at)}</div>
        <textarea onChange={(e) => setNote({ ...note, "title": e.target.value })} value={note.title} placeholder='Title' className='TypeTitle' required></textarea>
        <textarea onChange={(e) => setNote({ ...note, "content": e.target.value })} value={note.content} placeholder='Enter note body' className='TypeContent' required></textarea>
        <div className='Buttons'>
          <button type="button" className='Save' onClick={handleSubmit}>Save</button>
          <button type="button" className='Delete' onClick={deleteNote}>Delete</button>
        </div>
      </>
) : (
      <>
        <div className='LastEdit'>Creating new note</div>
        <textarea onChange={(e) => setNote({ ...note, "title": e.target.value })} value={note.title} placeholder='Title' className='TypeTitle' required></textarea>
        <textarea onChange={(e) => setNote({ ...note, "content": e.target.value })} value={note.content} placeholder='Enter note body' className='TypeContent' required></textarea>
        <div className='Buttons'>
          <button type="button" className='Create' onClick={handleSubmit}>Create</button>
        </div>
      </>
)}
    </div>
  );
};

export default NotePage;

