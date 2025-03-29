import React, { useEffect, useState } from 'react';
import { getMaterials, createMaterial, updateMaterial, deleteMaterial, getMonsters, createMonster, updateMonster, deleteMonster } from './api';
import './styles.css'; 
import GameBoy from './components/GameBoy';
import ElementModal from './components/ElementModal';
import DeleteModal from './components/DeleteModal';
import ImageModal from './components/ImageModal';
import ErrorBoundary from './ErrorBoundary';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

function App() {
  const [materials, setMaterials] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState('materials');
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState({});
  const [notification, setNotification] = useState("");
 

  useEffect(() => {
    fetchMaterials();
    fetchMonsters();
    fetchVotes();

 
    socket.on("vote:update", ({ id_num, total }) => {
      console.log(`Vot actualitzat per a l'id ${id_num}: ${total}`);
      setVotes((prevVotes) => ({
        ...prevVotes,
        [id_num]: total,
      }));
    });
  
    return () => {
      socket.off("vote:update");
    };
  }, []);

  const fetchVotes = () => {
    fetch("http://localhost:3001/votes",{method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        const votesMap = data.reduce((acc, vote) => {
          acc[vote.id_num] = vote.total / (vote.count || 1);
          return acc;
        }, {});
        setVotes(votesMap);
      })
      .catch((error) => console.error("Error obtenint els vots:", error));
  };

  const fetchMaterials = () => {
    getMaterials()
      .then(response => setMaterials(response.data))
      .catch(error => setError(error.message));
  };

  const fetchMonsters = () => {
    getMonsters()
      .then(response => setMonsters(response.data))
      .catch(error => setError(error.message));
  };

  const handleSave = (element) => {
    if (currentElement) {
      if (view === 'materials') {
        updateMaterial(currentElement.id_num, element)
          .then(() => fetchMaterials())
          .catch(error => setError(error.response ? error.response.data : error.message));
      } else {
        updateMonster(currentElement.id_num, element)
          .then(() => fetchMonsters())
          .catch(error => setError(error.response ? error.response.data : error.message));
      }
    } else {
      if (view === 'materials') {
        createMaterial(element)
          .then(() => fetchMaterials())
          .catch(error => setError(error.response ? error.response.data : error.message));
      } else {
        createMonster(element)
          .then(() => fetchMonsters())
          .catch(error => setError(error.response ? error.response.data : error.message));
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (view === 'materials') {
      deleteMaterial(currentElement.id_num)
        .then(() => fetchMaterials())
        .catch(error => setError(error.message));
    } else {
      deleteMonster(currentElement.id_num)
        .then(() => fetchMonsters())
        .catch(error => setError(error.message));
    }
    setIsDeleteModalOpen(false);
  };

  const handleVote = (id_num, value) => {
    fetch("http://localhost:3001/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_num, value,user_id: crypto.randomUUID() }),
    })
      .then((response) => response.json())
      .then(() => {
  
        setVotes((prevVotes) => ({
          ...prevVotes,
          [id_num]: (prevVotes[id_num] || 0) + value,
        }));
  
        setNotification(`El material amb ID ${id_num} ha rebut un vot de ${value} ⭐!`);
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => console.error("Error enviant el vot:", error));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (view === 'materials' ? materials.length : monsters.length));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (view === 'materials' ? materials.length : monsters.length)) % (view === 'materials' ? materials.length : monsters.length));
  };

  const currentElements = view === 'materials' ? materials : monsters;
  const currentElementData = currentElements[currentIndex];
  
  return (
    <ErrorBoundary>
      <div className="App">
        <p className="title">Game App</p>
        {error && <div className="nes-text is-error">{error.message || error}</div>}
        {notification && <div className="notification">{notification}</div>}
        <GameBoy
          element={currentElementData}
          votes={votes[currentElementData?.id_num] || 0}
          onVote={(value) => handleVote(currentElementData.id_num, value)}
          onNext={handleNext}
          onPrev={handlePrev}
          onEdit={() => { setCurrentElement(currentElementData); setIsModalOpen(true); }}
          onDelete={() => { setCurrentElement(currentElementData); setIsDeleteModalOpen(true); }}
          onAdd={() => setIsModalOpen(true)}
          onViewChange={setView}
          onImageClick={() => { setCurrentElement(currentElementData); setIsImageModalOpen(true); }}
        />
        {isModalOpen && (
          <ElementModal
            element={currentElement}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
            category={view}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onDelete={handleDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
        {isImageModalOpen && (
          <ImageModal
            element={currentElement}
            votes={votes[currentElement?.id_num] || 0}
            onVote={(value) => handleVote(currentElement.id_num, value)}
            onClose={() => setIsImageModalOpen(false)}
            onEdit={() => {
              setIsImageModalOpen(false);
              setIsModalOpen(true);
            }}
            onDelete={() => {
              setIsImageModalOpen(false);
              setIsDeleteModalOpen(true);
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;