import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_mp from './Sidebar_mp';
import Header from './Header';
import ChartTitle from './ChartTitle';

// 충전소 카드 컴포넌트 (수정/삭제 기능 포함)
const StationCard = ({ station, onRemove, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: station.name,
    description: station.description,
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
          <strong>{station.name}</strong><br />
          설명: {station.description}<br />
          상태: {station.status}<br />
          <button onClick={() => setEditMode(true)}>정보수정</button>
          <button onClick={() => onRemove(station.stationId)}>삭제</button>
        </>
      )}
    </div>
  );
};

const MyPage = ({ isLoggedIn, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  // 충전소 목록 상태
  const [stations, setStations] = useState([]);
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
  }, []);

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
        <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
        <div className="mypage-center-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChartTitle />
          <div className="mypage-body" style={{ width: '100%', maxWidth: 600 }}>
            <div className="mypage-info">
              <h2>내 충전소</h2>
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
                placeholder="regionId (숫자)"
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
            <div className="station-list">
              {stations && stations.length > 0 ? (
                stations.map(station => (
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
      </div>
    </>
  );
};

export default MyPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar_mp from './Sidebar_mp';
// import Header from './Header';
// import ChartTitle from './ChartTitle';

// // 충전소 정보 하나를 보여주는 컴포넌트 (수정 기능 포함)
// const StationCard = ({ station, onRemove, onEdit }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({
//     name: station.name,
//     location: station.location,
//     description: station.description,
//     regionName: station.regionName,
//     status: station.status,
//   });

//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     onEdit(station.stationId, editData);
//     setEditMode(false);
//   };

//   return (
//     <div className="station-item">
//       {editMode ? (
//         <>
//           <input name="name" value={editData.name} onChange={handleChange} />
//           <input name="regionName" value={editData.regionName} onChange={handleChange} />
//           <input name="location" value={editData.location} onChange={handleChange} />
//           <input name="description" value={editData.description} onChange={handleChange} />
//           <select name="status" value={editData.status} onChange={handleChange}>
//             <option value="ON">ON</option>
//             <option value="OFF">OFF</option>
//           </select>
//           <button onClick={handleSave}>저장</button>
//           <button onClick={() => setEditMode(false)}>취소</button>
//         </>
//       ) : (
//         <>
//           <strong>{station.name}</strong> ({station.regionName})<br />
//           위치: {station.location}<br />
//           설명: {station.description}<br />
//           상태: {station.status}<br />
//           <button onClick={() => setEditMode(true)}>정보수정</button>
//           <button onClick={() => onRemove(station.stationId)}>삭제</button>
//         </>
//       )}
//     </div>
//   );
// };

// const MyPage = ({ isLoggedIn, currentUser, setCurrentUser }) => {
//   const navigate = useNavigate();

//   // 입력 필드 상태
//   const [stationName, setStationName] = useState('');
//   const [stationLocation, setStationLocation] = useState('');
//   const [stationDesc, setStationDesc] = useState('');
//   const [stationRegion, setStationRegion] = useState('');
//   const [stationStatus, setStationStatus] = useState('ON');

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login', { replace: true });
//     }
//   }, [isLoggedIn, navigate]);

//   if (!isLoggedIn || !currentUser) return null;

//   // 충전소 추가 함수
//   const handleAddStation = () => {
//     if (!stationName || !stationLocation) return;
//     const newStation = {
//       stationId: Date.now(),
//       name: stationName,
//       location: stationLocation,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       status: stationStatus,
//       description: stationDesc,
//       regionName: stationRegion
//     };
//     setCurrentUser({
//       ...currentUser,
//       stations: [...(currentUser.stations || []), newStation]
//     });
//     setStationName('');
//     setStationLocation('');
//     setStationDesc('');
//     setStationRegion('');
//     setStationStatus('ON');
//   };

//   // 충전소 삭제 함수
//   const handleRemoveStation = (stationId) => {
//     setCurrentUser({
//       ...currentUser,
//       stations: currentUser.stations.filter(s => s.stationId !== stationId)
//     });
//   };

//   // 충전소 정보 수정 함수
//   const handleEditStation = (stationId, newData) => {
//     setCurrentUser({
//       ...currentUser,
//       stations: currentUser.stations.map(s =>
//         s.stationId === stationId
//           ? { ...s, ...newData, updatedAt: new Date().toISOString() }
//           : s
//       )
//     });
//   };

//   return (
//     <>
//       <Header />
//       <div className="mypage-container" style={{ display: 'flex' }}>
//         <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
//         <div className="mypage-center-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <ChartTitle />
//           <div className="mypage-body" style={{ width: '100%', maxWidth: 600 }}>
//             {/* 사용자 정보 요약 */}
//             <div className="mypage-info">
//               <h2>내 충전소</h2>
//               <div>가입일: <strong>{currentUser.joinedAt ? currentUser.joinedAt.slice(0,10) : '-'}</strong></div>
//               <div>충전소 개수: <strong>{currentUser.stations ? currentUser.stations.length : 0}</strong></div>
//               <div>AICOLINK 활용률: <strong>{currentUser.usageRate ?? 0}%</strong></div>
//             </div>

//             {/* 충전소 추가 입력 폼 */}
//             <div className="add-station-form">
//               <h3>충전소 추가</h3>
//               <input
//                 type="text"
//                 placeholder="충전소 이름"
//                 value={stationName}
//                 onChange={e => setStationName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="위치"
//                 value={stationLocation}
//                 onChange={e => setStationLocation(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="설명"
//                 value={stationDesc}
//                 onChange={e => setStationDesc(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="지역명"
//                 value={stationRegion}
//                 onChange={e => setStationRegion(e.target.value)}
//               />
//               <select
//                 value={stationStatus}
//                 onChange={e => setStationStatus(e.target.value)}
//               >
//                 <option value="ON">ON</option>
//                 <option value="OFF">OFF</option>
//               </select>
//               <button onClick={handleAddStation}>추가</button>
//             </div>

//             {/* 등록된 충전소 리스트: 각각 StationCard로 렌더링 */}
//             <div className="station-list">
//               {currentUser.stations && currentUser.stations.length > 0 ? (
//                 currentUser.stations.map(station => (
//                   <StationCard
//                     key={station.stationId}
//                     station={station}
//                     onRemove={handleRemoveStation}
//                     onEdit={handleEditStation}
//                   />
//                 ))
//               ) : (
//                 <div>등록된 충전소가 없습니다.</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyPage;