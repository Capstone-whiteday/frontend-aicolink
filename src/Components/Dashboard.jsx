import './Dashboard.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

// 상단에 import 추가
import { mockScheduleResponse } from '../mock/mockDashboardData';

// 예시: fetch 실패 시 목데이터 사용
// setScheduleData(mockScheduleResponse.scheduleList);



// 🟡 웹 푸시 알림 관련 함수 추가 (서비스워커 필요)
function showNotification(title, options) {
  if ('Notification' in window && Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) reg.showNotification(title, options);
    });
  }
}

const regionIdToCity = {
  11: "Seoul",
  21: "Busan",
  22: "Daegu",
  23: "Incheon",
  24: "Gwangju",
  25: "Daejeon",
  26: "Ulsan",
  29: "Sejong",
  31: "Suwon",      // 경기도 대표 도시
  32: "Chuncheon",  // 강원도
  33: "Cheongju",   // 충북
  34: "Cheonan",    // 충남
  35: "Jeonju",     // 전북
  36: "Gwangju",    // 전남
  37: "Pohang",     // 경북
  38: "Changwon",   // 경남
  39: "Jeju"
};

const token = localStorage.getItem('token');
const Dashboard = ({ selectedStationId, selectedDate, setSelectedDate, stations = [] }) => {
  // 🟡 카드 5용 데이터 생성

  const [batteryData, setBatteryData] = useState([]);
  const [touData, setTouData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [stationName, setStationName] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, label: '', time: '' });

  // 🟡 totalCost, savingCost 상태 추가
  const [totalCost, setTotalCost] = useState(null);
  const [savingCost, setSavingCost] = useState(null);

  // 🟡🟡🟡 카드 컴포넌트 재료식들 (scheduleData 기준으로 변경)
  // 기존 scheduleList → scheduleData로 변경 (없애지 않고 주석처리)
  // const operatingRate = 
  //   (scheduleList.filter(s => s.action !== 'IDLE').length / scheduleList.length) * 100;
  // const avgPowerPayment =
  //   scheduleList.reduce((sum, s) => sum + s.powerPayment, 0) / scheduleList.length;
  // const peak = scheduleList.reduce((max, s) => s.powerKw > max.powerKw ? s : max, scheduleList[0]);
  // const peakSolar = scheduleList.reduce((max, s) => s.predictSolar > max.predictSolar ? s : max, scheduleList[0]);


  // 🟡 새로 작성: scheduleData 기준 카드 값 계산
  const validSchedule = Array.isArray(scheduleData) && scheduleData.length > 0 ? scheduleData : [];
  const operatingRate =
    validSchedule.length > 0
      ? Math.round(
        (validSchedule.filter((s) => s.status !== 'IDLE').length / validSchedule.length) * 100
      )
      : 0;

  const avgPowerPayment =
    validSchedule.length > 0
      ? Math.round(
        validSchedule.reduce((sum, s) => sum + (s.powerPayment || 0), 0) / validSchedule.length
      )
      : 0;

  // const peak = validSchedule.reduce((max, s) => s.powerKw > max.powerKw ? s : max, validSchedule[0]);
  // const peakSolar = validSchedule.reduce((max, s) => s.predictSolar > max.predictSolar ? s : max, validSchedule[0]);

  // 🟡 선택된 날짜를 yyyy-MM-dd 형식 문자열로 변환
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // 🟡 라인차트 선택 항목
  const [selectedData, setSelectedData] = useState('battery');

  // 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡
  // 🟢 [추가] 카드별 힌트/값 전환 상태 및 설명 (카드 1~4만)
  // 🟢 마우스 올리거나 클릭하면 값, 아니면 설명(힌트) 표시
  const [showTotalCost, setShowTotalCost] = useState(false);
  const [showSavingCost, setShowSavingCost] = useState(false);
  const [showOperatingRate, setShowOperatingRate] = useState(false);
  const [showAvgPower, setShowAvgPower] = useState(false);

  // 🟢 [추가] 카드별 힌트(설명) 텍스트
  const cardHints = [
    "오늘의 총 전력요금  예상해드려요!",
    "AICOLINK와 함께 절감할 요금은?",
    "오늘의\n 가동률(%)이에요",
    "오늘의 스케줄 평균 전력요금이에요"
  ];
  // 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡

  // 🟡 서비스워커 등록 및 알림 권한 요청 (최초 1회)
  useEffect(() => {
    // 이미 등록되어 있으면 중복 등록 안함
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (!reg) {
          navigator.serviceWorker.register('/sw.js');
        }
      });
    }
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);



  // 🟡 충전소 및 예측 데이터 불러오기(얘가 진짜)
  // 🟢
  useEffect(() => {
    console.log('selectedStationId:', selectedStationId);
    console.log('stations:', stations);
    console.log('selectedStation:', stations.find(st => Number(st.stationId) === Number(selectedStationId)));
    // 🔵 selectedStationId가 바뀔 때 stations에서 이름을 찾아서 바로 표시
    if (selectedStationId && stations.length > 0) {
      const found = stations.find(st => Number(st.stationId) === Number(selectedStationId));
      if (found) setStationName(found.name);
    }

    // [변경] 충전소가 선택되지 않았으면 목데이터로 초기화
    if (!selectedStationId) {
      console.log('충전소를 미선택');
      // 목데이터로 초기화
      setStationName(`충전소1111ID ${mockScheduleResponse.stationName}`);

      const scheduleArr = Array(24).fill(null).map((_, i) => {
        const entry = mockScheduleResponse.scheduleList.find(item => item.hour === i);
        const start = String(i).padStart(2, '0') + ':00';
        const end = String((i + 1) % 24).padStart(2, '0') + ':00';

        return {
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
      setTotalCost(null); // 🟡 추가
      setSavingCost(null); // 🟡 추가
      return;
    }

    // [변경] 실제 API 호출
    const fetchAll = async () => {
      try {
        const scheduleRes = await fetch(
          // `http://52.79.124.254:8080/scheduling/hourly?stationId=${selectedStationId}&date=${formattedDate}`
          `http://localhost:8080/scheduling/dashboard/${selectedStationId}/${formattedDate}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }
        );
        const scheduleJson = await scheduleRes.json();

        // 🔵 항상 stations에서 이름을 우선적으로 찾아서 표시
        const found = stations.find(st => Number(st.stationId) === Number(selectedStationId));
        setStationName(
          (found && found.name) ||
          scheduleJson.stationName ||
          `충전소 ID ${scheduleJson.stationId}`
        );

        // [변경] 스케줄 데이터가 존재하면 대시보드에 표시, 없으면 안내
        if (scheduleJson && Array.isArray(scheduleJson.scheduleList) && scheduleJson.scheduleList.length > 0) {
          setStationName(scheduleJson.stationName || `충전소 ID ${scheduleJson.stationId}`);
          setTotalCost(scheduleJson.totalCost ?? null);      // 🟡 추가
          setSavingCost(scheduleJson.savingCost ?? null);    // 🟡 추가

          // scheduleList를 24시간 배열로 변환
          const scheduleArr = Array(24).fill(null).map((_, i) => {
            const entry = scheduleJson.scheduleList.find(item => item.hour === i);
            const start = String(i).padStart(2, '0') + ':00';
            const end = String((i + 1) % 24).padStart(2, '0') + ':00';
            return {
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
            battery: item.predictSolar,// 수정: powerKw -> predictSolar
          })));
          setTouData(scheduleArr.map(item => ({
            name: item.name,
            tou: item.powerPayment,
          })));

        } else {
          // [변경] 스케줄 데이터가 없으면 안내 메시지와 빈 데이터
          // setStationName(scheduleJson.stationName || `충전소 ID ${scheduleJson.stationId}`);
          setTotalCost(null);      // 🟡 추가
          setSavingCost(null);     // 🟡 추가
          setScheduleData([]);
          setBatteryData([]);
          setTouData([]);
        }
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
        // 에러 시 목데이터로 fallback
        setStationName(`충전소 ID ${mockScheduleResponse.stationName} (에러임)`);
        console.log('목데이터로 초기화합니다.');
        const scheduleArr = Array(24).fill(null).map((_, i) => {
          const entry = mockScheduleResponse.scheduleList.find(item => item.hour === i);
          const start = String(i).padStart(2, '0') + ':00';
          const end = String((i + 1) % 24).padStart(2, '0') + ':00';
          return {
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
          battery: item.predictSolar,// 수정: powerKw -> predictSolar
        })));
        setTouData(scheduleArr.map(item => ({
          name: item.name,
          tou: item.powerPayment,
        })));
        setTotalCost(null); // 🟡 추가
        setSavingCost(null); // 🟡 추가
      }
    };

    fetchAll();
  }, [selectedStationId, selectedDate, formattedDate, stations]);

  // 🟡 웹 푸시 알림: 10분 뒤 DISCHARGE로 변환되는 구간이 있으면 알림
  useEffect(() => {
    if (!scheduleData.length) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const now = new Date();

    // 10분 뒤 DISCHARGE로 변환되는 구간 찾기
    for (let i = 0; i < scheduleData.length - 1; i++) {
      if (
        scheduleData[i].status !== 'DISCHARGE' &&
        scheduleData[i + 1].status === 'DISCHARGE'
      ) {
        // 변환 시각 계산
        const changeTime = new Date();
        changeTime.setHours(i + 1, 0, 0, 0);
        const diff = changeTime - now;
        // 10분 이내(0 < diff <= 10분)면 알림
        if (diff > 0 && diff <= 10 * 60 * 1000) {
          showNotification('충방전 일정 안내', {
            body: '10분 뒤 방전(DISCHARGE)으로 변환을 제안드립니다.',
            icon: '/battery_icon.png', // 아이콘 파일은 public 폴더에 직접 추가 필요
          });
          break; // 여러 번 알림 방지
        }
      }
    }
  }, [scheduleData]);
  // ↑ 이 부분이 "10분 뒤 DISCHARGE로 변환될 때 웹 푸시 알림"을 담당합니다.

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
  // 🟡 카드 스타일 변수(중복 제거용) - 수정된 부분
  const cardStyle = {
    flex: '1 1 calc(20% - 0px)', // 🔹 4개 카드가 한 줄에 정확히 배치되도록 수정 (25% - gap 계산)
    minWidth: '100px', // 🔹 최소 너비 설정으로 모바일에서도 적절한 크기 유지
    background: 'linear-gradient(rgba(255, 255, 255, 0.77), rgba(253, 254, 239, 0.77))',
    borderRadius: 33,
    padding: '40px 24px',
    minHeight: '120px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    textAlign: 'center',
  };
  // barData를 함수로 변경
  const getBarData = () => [
    {
      name: '총 요금',
      절감요금: typeof savingCost === "number" ? savingCost : 0,
      나머지:
        typeof totalCost === "number" && typeof savingCost === "number"
          ? Math.max(totalCost - savingCost, 0)
          : typeof totalCost === "number"
            ? totalCost
            : 0,
    },
  ];

  // 🟢 [추가] 분산전원 활용률 계산 함수
const getDistributedUtilization = () => {
  // totalSolar: 예측 태양광 총합
  // totalCharge: CHARGE 구간의 powerKw 합
  // totalDischarge: DISCHARGE 구간의 powerKw 합
  const totalSolar = Array.isArray(scheduleData)
    ? scheduleData.reduce((sum, s) => sum + (s.predictSolar || 0), 0)
    : 0;
  const totalCharge = Array.isArray(scheduleData)
    ? scheduleData.filter(s => s.status === 'CHARGE').reduce((sum, s) => sum + (s.powerKw || 0), 0)
    : 0;
  const totalDischarge = Array.isArray(scheduleData)
    ? scheduleData.filter(s => s.status === 'DISCHARGE').reduce((sum, s) => sum + (s.powerKw || 0), 0)
    : 0;
  const denominator = totalCharge + totalDischarge;
  if (denominator === 0) return 0;
  return ((totalSolar / denominator) * 100).toFixed(1);
};

const distributedUtilization = getDistributedUtilization(); // %



  // 🟢 [추가] 선택된 충전소의 regionId로 날씨 API 호출
  useEffect(() => {
    if (!selectedStationId || !stations.length) return;
    const station = stations.find(st => Number(st.stationId) === Number(selectedStationId));
    if (!station || !station.regionId) return;

    const city = regionIdToCity[station.regionId];
    if (!city) return;

    // OpenWeatherMap 예시 (API KEY 필요, 무료 tier 사용 가능)
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // <-- 실제 키로 교체
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(() => setWeather(null));
  }, [selectedStationId, stations]);



  
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

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '16px 0 12px 0' }}>

      </div>
      <div className="graph-section">
        <div className="graph-header">
          <p>일일예측</p>
          <div className="graph-tabs">
            <button className={selectedData === 'battery' ? 'active' : ''} onClick={() => setSelectedData('SolarE Predict')}>Solar Predict</button>
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
                ticks={['06:00', '12:00', '18:00', '24:00']}
                tickFormatter={(tick) => {
                  // 6시, 12시, 18시, 24시(23:00)만 표시
                  if (tick === '06:00' || tick === '12:00' || tick === '18:00' || tick === '24:00') return tick;
                  return '';
                }}
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
          {/* [변경] 스케줄 데이터가 없으면 안내 메시지 */}
          {scheduleData.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', fontSize: 18, margin: '40px 0' }}>
              해당 날짜에 스케줄 데이터가 없습니다.
            </div>
          ) : (
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
          )}

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
      {/* 🟡 네 개의 가로 카드 (카드 1: 총 요금, 카드 2: 절감 요금, 카드 3: 가동률, 카드 4: 평균 전력요금) */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
          marginBottom: '32px',
          width: '93%',
          flexWrap: 'wrap', // 🔹 화면이 작을 때 카드가 아래로 내려갈 수 있도록 추가
          justifyContent: 'space-between', // 🔹 카드들을 균등하게 배치
          align: 'center', // 🔹
          margin: '0 auto', // 🔹
          marginTop: '30px', // 🔹
          borderRadius: '45px',
        }}
      >

        {/* 카드 1: 총 요금 */}
        <div
          style={cardStyle}
          // 🟢 [추가] 마우스/클릭 이벤트로 값/힌트 전환
          onMouseEnter={() => setShowTotalCost(true)}
          onMouseLeave={() => setShowTotalCost(false)}
          onClick={() => setShowTotalCost((v) => !v)}
        >
          <p style={{ margin: '12px 0 0 0', fontSize: 16 }}>
            {/* 총 요금<br /> */}
            <strong style={{ fontSize: 24 }}>
              {/* 🟢 [추가] 마우스가 올라가기 전에는 힌트(설명)에 .card-hint 스타일 적용! */}
              {showTotalCost
                ? (totalCost !== null ? `${totalCost.toLocaleString()} 원` : '데이터 없음')
                : <span className="card-hint">{cardHints[0]}</span>}
            </strong>
          </p>
        </div>
        {/* 카드 2: 절감 요금 */}
        <div
          style={cardStyle}
          onMouseEnter={() => setShowSavingCost(true)}
          onMouseLeave={() => setShowSavingCost(false)}
          onClick={() => setShowSavingCost((v) => !v)}
        >
          <p style={{ margin: '12px 0 0 0', fontSize: 16 }}>
            <strong style={{ fontSize: 24 }}>
              {showSavingCost
                ? (savingCost !== null ? `${savingCost.toLocaleString()} 원` : '데이터 없음')
                : <span className="card-hint">{cardHints[1]}</span>}
            </strong>
          </p>
        </div>
      {/* 🟢 [변경] 카드 3: 분산전원 활용률 */}
      <div style={cardStyle}>
        <p style={{ margin: '12px 0 0 0', fontSize: 16 }}>
          <p style={{ margin: '-20px 0 2px 0', fontSize: 16, textAlign: 'left', fontWeight: 600 }}>
            예상 분산전원 활용률 
          </p>
          <strong style={{ fontSize: 40, textAlign: 'center' }}>
            {distributedUtilization !== undefined && !isNaN(distributedUtilization)
              ? `${distributedUtilization}%`
              : '데이터 없음'}
          </strong>
        </p>
      </div>
        {/* 카드 4: 평균 전력요금 */}
        <div
          style={cardStyle}
          onMouseEnter={() => setShowAvgPower(true)}
          onMouseLeave={() => setShowAvgPower(false)}
          onClick={() => setShowAvgPower((v) => !v)}
        >
          <p style={{ margin: '12px 0 0 0', fontSize: 16 }}>
            <strong style={{ fontSize: 24 }}>
              {showAvgPower
                ? (validSchedule.length > 0 ? `${avgPowerPayment.toLocaleString()} 원` : '데이터 없음')
                : <span className="card-hint">{cardHints[3]}</span>}
            </strong>
          </p>
        </div>
        {/* 카드 5: 총 요금 대비 절감 요금 (이 카드는 기존대로, 힌트/값 전환 없음) */}
        <div style={cardStyle}>
          {/* 🟢 [변경] 텍스트를 왼쪽 정렬로 */}
          <p style={{ margin: '-20px 0 2px 0', fontSize: 16, textAlign: 'left', fontWeight: 600 }}>
            총 요금 대비 절감 요금
          </p>
          {/* 🟢 [변경] 바 높이(height)를 38로 두껍게, 세로 중앙 정렬 */}
          <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ width: '100%', height: 38 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBarData()}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 10, bottom: 10 }}
                  barCategoryGap={0}
                >
                  <XAxis type="number" hide domain={[0, totalCost ?? 1]} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip formatter={(value) => `${value?.toLocaleString()} 원`} />
                  {/* 🟢 [변경] radius를 더 크게 해도 무방 */}
                  <Bar dataKey="나머지" stackId="a" fill="#e5e7eb" radius={[12, 12, 12, 12]} />
                  <Bar dataKey="절감요금" stackId="a" fill="#22c55e" radius={[12, 12, 12, 12]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* 카드 6: 총 요금 (복제, 기존 코드 유지) */}
        <div style={cardStyle}>
          {/* <p style={{ margin: '12px 0 0 0', fontSize: 16 }}>
            총 요금<br />
            <strong style={{ fontSize: 24 }}>
              {totalCost !== null ? `${totalCost.toLocaleString()} 원` : '데이터 없음'}
            </strong>
          </p> */}
        </div>
      </div>
      {/* 🟢 [추가] 아래쪽에 여백을 추가해서 스크롤이 충분히 내려가도록 함 */}
      <div style={{ height: '100px' }} />
        {/* 🟢 [추가] 맨 아래 중앙에 로고 표시 */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '30px'
      }}>
        {/* public 폴더에 logo.png 또는 원하는 로고 파일이 있어야 합니다 */}
        <img
          src="/logo_aclnk.svg"
          alt="AICOLINK Logo"
          style={{
            height: '60px',
            opacity: 0.7,
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))'
          }}
        />
      </div>
    </main>
  );
};

export default Dashboard;

// ----------------------
// 🟡 추가 설명
// ----------------------
// 1. 카드 1~4에서 마우스가 올라가기 전에는 힌트(설명)에 .card-hint 스타일이 적용되어 폰트가 연하고 작게 보입니다.
// 2. 마우스를 올리거나 클릭하면 실제 값이 진하게 크게 보입니다.
// 3. 기존 mock/test 코드, 주석 등은 절대 삭제하지 않고 모두 남겨두었습니다.
// 4. Dashboard.css에 .card-hint 스타일이 반드시 있어야 합니다.
// ----------------------