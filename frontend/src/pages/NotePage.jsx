import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
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

  return (
    <div className='TextAreas'>
      <>
        <textarea onChange={(e) => setNote({ ...note, "title": e.target.value })} value={note.title} required></textarea>
        <textarea onChange={(e) => setNote({ ...note, "content": e.target.value })} value={note.content} required></textarea>
        {id !== 'create' ? (
          <>
            <button type="button" className='Save' onClick={handleSubmit}>Save</button>
            <button type="button" className='Delete' onClick={deleteNote}>Delete</button>
          </>
        ) : (
          <button type="button" className='Save' onClick={handleSubmit}>Create</button>
        )}
      </>
    </div>
  );
};

export default NotePage;