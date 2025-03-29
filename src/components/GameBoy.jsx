import React, { useState, useEffect } from 'react';
import './GameBoy.css';
import 'chart.js/auto';
import GraphModal from './GraphModal';
import VotesPerDayGraph from './VotesPerDayGraph';
import VotesPerElementGraph from './VotesPerElementGraph';
import { getMaterials, getMonsters } from '../api';

function GameBoy({ element, votes = 0, onNext, onPrev, onEdit, onDelete, onAdd, onViewChange, onImageClick }) {
  const [currentView, setCurrentView] = useState('materials'); 
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0); 
  const [materials, setMaterials] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materialsResponse = await getMaterials();
        const monstersResponse = await getMonsters();
        setMaterials(materialsResponse.data);
        setMonsters(monstersResponse.data);
      } catch (error) {
        console.error('Error al carregar dades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="gameboy-text">carregant dades...</p>;
  }


  const votesPerDayData = {
    labels: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05'],
    datasets: [
      {
        label: 'Vots per día',
        data: [5, 10, 7, 12, 8],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  
  const votesPerElementData = {
    labels: [...materials.map(m => m.name), ...monsters.map(m => m.name)],
    datasets: [
      {
        label: 'Vots per element',
        data: [...materials.map(m => m.votes || 0), ...monsters.map(m => m.votes || 0)],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };


  const graphs = [
    <VotesPerDayGraph data={votesPerDayData} />,
    <VotesPerElementGraph data={votesPerElementData} />,
  ];

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (onViewChange) onViewChange(view);
  };

  const handleScreenClick = () => {
    if (currentView === 'statistics') {
      setIsGraphModalOpen(true);
    }
  };

  const handleNext = () => {
    if (currentView === 'statistics') {
      setCurrentGraphIndex((prev) => (prev + 1) % graphs.length); 
    } else {
      onNext(); 
    }
  };

  const handlePrev = () => {
    if (currentView === 'statistics') {
      setCurrentGraphIndex((prev) => (prev - 1 + graphs.length) % graphs.length); 
    } else {
      onPrev(); 
    }
  };

  return (
    <div className="gameboy">
      <div className="screen-area">
        <div className="screen" onClick={handleScreenClick}>
          <div className="display">
            {currentView === 'materials' && element ? (
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
            ) : currentView === 'monsters' && element ? (
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
                  <p className="drops gameboy-text">
                    <strong>Drop:</strong> {element.drops?.[0] || "Sense drop"}
                  </p>
                </div>
              </div>
            ) : currentView === 'statistics' ? (
              graphs[currentGraphIndex] 
            ) : (
              <p className="gameboy-text">No hi ha elements disponibles</p>
            )}
          </div>
        </div>
      </div>
      <div className="controls">
        <div className="dpad">
          <div className="up" onClick={handlePrev}>
            <i>▲</i>
          </div>
          <div className="left" onClick={onPrev}>
            ◀
          </div>
          <div className="center"></div>
          <div className="right" onClick={onNext}>
            ▶
          </div>
          <div className="down" onClick={handleNext}>
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
        <div className="btn-select gameboy-text" onClick={() => handleViewChange('materials')}>
          Materials
        </div>
        <div className="btn-select gameboy-text" onClick={() => handleViewChange('monsters')}>
          Monsters
        </div>
        <div className="btn-select gameboy-text" onClick={() => handleViewChange('statistics')}>
          Estadístiques
        </div>
      </div>

      {isGraphModalOpen && (
        <GraphModal
          currentGraph={graphs[currentGraphIndex]} 
          onClose={() => setIsGraphModalOpen(false)}
        />
      )}
    </div>
  );
}

export default GameBoy;