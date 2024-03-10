import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CardDetailsPage.css'; // Import your CSS file

function CardDetailsPage() {
  const { status, index } = useParams();
  const [card, setCard] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    const statusCards = storedCards[status];
    if (!statusCards || !statusCards[index]) {
      console.error('Status or index not found in storedCards');
      return;
    }
    const foundCard = statusCards[index];
    setCard(foundCard);
    setEditedTitle(foundCard.title); // Initialize editedTitle with the original title
    setEditedDescription(foundCard.description);
  }, [status, index]);

  const handleEdit = () => {

    try {
      const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
      const parsedIndex = parseInt(index, 10);
      if (storedCards[status] && storedCards[status][parsedIndex]) {
        storedCards[status][parsedIndex].title = editedTitle;
        storedCards[status][parsedIndex].description = editedDescription;
        localStorage.setItem('cards', JSON.stringify(storedCards));
        setCard({ ...card, title: editedTitle, description: editedDescription });
      } else {
        throw new Error('Status or index not found in storedCards');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = () => {
    const storedCards = JSON.parse(localStorage.getItem('cards')) || [];
    const parsedIndex = parseInt(index, 10);
    if (storedCards[status] && storedCards[status][parsedIndex]) {
      storedCards[status].splice(parsedIndex, 1);
      localStorage.setItem('cards', JSON.stringify(storedCards));
      navigate('/');
    }
  };

  const clickHandler = ()=>{
    navigate('/');
  }

  return (
    <div className="container"> {/* Apply the CSS styles to this container */}
      <h1>Task Details</h1>
      <div>
        <label>Title:</label>
        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
      </div>
      <button onClick={clickHandler}>Save</button>
      <button onClick={clickHandler}>Delete</button>
    </div>
  );
}

export default CardDetailsPage;
