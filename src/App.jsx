import { useState } from 'react'
import logo_aclnk from '/logo_aclnk.svg'
// import './App.css'
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
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
        <Dashboard />
    </div>
    </>
  )
}

export default App
