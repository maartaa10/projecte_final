import React from 'react';
import './DeleteModal.css';

function DeleteModal({ onDelete, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmar operacio</h2>
        <p>El vols eliminar?</p>
        <div className="modal-buttons">
          <button onClick={onDelete}>eliminar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;