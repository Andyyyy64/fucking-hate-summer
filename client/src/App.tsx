import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = 'https://fucking-hate-summer.onrender.com/data';

type Data = {
  temp: number;
  humi: number;
  created_at: string;
  location: string;
}

export const App = () => {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/get`);
        console.log(res.data.data)
        setData(res.data.data)
      }catch(err) {
        console.log(err);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000); // 3秒ごとに更新

    return () => clearInterval(interval);
  }, [])

  const chartData = {
    labels: data.map(d => d.created_at.slice(5, -8)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(d => d.temp),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: data.map(d => d.humi),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div>
      <h1>Real-time Temperature and Humidity Data</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};
