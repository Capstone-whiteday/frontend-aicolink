import { useState } from 'react'
import logo_aclnk from '/logo_aclnk.svg'
// import './App.css'
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header/>
      </div>
      <div>
        <ChartTitle/>
      </div>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {/* 여기에 메인 대시보드 콘텐츠 넣기 */}
    </div>
    </>
  )
}

export default App
