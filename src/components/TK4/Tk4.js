import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
    <div style={{ width: '100%', margin: 'auto' }}>
      <AreaChart width={1100} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </div>
  );
}

export default Home;
