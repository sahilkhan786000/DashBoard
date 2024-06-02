import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsFillBarChartFill, BsFillDiagram3Fill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import data from './eve.json';

const COLORS = ['#10E7DC', '#0074E1', '#1B9CE5', '#8e35f4'];

export default function Home() {

  // Processing data to fit into charts
  const processedData = data.map((item, index) => ({
    name: `Event ${index + 1}`,
    flow_id: item.flow_id / 100000, // Scale down flow_id values
    src_port: item.src_port,
    dest_port: item.dest_port,
    severity: item.alert ? item.alert.severity : 0,
    proto: item.proto,
  }));

  const severityData = [
    { name: 'Severity 1', value: data.filter(item => item.alert && item.alert.severity === 1).length },
    { name: 'Severity 2', value: data.filter(item => item.alert && item.alert.severity === 2).length },
    { name: 'Severity 3', value: data.filter(item => item.alert && item.alert.severity === 3).length },
  ];

  const categoryData = Array.from(
    data.reduce((map, item) => {
      const category = item.alert ? item.alert.category : 'Unknown';
      map.set(category, (map.get(category) || 0) + 1);
      return map;
    }, new Map()),
    ([name, value]) => ({ name, value })
  );

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>EVENTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{data.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{categoryData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>SEVERITY 2 ALERTS</h3>
            <BsFillBarChartFill className='card_icon' />
          </div>
          <h1>{severityData[1].value}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>TCP TRAFFIC</h3>
            <BsFillDiagram3Fill className='card_icon' />
          </div>
          <h1>{data.filter(item => item.proto === 'TCP').length}</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='chart-container'>
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="src_port" fill="#8e35f4" />
              <Bar dataKey="dest_port" fill="#1B9CE5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-container'>
  <ResponsiveContainer width="100%" height={300} style={{ margin: '-30px', padding: '20px' }}>
    <AreaChart data={processedData} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" domain={['auto', 'auto']} /> {/* Y-axis for flow_id */}
      <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} /> {/* Y-axis for src_port and dest_port */}
      <Tooltip />
      <Legend />
      <Area yAxisId="left" type="monotone" dataKey="flow_id" stroke="#8e35f4" fill="#8e35f4" />
      <Area yAxisId="right" type="monotone" dataKey="src_port" stroke="#1B9CE5" fill="#1B9CE5" />
      <Area yAxisId="right" type="monotone" dataKey="dest_port" stroke="#10E7DC" fill="#10E7DC" />

      {/* Text annotations */}
      <text x="10" y="10" style={{ fontSize: '12px', fill: '#8e35f4' }}>&lt;- Flow ID (divided by 100,000)</text>
      <text x="770" y="10" style={{ fontSize: '12px', fill: '#1B9CE5' }}>&lt;- Source Port</text>
      <text x="770" y="20" style={{ fontSize: '12px', fill: '#10E7DC' }}>&lt;- Destination Port</text>
    </AreaChart>
  </ResponsiveContainer>
</div>



        <div className='chart-container'>
          <ResponsiveContainer width="80%" height={300}>
            <PieChart>
              <Pie data={severityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='chart-container'>
          <ResponsiveContainer width="80%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        
      </div>
    </main>
  );
}
