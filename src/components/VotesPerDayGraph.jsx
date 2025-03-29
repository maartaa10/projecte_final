import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function VotesPerDayGraph() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
  
    const generateFakeData = () => {
      const days = [];
      const votes = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(date.toLocaleDateString()); 
        votes.push(Math.floor(Math.random() * 100));
      }

      return { days, votes };
    };

    const { days, votes } = generateFakeData();

   
    const data = {
      labels: days, 
      datasets: [
        {
          label: 'Vots per día',
          data: votes,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', 
          borderColor: 'rgba(54, 162, 235, 1)', 
          borderWidth: 2,
          tension: 0.4, 
        },
      ],
    };

    setChartData(data);
  }, []);

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h3>Vots per día</h3>
      {chartData ? <Line data={chartData} /> : <p>Carregabt dades...</p>}
    </div>
  );
}

export default VotesPerDayGraph;