import React from 'react';
import './Grafics.css';

function GraphModal({ currentGraph, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Estadístiques</h2>
        {currentGraph}
        <div className="modal-buttons">
          <button onClick={onClose}>Tancar</button>
        </div>
      </div>
    </div>
  );
}

export default GraphModal;