import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        
        {/* 메인 페이지 */}
        <Route path="/" element={
          <>
            <Header />
            <ChartTitle />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <Dashboard />
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

// import { useState } from 'react'
// import logo_aclnk from '/logo_aclnk.svg'
// // import './App.css'
// import Header from "./Components/Header";
// import ChartTitle from "./Components/ChartTitle";
// import Sidebar from './Components/Sidebar';
// import Dashboard from './Components/Dashboard';
// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <Header/>
//       </div>
//       <div>
//         <ChartTitle/>
//       </div>
//       <div style={{ display: 'flex' }}>
//         <Sidebar />
//         <Dashboard />
//     </div>
//     </>
//   )
// }

// export default App
