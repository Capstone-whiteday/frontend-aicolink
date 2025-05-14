import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Navigate 추가
import { useState } from 'react';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyPage from './Components/MyPage';
import AddStation from './Components/AddStation';
import Sidebar_mp from './Components/Sidebar_mp'; // 마이페이지용 사이드바
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [users, setUsers] = useState([]); // 사용자 정보 관리
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보 관리 추가****
  const handleSignUp = ({ name, email, password }) => {
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }
  
    setUsers((prevUsers) => [...prevUsers, { name, email, password }]);
    return { success: true, message: '회원가입 성공!' };
  };
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={
            <Login 
              setIsLoggedIn={setIsLoggedIn} 
              setCurrentUser={setCurrentUser} // **setCurrentUser prop 추가**
              users={users} // **users prop 추가**
            />
          } 
        />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/" element={
          isLoggedIn ? (
            <>
              <ChartTitle />
              <div style={{ display: 'flex' }}>
                <Sidebar
                 isLoggedIn={isLoggedIn} 
                 setIsLoggedIn={setIsLoggedIn}
                 currentUser={currentUser} // **currentUser prop 추가**
                />
                <Dashboard />
              </div>
            </>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/mypage" element={
           <>
           <ChartTitle />
           <Sidebar_mp
               isLoggedIn={isLoggedIn} 
               setIsLoggedIn={setIsLoggedIn}
               currentUser={currentUser} // **currentUser prop 추가**
              />
          <MyPage
           isLoggedIn={isLoggedIn} 
           />
            
           </> 
           } />
           
        <Route path="/add-station" element={<AddStation />} />
        {/* <Route path="/add-station" element={<AddStation />} /> */}
        {/* <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} /> */}
        {/* <Route path="/add-station" element={<AddStation />} /> */}
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import Header from "./Components/Header";
// import ChartTitle from "./Components/ChartTitle";
// import Sidebar from './Components/Sidebar';
// import Dashboard from './Components/Dashboard';
// import Login from './Components/Login';
// import SignUp from './Components/SignUp';
// import MyPage from './Components/MyPage';
// import AddStation from './Components/AddStation';
// import Sidebar_mp from './Components/Sidebar_mp'; // 마이페이지용 사이드바
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
//   const [users, setUsers] = useState([]); // 사용자 정보 관리
//   const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보 관리 추가****
//   const handleSignUp = ({ name, email, password }) => {
//     const existingUser = users.find((user) => user.email === email);
//     if (existingUser) {
//       return { success: false, message: '이미 사용 중인 이메일입니다.' };
//     }
  
//     setUsers((prevUsers) => [...prevUsers, { name, email, password }]);
//     return { success: true, message: '회원가입 성공!' };
//   };
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/login" element={
//             <Login 
//               setIsLoggedIn={setIsLoggedIn} 
//               setCurrentUser={setCurrentUser} // **setCurrentUser prop 추가**
//               users={users} // **users prop 추가**
//             />
//           } 
//         />
//         <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
//         <Route path="/" element={
//           <>
//             <ChartTitle />
//             <div style={{ display: 'flex' }}>
//               <Sidebar
//                isLoggedIn={isLoggedIn} 
//                setIsLoggedIn={setIsLoggedIn}
//                currentUser={currentUser} // **currentUser prop 추가**
//               />
//               <Dashboard />
//             </div>
//           </>
//         } />
//         <Route path="/mypage" element={
//            <>
//            <ChartTitle />
//            <Sidebar_mp
//                isLoggedIn={isLoggedIn} 
//                setIsLoggedIn={setIsLoggedIn}
//                currentUser={currentUser} // **currentUser prop 추가**
//               />
//           <MyPage
//            isLoggedIn={isLoggedIn} 
//            />
            
//            </> 
//            } />
           
//         <Route path="/add-station" element={<AddStation />} />
//         {/* <Route path="/add-station" element={<AddStation />} /> */}
//         {/* <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} />} /> */}
//         {/* <Route path="/add-station" element={<AddStation />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;