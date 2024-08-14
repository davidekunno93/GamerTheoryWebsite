import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import SidePanel from './Components/SidePanel/SidePanel'
import Dashboard from './Views/Dashboard/Dashboard'

function App() {
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  return (
    <>
        <Navbar setSidePanelOpen={setSidePanelOpen} />
        <SidePanel open={sidePanelOpen} onClose={() => setSidePanelOpen(false)} />
        <Routes>
          <Route children path='/' element={<Dashboard />} />
        </Routes>
    </>
  )
}

export default App
