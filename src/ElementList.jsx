import React from 'react';

function ElementList({ elements, onEdit, onDelete, setIsModalOpen, setIsDeleteModalOpen }) {
  return (
    <div className="row">
      {elements.map(element => (
        <div className="col-md-4" key={element.id_num}>
          <div className="card mb-4">
            <img src={element.image} className="card-img-top" alt={element.name} />
            <div className="card-body">
              <h5 className="card-title">{element.name}</h5>
              <button className="btn btn-primary" onClick={() => { onEdit(element); setIsModalOpen(true); }}>Edit</button>
              <button className="btn btn-danger" onClick={() => { onDelete(element); setIsDeleteModalOpen(true); }}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ElementList;