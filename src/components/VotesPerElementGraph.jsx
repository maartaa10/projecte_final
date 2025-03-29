import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function VotesPerElementGraph() {
  const [chartData, setChartData] = useState(null);

  const fetchVotesPerElement = async () => {
    try {
      const votesResponse = await axios.get('http://localhost:3001/votes');
      const votesData = votesResponse.data;

      const [materialsResponse, monstersResponse] = await Promise.all([
        axios.get('http://localhost:3001/materials'),
        axios.get('http://localhost:3001/monsters'),
      ]);
      const materials = materialsResponse.data;
      const monsters = monstersResponse.data;

      const filteredVotes = votesData.filter((vote) => vote.total > 0);

      const labels = filteredVotes.map((vote) => {
        const material = materials.find((m) => m.id_num === vote.id_num);
        const monster = monsters.find((m) => m.id_num === vote.id_num);
        return material?.name || monster?.name || `ID ${vote.id_num}`;
      });

      const dataValues = filteredVotes.map((vote) => vote.total);

      const data = {
        labels,
        datasets: [
          {
            label: 'Vots per element',
            data: dataValues,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    } catch (error) {
      console.error('Error al obtenir els vots per element:', error);
    }
  };

  useEffect(() => {
    fetchVotesPerElement();
  }, []);

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h3>Vots per element</h3>
      {chartData ? <Bar data={chartData} /> : <p>Carregant dades...</p>}
    </div>
  );
}

export default VotesPerElementGraph;