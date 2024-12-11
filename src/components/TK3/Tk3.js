import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      <AreaChart
        width={300}
        height={250}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </div>
  );
}

export default Home;
