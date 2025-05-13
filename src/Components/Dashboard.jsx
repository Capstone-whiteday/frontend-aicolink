import './Dashboard.css';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const batteryData = [
  { name: '00:00', battery: 400 },
  { name: '06:00', battery: 300 },
  { name: '12:00', battery: 200 },
  { name: '18:00', battery: 278 },
  { name: '24:00', battery: 189 },
];

const consumptionData = [
  { name: '00:00', consumption: 240 },
  { name: '06:00', consumption: 139 },
  { name: '12:00', consumption: 980 },
  { name: '18:00', consumption: 390 },
  { name: '24:00', consumption: 480 },
];

const touData = [
  { name: '00:00', tou: 120 },
  { name: '06:00', tou: 150 },
  { name: '12:00', tou: 300 },
  { name: '18:00', tou: 200 },
  { name: '24:00', tou: 100 },
];

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState('battery'); // 초기값: 배터리 데이터

  const getData = () => {
    if (selectedData === 'battery') return batteryData;
    if (selectedData === 'consumption') return consumptionData;
    if (selectedData === 'tou') return touData;
    if (selectedData === 'all') {
      return batteryData.map((item, index) => ({
        name: item.name,
        battery: item.battery,
        consumption: consumptionData[index]?.consumption,
        tou: touData[index]?.tou,
      }));
    }
  };

  return (
    <main className="dashboard">
      {/* 제목 영역 */}
      <div className="dashboard-header">
        <h1 className="station-name">VOLTP 제주동부점</h1>
        <span className="date-label">MAR.21</span>
      </div>

      {/* 그래프 카드 */}
      <div className="graph-section">
        <div className="graph-header">
          <p>일일예측</p>
          <div className="graph-tabs">
            <button className={selectedData === 'battery' ? 'active' : ''} onClick={() => setSelectedData('battery')}>
              Battery Power
            </button>
            <button className={selectedData === 'consumption' ? 'active' : ''} onClick={() => setSelectedData('consumption')}>
              Consumption
            </button>
            <button className={selectedData === 'tou' ? 'active' : ''} onClick={() => setSelectedData('tou')}>
              TOU
            </button>
            <button className={selectedData === 'all' ? 'active' : ''} onClick={() => setSelectedData('all')}>
              All Together
            </button>
          </div>
          <button className="export-btn">📄 Export PDF</button>
        </div>
        <div className="graph-placeholder">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedData === 'battery' || selectedData === 'all' ? (
                <Line type="monotone" dataKey="battery" stroke="#8884d8" activeDot={{ r: 8 }} />
              ) : null}
              {selectedData === 'consumption' || selectedData === 'all' ? (
                <Line type="monotone" dataKey="consumption" stroke="#82ca9d" />
              ) : null}
              {selectedData === 'tou' || selectedData === 'all' ? (
                <Line type="monotone" dataKey="tou" stroke="#ffc658" />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 결과 요약 바 */}
      <div className="charge-bar">
        <p><strong>AICOLINK</strong>가 예상하는 <span className="charge">CHARGE</span> or <span className="discharge">DISCHARGE</span></p>
      </div>
    </main>
  );
};

export default Dashboard;