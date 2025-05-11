import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ onSignUp }) => { // **onSignUp prop 추가**
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();// 폼 제출 시 기본 동작 방지

    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    
    try {
        const result = onSignUp({ name, email, password });
        console.log('회원가입 결과:', result);
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
    

    // // **Mock 회원가입 처리**
    // console.log('회원가입 데이터:', { name, email, password });//for debugging
    // const result = onSignUp({ name, email, password });
    // console.log('회원가입 결과:', result);//for debugging
    // if (result.success) {
    //   alert(result.message);
    //   navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
    // } else {
    //     console.error('회원가입 요청 중 오류 발생:', error);
    //     alert('회원가입 요청 중 오류가 발생했습니다.');
    //     // alert(result.message); // 실패 메시지 표시
    // }


    // try {
    //   const response = await fetch('https://your-backend-api.com/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, password }),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert('회원가입 성공!');
    //     navigate('/login');
    //   } else {
    //     alert(`회원가입 실패: ${data.message}`);
    //   }
    // } catch (error) {
    //   console.error('회원가입 요청 중 오류 발생:', error);
    //   alert('회원가입 요청 중 오류가 발생했습니다.');
    // }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          required
        />
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
        {/* 비밀번호 길이 조건 문구 */}
        {password.length > 0 && password.length < 8 && (
          <p className="password-hint">비밀번호는 8자 이상이어야 합니다.</p>
        )}
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SignUp.css';

// const SignUp = () => {
//   const [name, setName] = useState(''); // 이름 상태 추가
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // 비밀번호 안정성 검사
//     if (password.length < 8) {
//         alert('비밀번호는 최소 8자 이상이어야 합니다.');
//         return;
//       }
//     // 비밀번호 확인
//     if (password !== confirmPassword) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     // 백엔드로 데이터 전송
//     try {
//       const response = await fetch('aicolink.ccfiesomsf23.us-east-1.rds.amazonaws.com', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('회원가입 성공!');
//         navigate('/login'); // 회원가입 후 로그인 페이지로 이동
//       } else {
//         alert(`회원가입 실패: ${data.message}`);
//       }
//     } catch (error) {
//       console.error('회원가입 요청 중 오류 발생:', error);
//       alert('회원가입 요청 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h1>회원가입</h1>
//         <label htmlFor="name">이름</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="이름을 입력하세요"
//           required
//         />
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
//         <label htmlFor="confirmPassword">비밀번호 확인</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="비밀번호를 다시 입력하세요"
//           required
//         />
//         <button type="submit">회원가입</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;