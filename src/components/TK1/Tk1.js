import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function Home() {
  const data = [
    {
      name: 'Nordic Chair',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Kruzo Aero Chair',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Ergonomic Chair',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Nordic Chair-2',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Kruzo Aero Chair-2',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Ergonomic Chair-2',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <BarChart
        width={350}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
}

export default Home;
