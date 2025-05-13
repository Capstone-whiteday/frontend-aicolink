import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  { name: '00:00', battery: 400 },
  { name: '06:00', battery: 300 },
  { name: '12:00', battery: 200 },
  { name: '18:00', battery: 278 },
  { name: '24:00', battery: 189 },
];



const Dashboard = () => {
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
            <button className="active">Battery Power</button>
            <button>Consumption</button>
            <button>TOU</button>
            <button>All Together</button>
          </div>
          <button className="export-btn">📄 Export PDF</button>
        </div>
        <div className="graph-placeholder">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="battery" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 결과 요약 바 */}
      <div className="charge-bar">
        <p><strong>AICOLINK</strong>가 예상하는 <span className="charge">CHARGE</span> or <span className="discharge">DISCHARGE</span></p>
      </div>

      {/* 통계 카드 영역 */}
      <div className="summary-cards">
        <div className="card">
          <h2>오늘 예상 전력구매량은</h2>
          <p className="value">₩ 132,000 이네요</p>
          <p className="note">* 환경 발표 기준 예상치</p>
        </div>

        <div className="card">
          <h2>현재 TOU 요금은</h2>
          <p className="time">16:15</p>
          <p className="value">₩ 1650으로 책정됐어요!</p>
        </div>

        <div className="card">
          <h2>이번달에 AICOLINK와</h2>
          <p className="value">₩ 334,930<br />절약했어요!</p>
        </div>

        <div className="card">
          <h2>오늘은 AICOLINK와</h2>
          <p className="value">₩ 24,930<br />절약할 수 있을거예요</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
