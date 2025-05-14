import './Dashboard.css';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const batteryData = [
  { name: '00:00', battery: 400 },
  { name: '01:00', battery: 380 },
  { name: '02:00', battery: 360 },
  { name: '03:00', battery: 340 },
  { name: '04:00', battery: 320 },
  { name: '05:00', battery: 310 },
  { name: '06:00', battery: 300 },
  { name: '07:00', battery: 290 },
  { name: '08:00', battery: 280 },
  { name: '09:00', battery: 270 },
  { name: '10:00', battery: 260 },
  { name: '11:00', battery: 250 },
  { name: '12:00', battery: 240 },
  { name: '13:00', battery: 230 },
  { name: '14:00', battery: 220 },
  { name: '15:00', battery: 210 },
  { name: '16:00', battery: 200 },
  { name: '17:00', battery: 190 },
  { name: '18:00', battery: 180 },
  { name: '19:00', battery: 170 },
  { name: '20:00', battery: 160 },
  { name: '21:00', battery: 150 },
  { name: '22:00', battery: 140 },
  { name: '23:00', battery: 130 },
  { name: '24:00', battery: 120 },
];

// const consumptionData = [
//   { name: '00:00', consumption: 240 },
//   { name: '01:00', consumption: 230 },
//   { name: '02:00', consumption: 220 },
//   { name: '03:00', consumption: 210 },
//   { name: '04:00', consumption: 200 },
//   { name: '05:00', consumption: 190 },
//   { name: '06:00', consumption: 180 },
//   { name: '07:00', consumption: 170 },
//   { name: '08:00', consumption: 160 },
//   { name: '09:00', consumption: 150 },
//   { name: '10:00', consumption: 140 },
//   { name: '11:00', consumption: 130 },
//   { name: '12:00', consumption: 120 },
//   { name: '13:00', consumption: 110 },
//   { name: '14:00', consumption: 100 },
//   { name: '15:00', consumption: 90 },
//   { name: '16:00', consumption: 80 },
//   { name: '17:00', consumption: 70 },
//   { name: '18:00', consumption: 60 },
//   { name: '19:00', consumption: 50 },
//   { name: '20:00', consumption: 40 },
//   { name: '21:00', consumption: 30 },
//   { name: '22:00', consumption: 20 },
//   { name: '23:00', consumption: 10 },
//   { name: '24:00', consumption: 5 },
// ];

const touData = [
  { name: '00:00', tou: 120 },
  { name: '01:00', tou: 115 },
  { name: '02:00', tou: 110 },
  { name: '03:00', tou: 105 },
  { name: '04:00', tou: 100 },
  { name: '05:00', tou: 95 },
  { name: '06:00', tou: 90 },
  { name: '07:00', tou: 85 },
  { name: '08:00', tou: 80 },
  { name: '09:00', tou: 75 },
  { name: '10:00', tou: 70 },
  { name: '11:00', tou: 65 },
  { name: '12:00', tou: 60 },
  { name: '13:00', tou: 55 },
  { name: '14:00', tou: 50 },
  { name: '15:00', tou: 45 },
  { name: '16:00', tou: 40 },
  { name: '17:00', tou: 35 },
  { name: '18:00', tou: 30 },
  { name: '19:00', tou: 25 },
  { name: '20:00', tou: 20 },
  { name: '21:00', tou: 15 },
  { name: '22:00', tou: 10 },
  { name: '23:00', tou: 5 },
  { name: '24:00', tou: 0 },
];

const chargeDischargeData = [
  { name: '00:00', status: 'charge' },
  { name: '01:00', status: 'charge' },
  { name: '02:00', status: 'charge' },
  { name: '03:00', status: 'discharge' },
  { name: '04:00', status: 'discharge' },
  { name: '05:00', status: 'charge' },
  { name: '06:00', status: 'charge' },
  { name: '07:00', status: 'discharge' },
  { name: '08:00', status: 'discharge' },
  { name: '09:00', status: 'charge' },
  { name: '10:00', status: 'charge' },
  { name: '11:00', status: 'discharge' },
  { name: '12:00', status: 'discharge' },
  { name: '13:00', status: 'charge' },
  { name: '14:00', status: 'charge' },
  { name: '15:00', status: 'discharge' },
  { name: '16:00', status: 'discharge' },
  { name: '17:00', status: 'charge' },
  { name: '18:00', status: 'charge' },
  { name: '19:00', status: 'discharge' },
  { name: '20:00', status: 'discharge' },
  { name: '21:00', status: 'charge' },
  { name: '22:00', status: 'charge' },
  { name: '23:00', status: 'discharge' },
  { name: '24:00', status: 'discharge' },
];

const Dashboard = () => {
  const [selectedData, setSelectedData] = useState('battery'); // 초기값: 배터리 데이터

  const getData = () => {
    if (selectedData === 'battery') return batteryData;
    // if (selectedData === 'consumption') return consumptionData;
    if (selectedData === 'tou') return touData;
    if (selectedData === 'all') {
      return batteryData.map((item, index) => ({
        name: item.name,
        battery: item.battery,
        // consumption: consumptionData[index]?.consumption,
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
            {/* <button className={selectedData === 'consumption' ? 'active' : ''} onClick={() => setSelectedData('consumption')}>
              Consumption
            </button> */}
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
<ResponsiveContainer width="100%" height={450}>
  <LineChart data={getData()}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
      dataKey="name" 
      tickFormatter={(tick) => {
        // 06, 12, 18, 24시에만 표시
        return ['06:00', '12:00', '18:00', '24:00'].includes(tick) ? tick : '';
      }} 
    />
    {/* 첫 번째 Y축: 전력량 (battery) */}
    <YAxis 
      yAxisId="left" 
      label={{ value: '전력량 (kWh)', angle: -90, position: 'insideLeft' }} 
    />
    {/* 두 번째 Y축: TOU 값 */}
    <YAxis 
      yAxisId="right" 
      orientation="right" 
      label={{ value: 'TOU (원)', angle: -90, position: 'insideRight' }} 
    />
    <Tooltip />
    <Legend />
    {selectedData === 'battery' || selectedData === 'all' ? (
      <Line 
        type="monotone" 
        dataKey="battery" 
        stroke="#8884d8" 
        strokeWidth={3} 
        dot={false} 
        yAxisId="left" // 첫 번째 Y축에 연결
      />
    ) : null}
    {selectedData === 'tou' || selectedData === 'all' ? (
      <Line 
        type="monotone" 
        dataKey="tou" 
        stroke="#ffc658" 
        strokeWidth={3} 
        dot={false} 
        yAxisId="right" // 두 번째 Y축에 연결
      />
    ) : null}
  </LineChart>
</ResponsiveContainer>
        </div>
      </div>

      {/* 결과 요약 바 */}
      <div className="charge-bar">
  <div className="charge-discharge-chart">
    {chargeDischargeData.map((item, index) => (
      <div
        key={index}
        className="charge-discharge-bar"
        style={{
          backgroundColor: item.status === 'charge' ? '#365BAC' : '#99FFE4',
          width: `${100 / chargeDischargeData.length}%`, // 각 막대의 너비를 균등하게 설정
        }}
      ></div>
    ))}
  </div>
  <p>
    <strong>AICOLINK</strong>가 예상하는 <span className="charge">CHARGE</span> or <span className="discharge">DISCHARGE</span>
  </p>
</div>
    </main>
  );
};

export default Dashboard;