import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Board = () => {
  const [notStartedCards, setNotStartedCards] = useState([
    { id: generateUniqueId(), title: 'Card 4' },
    { id: generateUniqueId(), title: 'Card 1' },
    { id: generateUniqueId(), title: 'Card 5' }
  ]);
  const [inProgressCards, setInProgressCards] = useState([{ id: generateUniqueId(), title: 'Card 2' }]);
  const [completedCards, setCompletedCards] = useState([{ id: generateUniqueId(), title: 'Card 1' }]);

  const addNewCard = (status) => {
    const newCard = { id: generateUniqueId(), title: `New Card ${Math.max(notStartedCards.length, inProgressCards.length, completedCards.length) + 1}` };
    if (status === 'Not Started') {
      setNotStartedCards([...notStartedCards, newCard]);
    } else if (status === 'In Progress') {
      setInProgressCards([...inProgressCards, newCard]);
    } else if (status === 'Completed') {
      setCompletedCards([...completedCards, newCard]);
    }
  };

  const renameCard = (status, index) => {
    const listToUpdate = getList(status);
    const newCardName = prompt('Enter new name for the card:', listToUpdate[index].title);
    if (newCardName !== null && newCardName !== '') {
      const updatedList = [...listToUpdate.slice(0, index), { ...listToUpdate[index], title: newCardName }, ...listToUpdate.slice(index + 1)];
      setList(status, updatedList);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const sourceList = getList(source.droppableId);
    const destinationList = getList(destination.droppableId);
    const [removed] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removed);
    setList(source.droppableId, sourceList);
    setList(destination.droppableId, destinationList);
  };

  const getList = (id) => {
    if (id === 'notStarted') {
      return notStartedCards;
    } else if (id === 'inProgress') {
      return inProgressCards;
    } else if (id === 'completed') {
      return completedCards;
    }
    return [];
  };

  const setList = (id, list) => {
    if (id === 'notStarted') {
      setNotStartedCards(list);
    } else if (id === 'inProgress') {
      setInProgressCards(list);
    } else if (id === 'completed') {
      setCompletedCards(list);
    }
  };

  // Function to generate a unique ID
  function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='board-header'>
        <Droppable droppableId='notStarted'>
          {(provided) => (
            <div className='notStarted' ref={provided.innerRef} {...provided.droppableProps}>
              <div className='section-title'>
                <div>
                <span className='notStartedStatus'>Not Started</span> {notStartedCards.length}
                </div>
                
                <span className='topstart' onClick={() => addNewCard('Not Started')}>+</span>

              </div>
              {notStartedCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      className='card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDoubleClick={() => renameCard('notStarted', index)}
                    >
                      <Link to={{ pathname: `/details/notstarted/${index}`, state: { cardId: card.id, cardTitle: card.title } }} className='card-link'>
                        {card.title}
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className='add-btn' onClick={() => addNewCard('Not Started')}>
                Add New
              </button>
            </div>
          )}
        </Droppable>

        <Droppable droppableId='inProgress'>
          {(provided) => (
            <div className='inProgress' ref={provided.innerRef} {...provided.droppableProps}>
              <div className='section-title'>
                <div>

                  <span className='inProgressStatus'>In Progress</span> {inProgressCards.length}
                  </div>
                <span className='topstart' onClick={() => addNewCard('In Progress')}>+</span>
              </div>
              {inProgressCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      className='card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDoubleClick={() => renameCard('inProgress', index)}
                    >
                      <Link to={{ pathname: `/details/inprogress/${index}`, state: { cardId: card.id, cardTitle: card.title } }} className='card-link'>
                        {card.title}
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className='add-btn' onClick={() => addNewCard('In Progress')}>
                Add New
              </button>
            </div>
          )}
        </Droppable>

        <Droppable droppableId='completed'>
          {(provided) => (
            <div className='completed' ref={provided.innerRef} {...provided.droppableProps}>
              <div className='section-title'>
                <div className="">

                <span className='completedStatus'>Completed</span> {completedCards.length}
                </div>
                <span className='topstart' onClick={() => addNewCard('Completed')}>+</span>
              </div>
              {completedCards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      className='card'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDoubleClick={() => renameCard('completed', index)}
                    >
                      <Link to={{ pathname: `/details/completed/${index}`, state: { cardId: card.id, cardTitle: card.title } }} className='card-link'>
                        {card.title}
                      </Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <button className='add-btn' onClick={() => addNewCard('Completed')}>
                Add New
              </button>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
