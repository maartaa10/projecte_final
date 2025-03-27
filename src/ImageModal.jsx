import React from 'react';
import './ImageModal.css';

function ImageModal({ element, votes, onVote, onClose, onEdit, onDelete }) {
  return (
    <div className="modal">
      <div className="modal-content">
      <div className="image-container">
  <img src={element.image} alt={element.name} className="modal-image" />
  <div className="rating-overlay">
    {[1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className="star-button"
        onClick={() => onVote(value)}
      >
        {value} ⭐
      </button>
    ))}
  </div>
</div>
<p className="votes-text">Valoració mitjana: {votes.toFixed(1)} ⭐</p>
        <div className="modal-buttons">
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
          <button onClick={onClose}>Tancar</button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;