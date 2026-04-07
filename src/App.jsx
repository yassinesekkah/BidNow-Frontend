import Marketplace from './pages/Marketplace'
import './App.css'
import { useState } from 'react'

function App() {
  //auctions state bach nsayviw fih l auctions 
  const [auctions, setAuctions] = useState([]);

  return (
    <>
       <Marketplace/>
    </>
  )
}

export default App
