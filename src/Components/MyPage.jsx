import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_mp from './Sidebar_mp'; // 마이페이지 전용 사이드바 컴포넌트
import Header from './Header';
import ChartTitle from './ChartTitle';

const MyPage = ({ isLoggedIn, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  // 입력 필드 상태 (사용자가 입력하는 충전소 정보)
  const [stationName, setStationName] = useState('');
  const [stationLocation, setStationLocation] = useState('');
  const [stationDesc, setStationDesc] = useState('');
  const [stationRegion, setStationRegion] = useState('');
  const [stationStatus, setStationStatus] = useState('ON'); // 기본값 ON

  // 로그인하지 않은 상태일 경우 로그인 페이지로 강제 이동
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 로그인하지 않았거나 사용자 정보가 없으면 아무것도 렌더링하지 않음
  if (!isLoggedIn || !currentUser) return null;

  // 충전소 추가 함수
  const handleAddStation = () => {
    // 필수 정보 누락 시 추가하지 않음
    if (!stationName || !stationLocation) return;

    // 새 충전소 객체 생성
    const newStation = {
      stationId: Date.now(), // 고유 ID (현재 시간 기반)
      name: stationName,
      location: stationLocation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: stationStatus,
      description: stationDesc,
      regionName: stationRegion
    };

    // 사용자 정보에 stations 배열이 없으면 빈 배열로 처리 후 새 충전소 추가
    setCurrentUser({
      ...currentUser,
      stations: [...(currentUser.stations || []), newStation]
    });

    // 입력 필드 초기화
    setStationName('');
    setStationLocation('');
    setStationDesc('');
    setStationRegion('');
    setStationStatus('ON');
  };

  // 충전소 삭제 함수
  const handleRemoveStation = (stationId) => {
    // 해당 stationId를 제외한 새 배열로 교체
    setCurrentUser({
      ...currentUser,
      stations: currentUser.stations.filter(s => s.stationId !== stationId)
    });
  };

  return (
    <>
      <Header /> {/* 상단 헤더 컴포넌트 */}
      <div className="mypage-container" style={{ display: 'flex' }}>
        <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} /> {/* 왼쪽 사이드바 */}
        <div className="mypage-center-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChartTitle /> {/* 페이지 제목 또는 요약 차트 제목 */}
          <div className="mypage-body" style={{ width: '100%', maxWidth: 600 }}>
            
            {/* 사용자 정보 요약 */}
            <div className="mypage-info">
              <h2>내 충전소</h2>
              <div>가입일: <strong>{currentUser.joinedAt ? currentUser.joinedAt.slice(0,10) : '-'}</strong></div>
              <div>충전소 개수: <strong>{currentUser.stations ? currentUser.stations.length : 0}</strong></div>
              <div>AICOLINK 활용률: <strong>{currentUser.usageRate ?? 0}%</strong></div>
            </div>

            {/* 등록된 충전소 리스트 */}
            <div className="station-list">
              {currentUser.stations && currentUser.stations.length > 0 ? (
                currentUser.stations.map(station => (
                  <div key={station.stationId} className="station-item">
                    <strong>{station.name}</strong> ({station.regionName})<br />
                    위치: {station.location}<br />
                    설명: {station.description}<br />
                    상태: {station.status}<br />
                    <button onClick={() => handleRemoveStation(station.stationId)}>삭제</button>
                  </div>
                ))
              ) : (
                <div>등록된 충전소가 없습니다.</div>
              )}
            </div>

            {/* 충전소 추가 입력 폼 */}
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
              <select
                value={stationStatus}
                onChange={e => setStationStatus(e.target.value)}
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
              <button onClick={handleAddStation}>추가</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;