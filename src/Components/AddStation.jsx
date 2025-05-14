import './AddStation.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStation = () => {
  const navigate = useNavigate();
  const [station, setStation] = useState({
    stationId: Date.now(),
    name: '',
    location: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'ON',
    description: '',
    regionName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStation({ ...station, [name]: value });
  };

  const handleAddStation = () => {
    if (!station.name || !station.location) {
      alert('충전소 이름과 위치를 입력해주세요.');
      return;
    }
    console.log('충전소 추가:', station);
    alert('충전소가 추가되었습니다!');
    navigate('/mypage'); // 마이페이지로 이동
  };

  return (
    <div className="add-station-wrapper">
      <h1>충전소 추가하기</h1>
      <div className="add-station-form">
        <input
          type="text"
          name="name"
          placeholder="충전소 이름"
          value={station.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="충전소 위치"
          value={station.location}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="충전소 설명"
          value={station.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="regionName"
          placeholder="지역 이름"
          value={station.regionName}
          onChange={handleInputChange}
        />
        <button onClick={handleAddStation}>추가</button>
      </div>
    </div>
  );
};

export default AddStation;