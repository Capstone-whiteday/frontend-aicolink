import { useState } from 'react'
import logo_aclnk from '/logo_aclnk.svg'
// import './App.css'
import Header from "./Components/Header";
import ChartTitle from "./Components/ChartTitle";
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

    </>
  )
}

export default App
