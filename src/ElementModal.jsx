import React, { useState, useEffect } from 'react';
import './ElementModal.css';

function ElementModal({ element, onSave, onClose }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [commonLocations, setCommonLocations] = useState([]);
  const [cookingEffect, setCookingEffect] = useState('');
  const [heartsRecovered, setHeartsRecovered] = useState('');
  const [idNum, setIdNum] = useState(null);

  useEffect(() => {
    if (element) {
      setName(element.name || '');
      setImage(element.image || '');
      setDescription(element.description || '');
      setCategory(element.category || '');
      setCommonLocations(element.common_locations || []);
      setCookingEffect(element.cooking_effect || '');
      setHeartsRecovered(element.hearts_recovered || null);
      setIdNum(element.id_num || null);
    }
  }, [element]);

  const handleSave = () => {
    const newElement = {
      _id: element ? element._id : undefined,
      category: category.trim() || null, 
      name: name.trim() || null, 
      common_locations: commonLocations.length > 0 ? commonLocations : null, 
      cooking_effect: cookingEffect.trim() || null, 
      description: description.trim() || null, 
      hearts_recovered: heartsRecovered !== null && heartsRecovered !== '' ? heartsRecovered : null,
      id_num: idNum || Math.floor(Math.random() * 1000000),
      image: image.trim() || null, 
      createdAt: element ? element.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  
   
    onSave(newElement);
  };

 

  const handleAddLocation = () => {
    setCommonLocations([...commonLocations, '']);
  };

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...commonLocations];
    updatedLocations[index] = value;
    setCommonLocations(updatedLocations);
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = commonLocations.filter((_, i) => i !== index);
    setCommonLocations(updatedLocations);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{element ? 'Editar Element' : 'Afegir Element'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div>
          <label>Common Locations:</label>
          {commonLocations.map((location, index) => (
            <div key={index} className="location-item">
              <input
                type="text"
                placeholder={`Location ${index + 1}`}
                value={location}
                onChange={(e) => handleLocationChange(index, e.target.value)}
              />
              <button onClick={() => handleRemoveLocation(index)}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddLocation}>Add Location</button>
        </div>
        <input
          type="text"
          placeholder="Cooking Effect"
          value={cookingEffect}
          onChange={(e) => setCookingEffect(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hearts Recovered"
          value={heartsRecovered || ''}
          onChange={(e) => setHeartsRecovered(e.target.value ? parseFloat(e.target.value) : null)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>{element ? 'Update' : 'Add'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ElementModal;