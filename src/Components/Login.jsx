import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 백엔드 요청 대신 콘솔 로그로 입력값 확인
    console.log('로그인 시도:', { email, password });
    alert('로그인 버튼이 클릭되었습니다!');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;




// import { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // 백엔드 연동을 위한 요청 예시
//     try {
//       const response = await fetch('https://your-backend-api.com/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert('로그인 성공!');
//         // 로그인 성공 시 처리 (예: 토큰 저장, 페이지 이동)
//       } else {
//         alert(`로그인 실패: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('로그인 요청 중 오류 발생:', error);
//       alert('로그인 요청 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h1>로그인</h1>
//         <label htmlFor="email">이메일</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="이메일을 입력하세요"
//           required
//         />
//         <label htmlFor="password">비밀번호</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="비밀번호를 입력하세요"
//           required
//         />
//         <button type="submit">로그인</button>
//       </form>
//     </div>
//   );
// };

// export default Login;