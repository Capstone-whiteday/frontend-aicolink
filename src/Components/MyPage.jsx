import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_mp from './Sidebar_mp';
import ChartTitle from './ChartTitle';
import './MyPage.css';
import './SttnComp.css'

// 🟢 [추가] 지역 목록(드롭다운용) - AddStation.jsx와 동일하게 사용
const regionOptions = [
  { regionId: 11, regionName: "서울특별시" },
  { regionId: 21, regionName: "부산광역시" },
  { regionId: 22, regionName: "대구광역시" },
  { regionId: 23, regionName: "인천광역시" },
  { regionId: 24, regionName: "광주광역시" },
  { regionId: 25, regionName: "대전광역시" },
  { regionId: 26, regionName: "울산광역시" },
  { regionId: 29, regionName: "세종특별자치시" },
  { regionId: 31, regionName: "경기도" },
  { regionId: 32, regionName: "강원도" },
  { regionId: 33, regionName: "충청북도" },
  { regionId: 34, regionName: "충청남도" },
  { regionId: 35, regionName: "전라북도" },
  { regionId: 36, regionName: "전라남도" },
  { regionId: 37, regionName: "경상북도" },
  { regionId: 38, regionName: "경상남도" },
  { regionId: 39, regionName: "제주특별자치도" }
];

// 오늘 날짜를 yyyy-MM-dd 형식으로 반환하는 함수
const getToday = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

// ----------------------
// 🟢 [변경/추가] 상세정보를 stationId로 GET해서 카드에 더 많은 정보 표시
// ----------------------
const StationCard = ({ station, onRemove, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: station.name,
    location: station.location,
    description: station.description,
    regionId: station.regionId || '',
    regionName: station.regionName || '',
    status: station.status,
  });

  // 🟢 [추가] 상세정보 상태
  const [detail, setDetail] = useState(null);

  // 🟢 [추가] stationId로 상세정보 요청
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/station/${station.stationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setDetail(data));
  }, [station.stationId]);

  // regionName → regionId 변환 (수정모드 진입 시)
  useEffect(() => {
    if (editMode) {
      if (!editData.regionId && station.regionName) {
        const found = regionOptions.find(r => r.regionName === station.regionName);
        if (found) setEditData(ed => ({ ...ed, regionId: found.regionId }));
      }
    }
    // eslint-disable-next-line
  }, [editMode]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // regionId를 regionName으로 변환해서 onEdit에 전달
    const regionObj = regionOptions.find(r => String(r.regionId) === String(editData.regionId));
    onEdit(station.stationId, {
      ...editData,
      regionName: regionObj ? regionObj.regionName : '',
      regionId: editData.regionId,
    });
    setEditMode(false);
  };

  return (
    <div className="station-item">
      {editMode ? (
        <>
          <div className="info-item">
            <span className="label">이름</span>
            <input className="value" name="name" value={editData.name} onChange={handleChange} />
          </div>
          {/* 🟢 [변경] 지역: 드롭다운으로 선택 */}
          <div className="info-item">
            <span className="label">지역</span>
            <select
              className="value"
              name="regionId"
              value={editData.regionId}
              onChange={handleChange}
              required
            >
              <option value="">-- 지역 선택 --</option>
              {regionOptions.map(region => (
                <option key={region.regionId} value={region.regionId}>
                  {region.regionName}
                </option>
              ))}
            </select>
          </div>
          <div className="info-item">
            <span className="label">위치</span>
            <input className="value" name="location" value={editData.location} onChange={handleChange} />
          </div>
          <div className="info-item">
            <span className="label">설명</span>
            <input className="value" name="description" value={editData.description} onChange={handleChange} />
          </div>
          <div className="info-item">
            <span className="label">상태</span>
            <select className="value" name="status" value={editData.status} onChange={handleChange}>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
          </div>
          <div className="station-buttons">
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setEditMode(false)}>취소</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="station-title">{station.name}</h2>
            {/* 🟢 [추가] 지역 정보도 카드에 표시 */}
            <div className="info-item">
              <span className="label">지역</span>
              <div className="value">{station.regionName || (() => {
                // regionId만 있을 때 regionName으로 변환
                const found = regionOptions.find(r => String(r.regionId) === String(station.regionId));
                return found ? found.regionName : '';
              })()}</div>
            </div>
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
              <button onClick={() => {
                console.log("삭제 요청 id:", station.stationId),
                onRemove(station.stationId)}}>삭제</button>
            </div>
          </div>
        </>
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
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/station/list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setStations(data));
  }, [setStations]);

  // 사용자별 충전소만 필터링 (userId로 연결)
  const myStations = stations.filter(station => station.userId === currentUser?.id);

  // 충전소 추가 (POST /station/register)
  const handleAddStation = async () => {
    if (!stationName || !stationLocation || !stationRegion) return;
    try {
      const res = await fetch('http://localhost:8080/register', {
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
        fetch('http://localhost:8080/station/list')
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
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/station/${stationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        setStations(stations.filter(s => s.stationId !== stationId));
      } else {
        console.error("삭제되었습니다:", res.status);
        alert("삭제되었습니다.");
      }
    } catch (e) {
      console.error("삭제 중 오류:", e);
    }
  };

  // 충전소 정보 수정 (PUT /station/{stationId})
  const handleEditStation = async (stationId, newData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/station/${stationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newData.name,
          status: newData.status,
          description: newData.description,
          // regionId, regionName도 함께 전송 (서버가 regionId를 받는다면)
          regionId: newData.regionId,
          regionName: newData.regionName
        })
      });

      if (res.ok) {
        fetch('http://localhost:8080/station/list', 
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => setStations(data));
      } else {
        console.error('수정 실패:', res.status);
        alert('수정 권한이 없거나 실패했습니다.');
      }
    } catch (e) {
      console.error('수정 중 오류:', e);
      alert('오류가 발생했습니다.');
    }
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* <Header /> */}
      <div className="mypage-container" style={{ display: 'flex' }}>
        <div className="sidebar-section">
          <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
          {/* <div className="weather-widget">
            <div className="weather-icon">🌤</div>
            <div className="weather-info">제주, 21℃</div>
            <button className="weather-btn">상세보기</button>
          </div> */}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChartTitle />
          {/* <div  style={{ width: '100%', maxWidth: 1000 }}> */}
          <br /><h1>내 정보</h1><br /><br />

          <div className="mypage-info">
            {/* <h2>내 충전소</h2> */}
            <div>가입일: <strong>{currentUser?.joinedAt ? currentUser.joinedAt.slice(0,10) : getToday()}</strong></div><br />
            <div>충전소 개수: <strong>{myStations.length}</strong></div><br />
            <div>마지막 수정날짜</div><strong>{currentUser?.lastModified ? currentUser.lastModified.slice(0,10) : getToday()}</strong><br />
            {/* <div>AICOLINK 활용률: <strong>{currentUser?.usageRate ?? 0}%</strong></div> */}
          </div>

          {/* 등록된 충전소 리스트 */}
          <div className="station-list">
            {myStations.length > 0 ? (
              myStations.map(station => (
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

/*
----------------------
🟢 변경/추가 설명
----------------------
- 각 충전소 카드에서 stationId로 상세정보를 GET해서 더 많은 정보를 표시할 수 있습니다.
- 카드에서 지역(regionName)도 항상 보여주고, 수정모드에서는 드롭다운으로 선택할 수 있습니다.
- regionId/regionName을 모두 관리하며, 저장 시 regionId/regionName을 함께 전송합니다(서버가 regionId를 받는다면).
- 기존 코드, 주석 등은 절대 삭제하지 않았습니다.
----------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar_mp from './Sidebar_mp';
// import ChartTitle from './ChartTitle';
// import './MyPage.css';
// import './SttnComp.css'

// // 🟢 [추가] 지역 목록(드롭다운용) - AddStation.jsx와 동일하게 사용
// const regionOptions = [
//   { regionId: 11, regionName: "서울특별시" },
//   { regionId: 21, regionName: "부산광역시" },
//   { regionId: 22, regionName: "대구광역시" },
//   { regionId: 23, regionName: "인천광역시" },
//   { regionId: 24, regionName: "광주광역시" },
//   { regionId: 25, regionName: "대전광역시" },
//   { regionId: 26, regionName: "울산광역시" },
//   { regionId: 29, regionName: "세종특별자치시" },
//   { regionId: 31, regionName: "경기도" },
//   { regionId: 32, regionName: "강원도" },
//   { regionId: 33, regionName: "충청북도" },
//   { regionId: 34, regionName: "충청남도" },
//   { regionId: 35, regionName: "전라북도" },
//   { regionId: 36, regionName: "전라남도" },
//   { regionId: 37, regionName: "경상북도" },
//   { regionId: 38, regionName: "경상남도" },
//   { regionId: 39, regionName: "제주특별자치도" }
// ];

// // 오늘 날짜를 yyyy-MM-dd 형식으로 반환하는 함수
// const getToday = () => {
//   const d = new Date();
//   return d.toISOString().slice(0, 10);
// };

// // ----------------------
// // 🟢 [변경] StationCard: 지역(regionName)도 카드에 보여주고, 수정모드에서는 드롭다운으로 선택
// // ----------------------
// const StationCard = ({ station, onRemove, onEdit }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState({
//     name: station.name,
//     location: station.location,
//     description: station.description,
//     // 🟢 regionId와 regionName 모두 관리
//     regionId: station.regionId || '',
//     regionName: station.regionName || '',
//     status: station.status,
//   });

//   // 🟢 regionName → regionId 변환 (수정모드 진입 시)
//   useEffect(() => {
//     if (editMode) {
//       if (!editData.regionId && station.regionName) {
//         const found = regionOptions.find(r => r.regionName === station.regionName);
//         if (found) setEditData(ed => ({ ...ed, regionId: found.regionId }));
//       }
//     }
//     // eslint-disable-next-line
//   }, [editMode]);

//   const handleChange = (e) => {
//     setEditData({ ...editData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // 🟢 regionId를 regionName으로 변환해서 onEdit에 전달
//     const regionObj = regionOptions.find(r => String(r.regionId) === String(editData.regionId));
//     onEdit(station.stationId, {
//       ...editData,
//       regionName: regionObj ? regionObj.regionName : '',
//       regionId: editData.regionId,
//     });
//     setEditMode(false);
//   };

//   return (
//     <div className="station-item">
//       {editMode ? (
//         <>
//           <div className="info-item">
//             <span className="label">이름</span>
//             <input className="value" name="name" value={editData.name} onChange={handleChange} />
//           </div>
//           {/* 🟢 [변경] 지역: 드롭다운으로 선택 */
//           <div className="info-item">
//             <span className="label">지역</span>
//             <select
//               className="value"
//               name="regionId"
//               value={editData.regionId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- 지역 선택 --</option>
//               {regionOptions.map(region => (
//                 <option key={region.regionId} value={region.regionId}>
//                   {region.regionName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="info-item">
//             <span className="label">위치</span>
//             <input className="value" name="location" value={editData.location} onChange={handleChange} />
//           </div>
//           <div className="info-item">
//             <span className="label">설명</span>
//             <input className="value" name="description" value={editData.description} onChange={handleChange} />
//           </div>
//           <div className="info-item">
//             <span className="label">상태</span>
//             <select className="value" name="status" value={editData.status} onChange={handleChange}>
//               <option value="ON">ON</option>
//               <option value="OFF">OFF</option>
//             </select>
//           </div>
//           <div className="station-buttons">
//             <button onClick={handleSave}>저장</button>
//             <button onClick={() => setEditMode(false)}>취소</button>
//           </div>
//         </>
//       ) : (
//         <>
//           <div>
//             <h2 className="station-title">{station.name}</h2>
//             {/* 🟢 [추가] 지역 정보도 카드에 표시 */}
//             <div className="info-item">
//               <span className="label">지역</span>
//               <div className="value">{station.regionName || (() => {
//                 // regionId만 있을 때 regionName으로 변환
//                 const found = regionOptions.find(r => String(r.regionId) === String(station.regionId));
//                 return found ? found.regionName : '';
//               })()}</div>
//             </div>
//             <div className="info-item">
//               <span className="label">위치</span>
//               <div className="value">{station.location}</div>
//             </div>
//             <div className="info-item">
//               <span className="label">설명</span>
//               <div className="value">{station.description}</div>
//             </div>
//             <div className="info-item">
//               <span className="label">상태</span>
//               <div className="value">{station.status}</div>
//             </div>
//             <div className="station-buttons">
//               <button onClick={() => setEditMode(true)}>정보수정</button>
//               <button onClick={() => {
//                 console.log("삭제 요청 id:", station.stationId),
//                 onRemove(station.stationId)}}>삭제</button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const MyPage = ({
//   isLoggedIn,
//   currentUser,
//   setCurrentUser,
//   stations,      // 전체 충전소 배열 (App.jsx에서 prop으로 전달)
//   setStations    // 전체 충전소 setter (App.jsx에서 prop으로 전달)
// }) => {
//   const navigate = useNavigate();

//   // 입력 필드 상태
//   const [stationName, setStationName] = useState('');
//   const [stationLocation, setStationLocation] = useState('');
//   const [stationDesc, setStationDesc] = useState('');
//   const [stationRegion, setStationRegion] = useState('');
//   const [stationStatus, setStationStatus] = useState('ON');

//   // 로그인 체크
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login', { replace: true });
//     }
//   }, [isLoggedIn, navigate]);

//   // 충전소 목록 불러오기 (GET /station/list)
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch('http://localhost:8080/station/list', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//       credentials: 'include',
//     })
//       .then(res => res.json())
//       .then(data => setStations(data));
//   }, [setStations]);

//   // 사용자별 충전소만 필터링 (userId로 연결)
//   const myStations = stations.filter(station => station.userId === currentUser?.id);

//   // 충전소 추가 (POST /station/register)
//   const handleAddStation = async () => {
//     if (!stationName || !stationLocation || !stationRegion) return;
//     try {
//       const res = await fetch('http://localhost:8080/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           stationName,
//           location: stationLocation,
//           status: stationStatus,
//           description: stationDesc,
//           regionId: Number(stationRegion)
//         })
//       });
//       if (res.ok) {
//         fetch('http://localhost:8080/station/list')
//           .then(res => res.json())
//           .then(data => setStations(data));
//       }
//     } catch (e) {}
//     setStationName('');
//     setStationLocation('');
//     setStationDesc('');
//     setStationRegion('');
//     setStationStatus('ON');
//   };

//   // 충전소 삭제 (DELETE /station/{stationId})
//   const handleRemoveStation = async (stationId) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:8080/station/${stationId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (res.ok) {
//         setStations(stations.filter(s => s.stationId !== stationId));
//       } else {
//         console.error("삭제되었습니다:", res.status);
//         alert("삭제되었습니다.");
//       }
//     } catch (e) {
//       console.error("삭제 중 오류:", e);
//     }
//   };

//   // 충전소 정보 수정 (PUT /station/{stationId})
//   const handleEditStation = async (stationId, newData) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`http://localhost:8080/station/${stationId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           name: newData.name,
//           status: newData.status,
//           description: newData.description,
//           // 🟢 [변경] regionId, regionName도 함께 전송 (서버가 regionId를 받는다면)
//           regionId: newData.regionId,
//           regionName: newData.regionName
//         })
//       });

//       if (res.ok) {
//         fetch('http://localhost:8080/station/list', 
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           })
//           .then(res => res.json())
//           .then(data => setStations(data));
//       } else {
//         console.error('수정 실패:', res.status);
//         alert('수정 권한이 없거나 실패했습니다.');
//       }
//     } catch (e) {
//       console.error('수정 중 오류:', e);
//       alert('오류가 발생했습니다.');
//     }
//   };

//   if (!isLoggedIn) return null;

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="mypage-container" style={{ display: 'flex' }}>
//         <div className="sidebar-section">
//           <Sidebar_mp isLoggedIn={isLoggedIn} currentUser={currentUser} />
//           <div className="weather-widget">
//             <div className="weather-icon">🌤</div>
//             <div className="weather-info">제주, 21℃</div>
//             <button className="weather-btn">상세보기</button>
//           </div>
//         </div>

//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <ChartTitle />
//           {/* <div  style={{ width: '100%', maxWidth: 1000 }}> */}
//           <br /><h1>내 정보</h1><br /><br />

//           <div className="mypage-info">
//             {/* <h2>내 충전소</h2> */}
//             <div>가입일: <strong>{currentUser?.joinedAt ? currentUser.joinedAt.slice(0,10) : getToday()}</strong></div><br />
//             <div>충전소 개수: <strong>{myStations.length}</strong></div><br />
//             <div>마지막 수정날짜</div><strong>{currentUser?.lastModified ? currentUser.lastModified.slice(0,10) : getToday()}</strong><br />
//             {/* <div>AICOLINK 활용률: <strong>{currentUser?.usageRate ?? 0}%</strong></div> */}
//           </div>

//           {/* 등록된 충전소 리스트 */}
//           <div className="station-list">
//             {myStations.length > 0 ? (
//               myStations.map(station => (
//                 <StationCard
//                   key={station.stationId}
//                   station={station}
//                   onRemove={handleRemoveStation}
//                   onEdit={handleEditStation}
//                 />
//               ))
//             ) : (
//               <div>등록된 충전소가 없습니다.</div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </>
//   );
// };

// export default MyPage;

// /*
// ----------------------
// 🟢 변경/추가 설명
// ----------------------
// - 카드에서 지역(regionName)도 항상 보여주고, 수정모드에서는 드롭다운으로 선택할 수 있습니다.
// - regionId/regionName을 모두 관리하며, 저장 시 regionId/regionName을 함께 전송합니다(서버가 regionId를 받는다면).
// - 기존 코드, 주석 등은 절대 삭제하지 않았습니다.
// ----------------------*/
