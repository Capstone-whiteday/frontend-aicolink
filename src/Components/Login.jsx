import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from './Header'; // Header 컴포넌트 import
const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        // const response = await fetch('http://52.79.124.254:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // localStorage.setItem('name', Name); // 이메일 저장
        localStorage.setItem('email', email); // 이메일 저장
        // setCurrentUser({ name: data.name, email: data.email }); // ← 이 줄 추가!
        setCurrentUser({ name: data.name || email.split('1')[0], email: data.email || email });
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(`로그인 실패: ${data.message || '이메일 또는 비밀번호가 잘못되었습니다.'}`);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };
 
  return (
    <>

    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">로그인</h1>
          <div className="form-group">
            <label htmlFor="email" className="input-label">이메일</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onChange={(e) => setName(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="input-label">비밀번호</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button type="submit" className="login-button">로그인</button>
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
        </form>
      </div>
      
      <div className="login-right">
        <div className="brand-decoration"></div>
        <h1 className="brand-text">Smarter<br />Charge,<br />Greener<br />Future</h1>
        <p className="brand-description">인공지능과 함께한 전기차 충전소 최적화, 더 나은 미래를 만들어갑니다</p>
      </div>
    </div>
    </>
  );
};

export default Login;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setIsLoggedIn, setCurrentUser }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://52.79.124.254:8080/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('email', email); // 이메일 저장
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         alert(`로그인 실패: ${data.message || '이메일 또는 비밀번호가 잘못되었습니다.'}`);
//       }
//     } catch (error) {
//       console.error('로그인 오류:', error);
//       alert('로그인 요청 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form-wrapper">
//         <form className="login-form" onSubmit={handleSubmit}>
//           <h1 className="login-title">로그인</h1>
//           <div className="form-group">
//             <label htmlFor="email" className="input-label">이메일</label>
//             <input
//               type="email"
//               id="email"
//               className="input-field"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="이메일을 입력하세요"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password" className="input-label">비밀번호</label>
//             <input
//               type="password"
//               id="password"
//               className="input-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="비밀번호를 입력하세요"
//               required
//             />
//           </div>
//           <button type="submit" className="login-button">로그인</button>
//           <button type="button" className="signup-button" onClick={() => navigate('/signup')}>회원가입</button>
//         </form>
//       </div>
      
//       <div className="login-right">
//         <div className="brand-decoration"></div>
//         <h1 className="brand-text">Smart<br />Charge,<br />Greener<br />Future</h1>
//         <p className="brand-description">인공지능 기반 전기차 충전 최적화를 통해 더 깨끗한 미래를 만들어갑니다</p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';

// // const Login = ({ setIsLoggedIn, setCurrentUser }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await fetch('http://52.79.124.254:8080/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         localStorage.setItem('token', data.token);
// //         localStorage.setItem('email', email); // 이메일 저장
// //         setIsLoggedIn(true);
// //         navigate('/');
// //       } else {
// //         alert(`로그인 실패: ${data.message || '이메일 또는 비밀번호가 잘못되었습니다.'}`);
// //       }
// //     } catch (error) {
// //       console.error('로그인 오류:', error);
// //       alert('로그인 요청 중 오류가 발생했습니다.');
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <form className="login-form" onSubmit={handleSubmit}>
// //         <h1>로그인</h1>
// //         <label htmlFor="email">이메일</label>
// //         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //         <label htmlFor="password">비밀번호</label>
// //         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //         <button type="submit">로그인</button>
// //         <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
// //       </form>
// //       <div className="login-right">
// //         <img src="/PhraseImage_3.png" alt="Phrase" />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// // // import { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import './Login.css';

// // // const Login = ({ setIsLoggedIn, setCurrentUser }) => {
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const response = await fetch('http://52.79.124.254:8080/auth/login', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include', // ✅ 쿠키 전달 필수
// // //         body: JSON.stringify({ email, password }),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         localStorage.setItem('token', data.token); // ✅ JWT 저장
// // //         setIsLoggedIn(true);
// // //         // setCurrentUser({ email }); // ✅ 사용자 이메일만 저장 -> 아래 코드로 수정함 0717.09:12AM
// // //         setCurrentUser({ name: data.name, email: data.email });

// // //         alert('로그인 성공!');
// // //         navigate('/');
// // //       } else {
// // //         alert(`로그인 실패: ${data.message || '이메일 또는 비밀번호가 잘못되었습니다.'}`);
// // //       }
// // //     } catch (error) {
// // //       console.error('로그인 오류:', error);
// // //       alert('로그인 요청 중 오류가 발생했습니다.');
// // //     }
// // //   };

// // //   return (
// // //     <div className="login-container">
// // //       <form className="login-form" onSubmit={handleSubmit}>
// // //         <h1>로그인</h1>
// // //         <label htmlFor="email">이메일</label>
// // //         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

// // //         <label htmlFor="password">비밀번호</label>
// // //         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

// // //         <button type="submit">로그인</button>
// // //         <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
// // //       </form>
// // //       <div className="login-right">
// // //         <img src="/PhraseImage_3.png" alt="Phrase" />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;
