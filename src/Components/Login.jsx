import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = ({ setIsLoggedIn, setCurrentUser, users }) => { // **users prop 추가**
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // **사용자 인증 로직 추가**
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
      return;
    }

    // 로그인 성공
    setIsLoggedIn(true);
    setCurrentUser(user); // 로그인한 사용자 정보 설정
    navigate('/'); // 메인 페이지로 이동
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
        <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
        {/* <button type="button" onClick={() => navigate('/')}>뒤로가기</button> */}
      </form>
    </div>
  );
};

export default Login;



// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setIsLoggedIn, setCurrentUser, users }) => { // **users prop 추가**
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     try{
//     // **사용자 인증 로직 추가**
//     const user = users.find((user) => user.email === email && user.password === password);
//     if (!user) {
//       alert('이메일 또는 비밀번호가 잘못되었습니다.');
//       return;
//     }
   
//     // 로그인 성공 시 사용자 정보 설정
//     setIsLoggedIn(true);
//     setCurrentUser(user); // 로그인한 사용자 정보 설정
//     alert('로그인 성공!');
//     navigate('/'); // 메인 페이지로 이동
//   } catch (error) {
//     console.error('로그인 중 오류 발생:', error);
//     alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
//         <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
//       </form>
//     </div>
//   );
//   }
// };

// export default Login;