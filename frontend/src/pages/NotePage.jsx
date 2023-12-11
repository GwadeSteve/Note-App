import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let [note, setNote] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/notes'); 
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
            setNote(null);
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      };

      getNote();
    }
  }, [id, navigate]);

  return (
    <div>
      <>
        <h2>{note?.title}</h2>
        <h3>{note?.content}</h3>
      </>
    </div>
  );
};

export default NotePage;
