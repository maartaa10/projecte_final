import React from 'react';
import './GameBoy.css';

function GameBoy({ element, votes = 0, onNext, onPrev, onEdit, onDelete, onAdd, onViewChange, onImageClick }) {
  return (
    <div className="gameboy">
      <div className="screen-area">
        <div className="screen">
          <div className="display">
            {element ? (
              <div id="screen">
            
                <div className="upper-section">
                  <h2 className="element-name gameboy-text">{element.name}</h2>
                  <img
                    className="element-image"
                    src={element.image}
                    alt={element.name}
                    onClick={onImageClick}
                  />
                  <p className="element-description gameboy-text">{element.description}</p>
                </div>

                <div className="lower-section">
                  {element.hearts_recovered !== undefined ? (
                    <p className="hearts-recovered gameboy-text">
                      <strong>Hearts Recovered:</strong> {element.hearts_recovered || 0}
                    </p>
                  ) : (
                    <div className="drops-container">
                      <p className="drops gameboy-text">
                      <strong>Drop:</strong> {element.drops?.[0] || "Sense drop"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="gameboy-text">No hi ha elements disponibles</p>
            )}
          </div>
        </div>
      </div>
      <div className="controls">
        <div className="dpad">
          <div className="up" onClick={onPrev}>
            <i>▲</i>
          </div>
          <div className="left" onClick={onPrev}>
            ◀
          </div>
          <div className="center"></div>
          <div className="right" onClick={onNext}>
            ▶
          </div>
          <div className="down" onClick={onNext}>
            <i>▼</i>
          </div>
        </div>

        <div className="btn-circle">
          <div className="btn-e" onClick={onEdit}>
            E
          </div>
          <div className="btn-a" onClick={onAdd}>
            A
          </div>
          <div className="btn-d" onClick={onDelete}>
            D
          </div>
        </div>
      </div>

      <div className="btn-start-select">
        <div className="btn-select gameboy-text" onClick={() => onViewChange('materials')}>
          Materials
        </div>
        <div className="btn-select gameboy-text" onClick={() => onViewChange('monsters')}>
          Monsters
        </div>
      </div>
    </div>
  );
}

export default GameBoy;