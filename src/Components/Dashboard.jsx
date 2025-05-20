import './Dashboard.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';



// 상단에 import 추가
import { mockScheduleResponse } from '../mock/mockDashboardData';

// 예시: fetch 실패 시 목데이터 사용
// setScheduleData(mockScheduleResponse.scheduleList);



// // 🟡 웹 푸시 알림 관련 함수 추가 (서비스워커 필요)
// function showNotification(title, options) {
//   if ('Notification' in window && Notification.permission === 'granted') {
//     navigator.serviceWorker.getRegistration().then(reg => {
//       if (reg) reg.showNotification(title, options);
//     });
//   }
// }

const Dashboard = ({ selectedStationId, selectedDate, setSelectedDate }) => {

  const [batteryData, setBatteryData] = useState([]);
  const [touData, setTouData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [stationName, setStationName] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', time: '' });

  // 🟡 선택된 날짜를 yyyy-MM-dd 형식 문자열로 변환
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // 🟡 라인차트 선택 항목
  const [selectedData, setSelectedData] = useState('battery');

  // // 🟡 서비스워커 등록 및 알림 권한 요청 (최초 1회)
  // useEffect(() => {
  //   // 이미 등록되어 있으면 중복 등록 안함
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.getRegistration().then(reg => {
  //       if (!reg) {
  //         navigator.serviceWorker.register('/sw.js');
  //       }
  //     });
  //   }
  //   if ('Notification' in window && Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }
  // }, []);

  // // 🟡 스케줄링 요청 시간 설정 (예: 매일 00:00에 요청) 백엔드에서 직접 요청 예정, 우선 주석처리
  // // 실제 서비스에서는 서버에서 스케줄링을 돌리겠지만, 프론트에서 테스트용으로 setInterval 사용 가능
  // useEffect(() => {
  //   // 예시: 매일 00:00에 스케줄링 요청
  //   // 실제 서비스에서는 서버에서 처리하는 것이 맞음
  //   const now = new Date();
  //   const nextSchedule = new Date(now);
  //   nextSchedule.setHours(0, 0, 0, 0); // 00:00:00
  //   if (now > nextSchedule) {
  //     nextSchedule.setDate(nextSchedule.getDate() + 1);
  //   }
  //   const timeout = nextSchedule - now;
  //   const timer = setTimeout(() => {
  //     // 실제 스케줄링 요청
  //     // fetch(`http://52.79.124.254:8080/scheduling/hourly?stationId=${selectedStationId}&date=${formattedDate}`, {
  //     fetch(`http://localhost:8080/scheduling/dashboard/stationId=${selectedStationId}&date=${formattedDate}`, {
      
  //     method: 'GET', // 실제 API가 POST라면, 아니면 GET으로 변경
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         // 필요시 알림 등 처리
  //         // console.log('스케줄링 요청 완료:', data);
  //       })
  //       .catch(err => {
  //         // console.error('스케줄링 요청 실패:', err);
  //       });
  //   }, timeout);

  //   return () => clearTimeout(timer);
  // }, [selectedStationId, formattedDate]);
  // // ↑ 이 부분이 "내가 코드에서 설정한 시간에 벡엔드에 스케줄링 요청"을 담당합니다.




  // 🟡 목 데이터로 상태 세팅 (useEffect로 대체)
useEffect(() => {
  // mock 데이터로 상태 초기화
  setStationName(`충전소 ID ${mockScheduleResponse.stationId}`);
  const scheduleArr = Array(24).fill(null).map((_, i) => {
    const entry = mockScheduleResponse.scheduleList.find(item => item.hour === i);
    const start = String(i).padStart(2, '0') + ':00';
    const end = String((i + 1) % 24).padStart(2, '0') + ':00';
    return {
      // name: `${String(i).padStart(2, '0')}:00`,
      name: `${start} ~ ${end}`,
      status: entry?.action || 'IDLE',
      label: entry?.action || 'IDLE',
      powerKw: entry?.powerKw ?? null,
      predictSolar: entry?.predictSolar ?? null,
      powerPayment: entry?.powerPayment ?? null,
    };
  });
  setScheduleData(scheduleArr);
  setBatteryData(scheduleArr.map(item => ({
    name: item.name,
    battery: item.powerKw,
  })));
  setTouData(scheduleArr.map(item => ({
    name: item.name,
    tou: item.powerPayment,
  })));
}, []);


  // // 🟡 충전소 및 예측 데이터 불러오기(얘가 진짜)
  // useEffect(() => {
  //   if (!selectedStationId || !selectedDate) return;

  //   const fetchAll = async () => {
  //     console.log("🚀 fetchAll triggered");
  //     console.log("📌 selectedStationId:", selectedStationId);
  //     console.log("📌 formattedDate:", formattedDate);

  //     // ✅ 실제 백엔드 연동 (스케줄링 기준)
  //     try {
  //       const scheduleRes = await fetch(
  //         // `http://52.79.124.254:8080/scheduling/hourly?stationId=${selectedStationId}&date=${formattedDate}`
  //         `http://localhost:8080/scheduling/dashboard/stationId=${selectedStationId}&date=${formattedDate}`
  //       );
  //       const scheduleJson = await scheduleRes.json();

  //       setStationName(`충전소 ID ${scheduleJson.stationId}`);

  //       // scheduleList를 24시간 배열로 변환
  //       const scheduleArr = Array(24).fill(null).map((_, i) => {
  //         const entry = scheduleJson.scheduleList.find(item => item.hour === i);
  //         return {
  //           name: `${String(i).padStart(2, '0')}:00`,
  //           status: entry?.action || 'IDLE',
  //           label: entry?.action || 'IDLE',
  //           powerKw: entry?.powerKw ?? null,
  //           predictSolar: entry?.predictSolar ?? null,
  //           powerPayment: entry?.powerPayment ?? null,
  //         };
  //       });
  //       setScheduleData(scheduleArr);

  //       // batteryData, touData도 scheduleList에서 추출
  //       setBatteryData(
  //         scheduleArr.map(item => ({
  //           name: item.name,
  //           battery: item.powerKw,
  //         }))
  //       );
  //       setTouData(
  //         scheduleArr.map(item => ({
  //           name: item.name,
  //           tou: item.powerPayment,
  //         }))
  //       );
  //     } catch (err) {
  //       console.error('데이터 불러오기 실패:', err);
  //     }
  //   };

  //   fetchAll();
  // }, [selectedStationId, selectedDate, formattedDate]);

  // // 🟡 웹 푸시 알림: 10분 뒤 DISCHARGE로 변환되는 구간이 있으면 알림
  // useEffect(() => {
  //   if (!scheduleData.length) return;
  //   if (!('Notification' in window) || Notification.permission !== 'granted') return;

  //   const now = new Date();

  //   // 10분 뒤 DISCHARGE로 변환되는 구간 찾기
  //   for (let i = 0; i < scheduleData.length - 1; i++) {
  //     if (
  //       scheduleData[i].status !== 'DISCHARGE' &&
  //       scheduleData[i + 1].status === 'DISCHARGE'
  //     ) {
  //       // 변환 시각 계산
  //       const changeTime = new Date();
  //       changeTime.setHours(i + 1, 0, 0, 0);
  //       const diff = changeTime - now;
  //       // 10분 이내(0 < diff <= 10분)면 알림
  //       if (diff > 0 && diff <= 10 * 60 * 1000) {
  //         showNotification('충방전 일정 안내', {
  //           body: '10분 뒤 방전(DISCHARGE)으로 변환을 제안드립니다.',
  //           icon: '/battery_icon.png', // 아이콘 파일은 public 폴더에 직접 추가 필요
  //         });
  //         break; // 여러 번 알림 방지
  //       }
  //     }
  //   }
  // }, [scheduleData]);
  // // ↑ 이 부분이 "10분 뒤 DISCHARGE로 변환될 때 웹 푸시 알림"을 담당합니다.

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
      <h1 className="station-name">
        {selectedStationId ? (stationName || '충전소 이름') : '충전소를 선택하세요'}
      </h1>
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
              {/* XAxis에 tickFormatter와 ticks 옵션 추가 */}
                <XAxis
                  dataKey="name"
                  ticks={['06:00', '12:00','18:00', '24:00']}
                  tickFormatter={(tick) => {
                    // 6시, 18시, 24시(23:00)만 표시
                    if (tick === '06:00' || tick=='12:00'||tick === '18:00' || tick === '24:00') return tick;
                    return '';
                  }}
                  // tickFormatter={tick => tick}
                  interval={0}
                />
              <YAxis yAxisId="left" label={{ value: '전력량 (kWh)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'TOU (원)', angle: -90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              {(selectedData === 'battery' || selectedData === 'all') && <Line yAxisId="left" type="monotone" dataKey="battery" stroke="#8884d8" strokeWidth={3} dot={false} />}
              {(selectedData === 'tou' || selectedData === 'all') && <Line yAxisId="right" type="monotone" dataKey="tou" stroke="#ffc658" strokeWidth={3} dot={false} />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ maxWidth: '810px', margin: '0 auto', padding: '16px 0 12px 0' }}>
          {/* 스케줄링 상태 바 */}
          <div className="status-bar-wrapper">
  <div style={{ display: 'flex', width: '100%', height: 24 }}>
    {scheduleData.map((entry, index) => (
      <div
        key={index}
        onMouseEnter={(e) => handleMouseEnter(e, entry)}
        onMouseLeave={handleMouseLeave}
        style={{
          flex: 1,
          backgroundColor:
            entry.status === 'CHARGE'
              ? '#365BAC'
              : entry.status === 'DISCHARGE'
              ? '#00DDB3'
              : '#ccc',
          height: '100%',
          cursor: 'pointer',
          transition: 'opacity 0.3s ease',
        }}
      />
    ))}
  </div>
</div>
          {/* <div style={{ display: 'flex', width: '100%', height: 24 }}>
            {scheduleData.map((entry, index) => (
              <div
                key={index}
                onMouseEnter={(e) => handleMouseEnter(e, entry)}
                onMouseLeave={handleMouseLeave}
                style={{
                  flex: 1,
                  // CHARGE, DISCHARGE, IDLE 상태 모두 색상 구분
                  backgroundColor:
                    entry.status === 'CHARGE'
                      ? '#365BAC'
                      : entry.status === 'DISCHARGE'
                      ? '#00DDB3'
                      : '#ccc', // IDLE 등 기타 상태는 회색
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
              />
            ))}
          </div> */}

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

// ----------------------
// 🟡 추가 설명
// ----------------------
// 1. showNotification 함수와 서비스워커 등록/권한 요청 useEffect가 추가되었습니다.
// 2. "10분 뒤 DISCHARGE로 변환"되는 구간이 있으면 웹 푸시 알림을 띄웁니다.
// 3. 알림을 받으려면 public/sw.js(서비스워커 파일)가 필요합니다. 아래 예시 참고:
//
// // public/sw.js
// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   // 클릭 시 동작 추가 가능
// });
//
// 4. 아이콘 파일(battery_icon.png 등)은 public 폴더에 직접 넣어야 합니다.
// 5. 기존 mock/test 코드, 주석 등은 절대 삭제하지 않고 모두 남겨두었습니다.
// ----------------------
