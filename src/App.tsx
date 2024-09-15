import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import SidePanel from './Components/SidePanel/SidePanel'
import Dashboard from './Views/Dashboard/Dashboard'
import ConsolePage from './Views/ConsolePage/ConsolePage'
import ProductPage from './Views/ProductPage/ProductPage'
import { DataContext } from './Context/DataProvider'

function App() {
  const { selectedProduct } = useContext(DataContext);
  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(false);
  return (
    <>
        <Navbar setSidePanelOpen={setSidePanelOpen} />
        <SidePanel open={sidePanelOpen} onClose={() => setSidePanelOpen(false)} />
        <Routes>
          <Route children path='/' element={<Dashboard />} />
          <Route children path='/product/:productName' element={selectedProduct ? <ProductPage product={selectedProduct} /> : <Dashboard />} />
          <Route children path='/console/:platform' element={<ConsolePage />} />
        </Routes>
    </>
  )
}

export default App
