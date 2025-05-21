import './AddStation.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStation = ({ currentUser }) => {
  const navigate = useNavigate();

  // 입력 폼 상태
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    regionId: '',
    status: 'ON',
  });

  // 지역 목록 상태
  const [regions, setRegions] = useState([]);

  // 컴포넌트 마운트 시 지역 목록 가져오기
useEffect(() => {
  const fetchRegions = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/region/list', {
      // const response = await fetch('http://52.79.124.254:8080/region/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('지역 목록 불러오기 실패:', error);
    }
  };

  fetchRegions();
}, []);

  // 입력 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 충전소 등록 요청
  const handleAddStation = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/station/register', {
      // const response = await fetch('http://52.79.124.254:8080/swagger-ui/index.html#/station/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          stationName: form.name,
          location: form.location,
          description: form.description,
          regionId: Number(form.regionId),
          status: form.status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('충전소가 추가되었습니다!');
        navigate('/mypage');
      } else {
        alert(`추가 실패: ${data.message || '오류 발생'}`);
      }
    } catch (err) {
      alert('서버 오류로 충전소 추가에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleAddStation}>
        <h1>충전소 추가</h1>

        <label htmlFor="name">충전소 이름</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label htmlFor="location">위치</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} required />

        <label htmlFor="description">설명</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label htmlFor="regionId">지역 선택</label>
        <select name="regionId" value={form.regionId} onChange={handleChange} required>
          <option value="">-- 지역 선택 --</option>
          {regions.map(region => (
            <option key={region.regionId} value={region.regionId}>
              {region.regionName}
            </option>
          ))}
        </select>

        <label htmlFor="status">상태</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>

        <button type="submit">충전소 추가</button>
        <button type="button" onClick={() => navigate('/mypage')}>취소</button>
      </form>
    </div>
  );
};

export default AddStation;

// import './AddStation.css';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // MyPage의 handleAddStation 로직 참고하여 구현
// const AddStation = ({ currentUser, setStations, stations }) => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     location: '',
//     description: '',
//     regionId: '',
//     status: 'ON',
//   });
//   // 지역 목록 상태
//   const [regions, setRegions] = useState([]);

//   // 입력값 변경 핸들러
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // // MyPage의 handleAddStation 참고
//   // const handleAddStation = (e) => {
//   //   e.preventDefault();
//   //   if (!form.name || !form.location) {
//   //     alert('충전소 이름과 위치를 입력해주세요.');
//   //     return;
//   //   }
//   //   const newStation = {
//   //     stationId: Date.now(),
//   //     name: form.name,
//   //     location: form.location,
//   //     createdAt: new Date().toISOString(),
//   //     updatedAt: new Date().toISOString(),
//   //     status: form.status,
//   //     description: form.description,
//   //     regionName: form.regionName,
//   //     userId: currentUser?.id,
//   //   };
//   //   setStations([...stations, newStation]);
//   //   alert('충전소가 추가되었습니다!');
//   //   navigate('/mypage');
//   // };
//   const handleAddStation = async (e) => {
//   e.preventDefault();
//   if (!form.name || !form.location || !form.regionId) {
//     alert('충전소 이름, 위치, 지역 ID는 필수입니다.');
//     return;
//   }

//   const token = localStorage.getItem('token');

//   try {
//     const response = await fetch('http://52.79.124.254:8080/station/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         stationName: form.name,
//         location: form.location,
//         description: form.description,
//         regionId: Number(form.regionId), // 중요: regionName → regionId (숫자)
//         status: form.status,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('충전소가 추가되었습니다!');
//       navigate('/mypage');
//     } else {
//       alert(`추가 실패: ${data.message || '오류 발생'}`);
//     }
//   } catch (err) {
//     alert('서버 오류로 충전소 추가에 실패했습니다.');
//   }
// };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleAddStation}>
//         <h1>충전소 추가</h1>
//         <label htmlFor="name">충전소 이름</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="충전소 이름"
//           required
//         />
//         <label htmlFor="location">위치</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="충전소 위치"
//           required
//         />
//         <label htmlFor="description">설명</label>
//         <textarea
//           id="description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           placeholder="충전소 설명"
//         />
//         <label htmlFor="regionId">지역명</label>
//         <input
//           type="text"
//           id="regionId"
//           name="regionName"
//           value={form.regionName}
//           onChange={handleChange}
//           placeholder="지역명"
//         />
//         <label htmlFor="status">상태</label>
//         <select
//           id="status"
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//         >
//           <option value="ON">ON</option>
//           <option value="OFF">OFF</option>
//         </select>
//         <button type="submit">충전소 추가</button>
//         <button type="button" onClick={() => navigate('/mypage')}>취소</button>
//       </form>
//     </div>
//   );
// };

// export default AddStation;


// // import './AddStation.css';
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const AddStation = () => {
// //   const navigate = useNavigate();
// //   const [station, setStation] = useState({
// //     stationId: Date.now(),
// //     name: '',
// //     location: '',
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //     status: 'ON',
// //     description: '',
// //     regionName: '',
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setStation({ ...station, [name]: value });
// //   };

// //   const handleAddStation = () => {
// //     if (!station.name || !station.location) {
// //       alert('충전소 이름과 위치를 입력해주세요.');
// //       return;
// //     }
// //     console.log('충전소 추가:', station);
// //     alert('충전소가 추가되었습니다!');
// //     navigate('/mypage'); // 마이페이지로 이동
// //   };

// //   return (
// //     <div className="add-station-wrapper">
// //       <h1>충전소 추가하기</h1>
// //       <div className="add-station-form">
// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="충전소 이름"
// //           value={station.name}
// //           onChange={handleInputChange}
// //         />
// //         <input
// //           type="text"
// //           name="location"
// //           placeholder="충전소 위치"
// //           value={station.location}
// //           onChange={handleInputChange}
// //         />
// //         <textarea
// //           name="description"
// //           placeholder="충전소 설명"
// //           value={station.description}
// //           onChange={handleInputChange}
// //         />
// //         <input
// //           type="text"
// //           name="regionName"
// //           placeholder="지역 이름"
// //           value={station.regionName}
// //           onChange={handleInputChange}
// //         />
// //         <button onClick={handleAddStation}>추가</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddStation;
