import React, { useState, useEffect } from "react";
import "./ElementModal.css";

function ElementModal({ element, onSave, onClose, category }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [commonLocations, setCommonLocations] = useState([]);
  const [cookingEffect, setCookingEffect] = useState("");
  const [heartsRecovered, setHeartsRecovered] = useState(0);
  const [drops, setDrops] = useState([]);
  const [idNum, setIdNum] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (element) {
      setName(element.name || "");
      setImage(element.image || "");
      setDescription(element.description || "");
      setCommonLocations(element.common_locations || []);
      setCookingEffect(element.cooking_effect || "");
      setHeartsRecovered(element.hearts_recovered || 0);
      setDrops(element.drops || []);
      setIdNum(element.id_num || 0);
    }
  }, [element]);

  const validate = () => {
    const newErrors = {};
    if (name.trim().length < 3) {
      newErrors.name = "El nom ha de tenir almenys 3 caràcters.";
    }
    if (description.trim().length < 3) {
      newErrors.description = "La descripció ha de tenir almenys 3 caràcters.";
    }
    if (category === "materials" && (isNaN(heartsRecovered) || heartsRecovered < 0)) {
      newErrors.heartsRecovered = "Els cors recuperats han de ser un número positiu.";
    }
    if (category === "monsters") {
      if (drops.length === 0) {
        newErrors.drops = "Els monstres han de tenir almenys un drop.";
      } else if (drops.some(drop => drop.trim() === "")) {
        newErrors.drops = "Els drops no poden estar buits.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const newElement = {
      category,
      name: name.trim(),
      common_locations: commonLocations.length > 0 ? commonLocations : [],
      cooking_effect: category === "materials" ? cookingEffect.trim() : undefined,
      description: description.trim(),
      hearts_recovered: category === "materials" ? heartsRecovered : undefined,
      drops: category === "monsters" ? drops : undefined,
      id_num: idNum || Math.floor(Math.random() * 1000000),
      image: image.trim(),
    };

    onSave(newElement);
  };

  const handleAddDrop = () => {
    setDrops([...drops, ""]);
  };

  const handleDropChange = (index, value) => {
    const updatedDrops = [...drops];
    updatedDrops[index] = value;
    setDrops(updatedDrops);
  };

  const handleRemoveDrop = (index) => {
    const updatedDrops = drops.filter((_, i) => i !== index);
    setDrops(updatedDrops);
  };

  const handleAddLocation = () => {
    setCommonLocations([...commonLocations, ""]);
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
        <h2>{element ? "Editar Element" : "Afegir Element"}</h2>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="text"
          placeholder="URL de la Imatge"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Descripció"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="error">{errors.description}</p>}
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          readOnly
          style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
        />
        <div>
          <label>Ubicacions:</label>
          {commonLocations.map((location, index) => (
            <div key={index} className="location-item">
              <input
                type="text"
                placeholder={`Ubicació ${index + 1}`}
                value={location}
                onChange={(e) => handleLocationChange(index, e.target.value)}
              />
              <button onClick={() => handleRemoveLocation(index)}>Eliminar</button>
            </div>
          ))}
          <button onClick={handleAddLocation}>Afegir Ubicació</button>
        </div>

        {category === "materials" && (
          <>
            <input
              type="text"
              placeholder="Cooking Effect"
              value={cookingEffect}
              onChange={(e) => setCookingEffect(e.target.value)}
            />
            <input
              type="number"
              placeholder="Hearts Recovered"
              value={heartsRecovered}
              onChange={(e) => setHeartsRecovered(e.target.value)}
            />
            {errors.heartsRecovered && <p className="error">{errors.heartsRecovered}</p>}
          </>
        )}

        {category === "monsters" && (
          <div>
            <label>Drops:</label>
            {drops.map((drop, index) => (
              <div key={index} className="drop-item">
                <input
                  type="text"
                  placeholder={`Drop ${index + 1}`}
                  value={drop}
                  onChange={(e) => handleDropChange(index, e.target.value)}
                />
                <button onClick={() => handleRemoveDrop(index)}>Eliminar</button>
              </div>
            ))}
            <button onClick={handleAddDrop}>Afegir Drop</button>
            {errors.drops && <p className="error">{errors.drops}</p>}
          </div>
        )}

        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Tancar</button>
      </div>
    </div>
  );
}

export default ElementModal;