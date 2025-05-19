import './Dashboard.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = ({ selectedStationId, selectedDate, setSelectedDate }) => {

  const [batteryData, setBatteryData] = useState([]);
  const [touData, setTouData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [stationName, setStationName] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', time: '' });

  // 🟡 선택된 날짜를 yyyy-MM-dd 형식 문자열로 변환
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // 🟡 충전소 및 예측 데이터 불러오기
useEffect(() => {
  if (!selectedStationId || !selectedDate) return;

  const fetchAll = async () => {
      console.log("🚀 fetchAll triggered");
      console.log("📌 selectedStationId:", selectedStationId);
      console.log("📌 formattedDate:", formattedDate);
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');

      // // ✅ MOCK STATION ID일 경우 - API 호출 없이 mock 데이터 주입
      // if (selectedStationId === 101) {
      //   setStationName("Mock 충전소 A");

      //   setBatteryData([
      //     { name: '00:00', battery: 400 }, { name: '01:00', battery: 390 },
      //     { name: '02:00', battery: 380 }, { name: '03:00', battery: 370 },
      //     { name: '04:00', battery: 360 }, { name: '05:00', battery: 350 },
      //     { name: '06:00', battery: 340 }, { name: '07:00', battery: 330 },
      //     { name: '08:00', battery: 320 }, { name: '09:00', battery: 310 },
      //     { name: '10:00', battery: 300 }, { name: '11:00', battery: 290 },
      //     { name: '12:00', battery: 280 }, { name: '13:00', battery: 270 },
      //     { name: '14:00', battery: 260 }, { name: '15:00', battery: 250 },
      //     { name: '16:00', battery: 240 }, { name: '17:00', battery: 230 },
      //     { name: '18:00', battery: 220 }, { name: '19:00', battery: 210 },
      //     { name: '20:00', battery: 200 }, { name: '21:00', battery: 190 },
      //     { name: '22:00', battery: 180 }, { name: '23:00', battery: 170 }

      try {
        const [batteryRes, scheduleRes, touRes] = await Promise.all([
          fetch(`http://localhost:8080/battery?stationId=${selectedStationId}&date=${formattedDate}`),
          fetch(`http://localhost:8080/scheduling/hourly?stationId=${selectedStationId}&date=${formattedDate}`),
          fetch(`http://localhost:8080/tou/hourly?regionId=1&date=${formattedDate}`), // regionId는 임시

        ]);

        setScheduleData([
          ...Array(24).fill(null).map((_, i) => ({
            name: `${String(i).padStart(2, '0')}:00`,
            status: i % 2 === 0 ? 'CHARGE' : 'DISCHARGE',
            label: i % 2 === 0 ? 'CHARGE' : 'DISCHARGE'
          }))
        ]);

        setTouData([
          ...Array(24).fill(null).map((_, i) => ({
            name: `${String(i).padStart(2, '0')}:00`,
            tou: 120 - i * 5
          }))
        ]);

        return; // 🛑 여기서 함수 종료 (실제 fetch는 실행 안 됨)
      }catch (error) {
        console.error('API 호출 실패:', error);
        return; // 🛑
      }

      // ✅ 실제 API 호출
      const [batteryRes, scheduleRes, touRes] = await Promise.all([
        fetch(`http://52.79.124.254:8080/battery?stationId=${selectedStationId}&date=${formattedDate}`),
        fetch(`http://52.79.124.254:8080/scheduling/hourly?stationId=${selectedStationId}&date=${formattedDate}`),
        fetch(`http://52.79.124.254:8080/tou/hourly?regionId=1&date=${formattedDate}`),
      ]);

      const [battery, schedule, tou] = await Promise.all([
        batteryRes.json(),
        scheduleRes.json(),
        touRes.json(),
      ]);

      setBatteryData(battery);
      setScheduleData(schedule);
      setTouData(tou);
      setStationName(`충전소 ID ${selectedStationId}`);
    } catch (err) {
      console.error('데이터 불러오기 실패:', err);
    }
  };

  fetchAll();
}, [selectedStationId, selectedDate]);


  // 🟡 라인차트 선택 항목
  const [selectedData, setSelectedData] = useState('battery');

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

  // 🟡 툴팁 이벤트
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
      {/* 제목 및 날짜 선택 */}
      <div className="dashboard-header">
        <h1 className="station-name">{stationName || '충전소 이름'}</h1>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            if (date) setSelectedDate(date);
          }}
          dateFormat="yyyy-MM-dd"
          className="datepicker"
        />
      </div>

      <div className="graph-section">
        <div className="graph-header">
          <p>일일예측</p>
          <div className="graph-tabs">
            <button className={selectedData === 'battery' ? 'active' : ''} onClick={() => setSelectedData('battery')}>Battery Power</button>
            <button className={selectedData === 'tou' ? 'active' : ''} onClick={() => setSelectedData('tou')}>TOU</button>
            <button className={selectedData === 'all' ? 'active' : ''} onClick={() => setSelectedData('all')}>All Together</button>
          </div>
          <button className="export-btn">📄 Export PDF</button>
        </div>

        {/* 라인 그래프 */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={getData()} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" interval={0} />
              <YAxis yAxisId="left" label={{ value: '전력량 (kWh)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'TOU (원)', angle: -90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              {(selectedData === 'battery' || selectedData === 'all') && <Line yAxisId="left" type="monotone" dataKey="battery" stroke="#8884d8" strokeWidth={3} dot={false} />}
              {(selectedData === 'tou' || selectedData === 'all') && <Line yAxisId="right" type="monotone" dataKey="tou" stroke="#ffc658" strokeWidth={3} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '16px 0 12px 0' }}>
          {/* 스케줄링 상태 바 */}
          <div style={{ display: 'flex', width: '100%', height: 24 }}>
            {scheduleData.map((entry, index) => (
              <div
                key={index}
                onMouseEnter={(e) => handleMouseEnter(e, entry)}
                onMouseLeave={handleMouseLeave}
                style={{
                  flex: 1,
                  backgroundColor: entry.status === 'CHARGE' ? '#365BAC' : '#00DDB3',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
              />
            ))}
          </div>

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
              }}
            >
              {tooltip.time} - {tooltip.label}
            </div>
          )}
          <p style={{ textAlign: 'center', marginTop: 10, fontSize: '16px', fontWeight: 600 }}>
            <strong>AICOLINK</strong>가 예상하는 <span style={{ color: '#365BAC' }}>CHARGE</span> or <span style={{ color: '#00DDB3' }}>DISCHARGE</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
