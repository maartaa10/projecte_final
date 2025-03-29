import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getMaterials, getMonsters } from '../api';
import 'chart.js/auto';

function VotesPerElementGraph() {
  const [chartData, setChartData] = useState(null);

  const fetchVotesPerElement = async () => {
    try {
      const [materialsResponse, monstersResponse] = await Promise.all([getMaterials(), getMonsters()]);
      const materials = materialsResponse.data;
      const monsters = monstersResponse.data;

      const data = {
        labels: [...materials.map((m) => m.name), ...monsters.map((m) => m.name)],
        datasets: [
          {
            label: 'Vots per elements',
            data: [...materials.map((m) => m.votes), ...monsters.map((m) => m.votes)],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    } catch (error) {
      console.error('Error al obtenir els vots per elements:', error);
    }
  };

  useEffect(() => {
    fetchVotesPerElement();
  }, []);

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h3>vots per elements</h3>
      {chartData ? <Bar data={chartData} /> : <p>Carregant dades...</p>}
    </div>
  );
}

export default VotesPerElementGraph;