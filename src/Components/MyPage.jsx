import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_mp from './Sidebar_mp';
import Header from './Header';
import ChartTitle from './ChartTitle';
import './MyPage.css';
import './SttnComp.css'


const StationInfoCard = ({ station, onRemove, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: station.name,
    location: station.location,
    description: station.description,
    regionName: station.regionName,
    status: station.status,
  });
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(station.stationId, editData);
    setEditMode(false);
  };
  return (
  //   <div className="station-card">
  //     <h2 className="station-title">voltup 제주동부점</h2>

  //     <div className="info-item">
  //       <span className="label">위치</span>
  //       <div className="value">제주특별시 동부둘레길-80</div>
  //     </div>

  //     <div className="info-item">
  //       <span className="label">등록일자</span>
  //       <div className="value">2023년 8월 13일</div>
  //     </div>

  //     <div className="info-item">
  //       <span className="label">이번 달 순매출</span>
  //       <div className="value">약 314 만원</div>
  //     </div>

  //     <div className="info-item">
  //       <span className="label">총 매출 대비 순수이익 변환률</span>
  //       <div className="value">33%</div>
  //     </div>

  //     <div className="info-item">
  //       <span className="label">현재 상태</span>
  //       <div className="value">정상 영업 중</div>
  //     </div>
  //   </div>
  // );
  <div >
      {editMode ? (
        <>
          <input name="name" value={editData.name} onChange={handleChange} />
          <input name="regionName" value={editData.regionName} onChange={handleChange} />
          <input name="location" value={editData.location} onChange={handleChange} />
          <input name="description" value={editData.description} onChange={handleChange} />
          <select name="status" value={editData.status} onChange={handleChange}>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setEditMode(false)}>취소</button>
        </>
      ) : (
        <>
        <strong>{station.name}</strong> <br />
          위치: {station.location}<br />
          설명: {station.description}<br />
          상태: {station.status}<br />
          <button onClick={() => setEditMode(true)}>정보수정</button>
          <button onClick={() => onRemove(station.stationId)}>삭제</button>
        </>
      )}
    </div>
  );
};


// 충전소 카드 컴포넌트 (수정/삭제 기능 포함)
const StationCard = ({ station, onRemove, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: station.name,
    location: station.location,
    description: station.description,
    regionName: station.regionName,
    status: station.status,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(station.stationId, editData);
    setEditMode(false);
  };

  return (
    <div className="station-item">
      {editMode ? (
        <>
          <input name="name" value={editData.name} onChange={handleChange} />
          <input name="regionName" value={editData.regionName} onChange={handleChange} />
          <input name="location" value={editData.location} onChange={handleChange} />
          <input name="description" value={editData.description} onChange={handleChange} />
          <select name="status" value={editData.status} onChange={handleChange}>
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setEditMode(false)}>취소</button>
        </>
      ) : (
        <>
        <div >
  <h2 className="station-title">{station.name}</h2>

  <div className="info-item">
    <span className="label">위치</span>
    <div className="value">{station.location}</div>
  </div>

  <div className="info-item">
    <span className="label">설명</span>
    <div className="value">{station.description}</div>
  </div>

  <div className="info-item">
    <span className="label">상태</span>
    <div className="value">{station.status}</div>
  </div>

  <div className="station-buttons">
    <button onClick={() => setEditMode(true)}>정보수정</button>
    <button onClick={() => onRemove(station.stationId)}>삭제</button>
  </div>
</div>
</>
        /* <h2 className="station-title"><strong>{station.name}</strong></h2> <br />
          위치: {station.location}<br />
          설명: {station.description}<br />
          상태: {station.status}<br />
          <button onClick={() => setEditMode(true)}>정보수정</button>
          <button onClick={() => onRemove(station.stationId)}>삭제</button>
        
        </> */
      )}
    </div>
  );
};

const MyPage = ({
  isLoggedIn,
  currentUser,
  setCurrentUser,
  stations,      // 전체 충전소 배열 (App.jsx에서 prop으로 전달)
  setStations    // 전체 충전소 setter (App.jsx에서 prop으로 전달)
}) => {
  const navigate = useNavigate();

  // 입력 필드 상태
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [stationDesc, setStationDesc] = useState('');
  const [stationRegion, setStationRegion] = useState('');
  const [stationStatus, setStationStatus] = useState('ON');

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 충전소 목록 불러오기 (GET /station/list)
  useEffect(() => {
    fetch('http://52.79.124.254:8080/station/list')
      .then(res => res.json())
      .then(data => setStations(data));
  }, [setStations]);

  // 사용자별 충전소만 필터링 (userId로 연결)
  const myStations = stations.filter(station => station.userId === currentUser?.id);

  // 충전소 추가 (POST /station/register)
  const handleAddStation = async () => {
    if (!stationName || !stationLocation || !stationRegion) return;
    try {
      const res = await fetch('http://52.79.124.254:8080/station/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationName,
          location: stationLocation,
          status: stationStatus,
          description: stationDesc,
          regionId: Number(stationRegion)
        })
      });
      if (res.ok) {
        fetch('http://52.79.124.254:8080/station/list')
          .then(res => res.json())
          .then(data => setStations(data));
      }
    } catch (e) {}
    setStationName('');
    setStationLocation('');
    setStationDesc('');
    setStationRegion('');
    setStationStatus('ON');
  };

  // 충전소 삭제 (DELETE /station/{stationId})
  const handleRemoveStation = async (stationId) => {
    try {
      const res = await fetch(`http://52.79.124.254:8080/station/${stationId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setStations(stations.filter(s => s.stationId !== stationId));
      }
    } catch (e) {}
  };

  // 충전소 정보 수정 (PUT /station/{stationId})
  const handleEditStation = async (stationId, newData) => {
    try {
      const res = await fetch(`http://52.79.124.254:8080/station/${stationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newData.name,
          status: newData.status,
          description: newData.description
        })
      });
      if (res.ok) {
        fetch('http://52.79.124.254:8080/station/list')
          .then(res => res.json())
          .then(data => setStations(data));
      }
    } catch (e) {}
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <Header />
      <div className="mypage-container" style={{ display: 'flex' }}>
        <div className="sidebar-section">
            <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
             <div className="weather-widget">
      <div className="weather-icon">🌤</div>
      <div className="weather-info">제주, 21℃</div>
      <button className="weather-btn">상세보기</button>
    </div>
        </div>

        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChartTitle />
          {/* <div  style={{ width: '100%', maxWidth: 1000 }}> */}
            
            <br /><h1>내 정보</h1><br /><br /><br /><br />

             <div className="mypage-info">
              {/* <h2>내 충전소</h2> */}
              <div>가입일: <strong>{currentUser?.joinedAt ? currentUser.joinedAt.slice(0,10) : '-'}</strong></div><br />
              <div>충전소 개수: <strong>{myStations.length}</strong></div><br />
              <div>마지막 수정날짜</div><strong>{currentUser?.lastModified ? currentUser.lastModified.slice(0,10) : '-'}</strong><br />
              {/* <div>AICOLINK 활용률: <strong>{currentUser?.usageRate ?? 0}%</strong></div> */}
            </div>
    
            {/* 등록된 충전소 리스트 */}
            <div className="station-list">
              {myStations.length > 0 ? (
                myStations.map(station => (
                  // <StationCard
                  <StationCard
                    key={station.stationId}
                    station={station}
                    onRemove={handleRemoveStation}
                    onEdit={handleEditStation}
                  />

                ))
              ) : (
                <div>등록된 충전소가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default MyPage;