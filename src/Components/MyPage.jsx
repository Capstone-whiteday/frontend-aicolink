import './MyPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Sidebar_mp from './Sidebar_mp';
import Header from './Header';
import ChartTitle from './ChartTitle';

const MyPage = ({ isLoggedIn, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [stationDesc, setStationDesc] = useState('');
  const [stationRegion, setStationRegion] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn || !currentUser) return null;

  // 충전소 추가
  const handleAddStation = () => {
    if (!stationName || !stationLocation) return;
    const newStation = {
      stationId: Date.now(),
      name: stationName,
      location: stationLocation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'ON',
      description: stationDesc,
      regionName: stationRegion
    };
    setCurrentUser({
      ...currentUser,
      stations: [...(currentUser.stations || []), newStation]
    });
    setStationName('');
    setStationLocation('');
    setStationDesc('');
    setStationRegion('');
  };

  // 충전소 삭제
  const handleRemoveStation = (stationId) => {
    setCurrentUser({
      ...currentUser,
      stations: currentUser.stations.filter(s => s.stationId !== stationId)
    });
  };

  return (
    <>
      <Header />
      <div className="mypage-container">
        <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
        <div className="mypage-content">
          <ChartTitle />
          <div className="mypage-body">
            <div className="mypage-info">
              <h2>내 충전소</h2>
              <div>가입일: <strong>{currentUser.joinedAt ? currentUser.joinedAt.slice(0,10) : '-'}</strong></div>
              <div>충전소 개수: <strong>{currentUser.stations ? currentUser.stations.length : 0}</strong></div>
              <div>AICOLINK 활용률: <strong>{currentUser.usageRate ?? 0}%</strong></div>
            </div>
            <div className="station-list">
              {currentUser.stations && currentUser.stations.length > 0 ? (
                currentUser.stations.map(station => (
                  <div key={station.stationId} className="station-item">
                    <strong>{station.name}</strong> ({station.regionName})<br />
                    위치: {station.location}<br />
                    설명: {station.description}<br />
                    <button onClick={() => handleRemoveStation(station.stationId)}>삭제</button>
                  </div>
                ))
              ) : (
                <div>등록된 충전소가 없습니다.</div>
              )}
            </div>
            <div className="add-station-form">
              <h3>충전소 추가</h3>
              <input
                type="text"
                placeholder="충전소 이름"
                value={stationName}
                onChange={e => setStationName(e.target.value)}
              />
              <input
                type="text"
                placeholder="위치"
                value={stationLocation}
                onChange={e => setStationLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="설명"
                value={stationDesc}
                onChange={e => setStationDesc(e.target.value)}
              />
              <input
                type="text"
                placeholder="지역명"
                value={stationRegion}
                onChange={e => setStationRegion(e.target.value)}
              />
              <button onClick={handleAddStation}>추가</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;