import './Dashboard.css';
import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Sidebar from './Sidebar';

// ------------------ 데이터 정의 ------------------

const batteryData = [
  { name: '00:00', battery: 400 }, { name: '01:00', battery: 380 }, { name: '02:00', battery: 360 },
  { name: '03:00', battery: 340 }, { name: '04:00', battery: 320 }, { name: '05:00', battery: 310 },
  { name: '06:00', battery: 300 }, { name: '07:00', battery: 290 }, { name: '08:00', battery: 280 },
  { name: '09:00', battery: 270 }, { name: '10:00', battery: 260 }, { name: '11:00', battery: 250 },
  { name: '12:00', battery: 240 }, { name: '13:00', battery: 230 }, { name: '14:00', battery: 220 },
  { name: '15:00', battery: 210 }, { name: '16:00', battery: 200 }, { name: '17:00', battery: 190 },
  { name: '18:00', battery: 180 }, { name: '19:00', battery: 170 }, { name: '20:00', battery: 160 },
  { name: '21:00', battery: 150 }, { name: '22:00', battery: 140 }, { name: '23:00', battery: 130 },
  { name: '24:00', battery: 120 },
];

const touData = [
  { name: '00:00', tou: 120 }, { name: '01:00', tou: 115 }, { name: '02:00', tou: 110 },
  { name: '03:00', tou: 105 }, { name: '04:00', tou: 100 }, { name: '05:00', tou: 95 },
  { name: '06:00', tou: 90 }, { name: '07:00', tou: 85 }, { name: '08:00', tou: 80 },
  { name: '09:00', tou: 75 }, { name: '10:00', tou: 70 }, { name: '11:00', tou: 65 },
  { name: '12:00', tou: 60 }, { name: '13:00', tou: 55 }, { name: '14:00', tou: 50 },
  { name: '15:00', tou: 45 }, { name: '16:00', tou: 40 }, { name: '17:00', tou: 35 },
  { name: '18:00', tou: 30 }, { name: '19:00', tou: 25 }, { name: '20:00', tou: 20 },
  { name: '21:00', tou: 15 }, { name: '22:00', tou: 10 }, { name: '23:00', tou: 5 },
  { name: '24:00', tou: 0 },
];

// CHARGE / DISCHARGE 예측 결과
const chargeDischargeData = [
  'charge','charge','charge','discharge','discharge','charge','charge','discharge','discharge','charge','charge','discharge','discharge','charge','charge','discharge','discharge','charge','charge','discharge','discharge','charge','charge','discharge'
].map((status, index) => ({
  name: `${String(index).padStart(2, '0')}:00`,
  value: status === 'charge' ? 1 : -1,
  label: status.toUpperCase()
}));

// ------------------ 컴포넌트 시작 ------------------
// 오늘 날짜를 YY.MM.DD 형식으로 반환하는 함수
const formatToday = () => {
  const today = new Date();
  const year = String(today.getFullYear()).slice(2); // '25'
  const month = String(today.getMonth() + 1).padStart(2, '0'); // '05'
  const date = String(today.getDate()).padStart(2, '0'); // '17'
  return `${year}.${month}.${date}`; // '25.05.17'
};


const Dashboard = () => {
  const [selectedData, setSelectedData] = useState('battery');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', time: '' });

  // 선택된 탭에 따라 LineChart에 전달할 데이터 구성
  const getData = () => {
    if (selectedData === 'battery') return batteryData;
    if (selectedData === 'tou') return touData;
    if (selectedData === 'all') {
      return batteryData.map((item, index) => ({
        name: item.name,
        battery: item.battery,
        tou: touData[index]?.tou,
      }));
    }
  };

  // 툴팁 이벤트 핸들러
  const handleMouseEnter = (e, entry) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      label: entry.label,
      time: entry.name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, label: '', time: '' });
  };

  return (
    <main className="dashboard">
      {/* 헤더 */}
      <div className="dashboard-header">
        <h1 className="station-name">VOLTUP 제주동부점</h1>
        <span className="date-label" style={{ color: '#000', textDecoration: 'none', fontWeight: 500 }}>
        {formatToday()}
        </span>
      </div>

      <div className="graph-section">
        {/* 탭 영역 */}
        <div className="graph-header">
          <p>일일예측</p>
          <div className="graph-tabs">
            <button className={selectedData === 'battery' ? 'active' : ''} onClick={() => setSelectedData('battery')}>Battery Power</button>
            <button className={selectedData === 'tou' ? 'active' : ''} onClick={() => setSelectedData('tou')}>TOU</button>
            <button className={selectedData === 'all' ? 'active' : ''} onClick={() => setSelectedData('all')}>All Together</button>
          </div>
          <button className="export-btn">📄 Export PDF</button>
        </div>

        {/* ✅ 상단 라인 그래프 (폭 제한 wrapper 적용) */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={getData()} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" interval={0} type="category" tickFormatter={(tick) => ['00:00','06:00','12:00','18:00','24:00'].includes(tick) ? tick : ''} />
              <YAxis yAxisId="left" label={{ value: '전력량 (kWh)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'TOU (원)', angle: -90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              {(selectedData === 'battery' || selectedData === 'all') && <Line yAxisId="left" type="monotone" dataKey="battery" stroke="#8884d8" strokeWidth={3} dot={false} />}
              {(selectedData === 'tou' || selectedData === 'all') && <Line yAxisId="right" type="monotone" dataKey="tou" stroke="#ffc658" strokeWidth={3} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div><br/></div>
        {/* ✅ 하단 상태 바 (같은 maxWidth로 정렬 일치) */}
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', padding: '16px 0 12px 0' }}>
          <div style={{ display: 'flex', width: '100%', height: 24 }}>
            {chargeDischargeData.map((entry, index) => (
              <div
                key={index}
                onMouseEnter={(e) => handleMouseEnter(e, entry)}
                onMouseLeave={handleMouseLeave}
                style={{
                  flex: 1,
                  backgroundColor: entry.value === 1 ? '#365BAC' : '#00DDB3',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* 툴팁 */}
          {tooltip.visible && (
            <div
              style={{
                position: 'fixed',
                top: tooltip.y - 40,
                left: tooltip.x,
                transform: 'translateX(-50%)',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 13,
                fontWeight: 500,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 999,
                opacity: 1,
                animation: 'fadeIn 0.3s ease-in-out',
              }}
            >
              {tooltip.time} - {tooltip.label}
            </div>
          )}
              <div><br/></div>
          <p style={{ textAlign: 'center', marginTop: 10, fontSize: '16px', fontWeight: 600 }}>
            <strong>AICOLINK</strong>가 예상하는 <span style={{ color: '#365BAC' }}>CHARGE</span> or <span style={{ color: '#00DDB3' }}>DISCHARGE</span>
          </p>
        </div>
      </div>

      {/* ✅ 애니메이션 정의 (fade-in) */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
};

export default Dashboard;
