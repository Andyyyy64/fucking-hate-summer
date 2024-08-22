import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

type Data = {
  temp: number;
  humi: number;
  created_at: string;
  location: string;
}

export const App = () => {
  const [data, setData] = useState<Data[]>([]);
  const [view, setView] = useState<'full' | 'recent'>('full');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/get`);
        console.log(res.data.data);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const recentData = data.slice(-100);
  const recentChartData = {
    labels: recentData.map(d => d.created_at.slice(5, -8)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: recentData.map(d => d.temp),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: recentData.map(d => d.humi),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div>
      <h1 className=' pl-2'>Real-time Temperature and Humidity Data</h1>
      <div className=' text-center'>
        <button className=' bg-black rounded-xl text-white p-2 m-2 cursor-pointer' onClick={() => setView('full')}>Full Dataset</button>
        <button className=' bg-black rounded-xl text-white p-2 m-2 cursor-pointer' onClick={() => setView('recent')}>Recent</button>
      </div>
      {view === 'full' ? (
        <>
          <h2>Full Dataset</h2>
            <Line data={chartData} options={options} />
        </>
      ) : (
        <>
          <h2>Recent</h2>
          <Line data={recentChartData} options={options} />
        </>
      )}
    </div>
  );
};
