import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ onSignUp }) => {
  console.log("🧪 SignUp 컴포넌트 진입");
  console.log("✅ onSignUp typeof:", typeof onSignUp);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // 가입 날짜(ISO 문자열) 생성
  const createdAt = new Date().toISOString();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const result = await onSignUp({ name, email, password,createdAt });
      if (result.success) {
        alert(result.message);
        navigate('/login');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름을 입력하세요" required />
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" required />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" required />
        {password.length > 0 && password.length < 8 && (
          <p className="password-hint">비밀번호는 8자 이상이어야 합니다.</p>
        )}
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호를 다시 입력하세요" required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;