import './AddStation.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// 🟡 region/list API가 없을 때 사용할 목 데이터
const mockRegions = [

  { "regionId": 11, "regionName": "서울특별시" },
  { "regionId": 21, "regionName": "부산광역시" },
  { "regionId": 22, "regionName": "대구광역시" },
  { "regionId": 23, "regionName": "인천광역시" },
  { "regionId": 24, "regionName": "광주광역시" },
  { "regionId": 25, "regionName": "대전광역시" },
  { "regionId": 26, "regionName": "울산광역시" },
  { "regionId": 29, "regionName": "세종특별자치시" },
  { "regionId": 31, "regionName": "경기도" },
  { "regionId": 32, "regionName": "강원도" },
  { "regionId": 33, "regionName": "충청북도" },
  { "regionId": 34, "regionName": "충청남도" },
  { "regionId": 35, "regionName": "전라북도" },
  { "regionId": 36, "regionName": "전라남도" },
  { "regionId": 37, "regionName": "경상북도" },
  { "regionId": 38, "regionName": "경상남도" },
  { "regionId": 39, "regionName": "제주특별자치도" }
];




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
    // 실제 API 대신 목데이터 사용
    setRegions(mockRegions);
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
          {/* {regions.map(region => (
            <option key={region.regionId} value={region.regionId}>
              {region.regionName}
            </option>
          ))} */}
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
