import Marketplace from './pages/Marketplace';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuctionDetails from './pages/AuctionDetails';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Marketplace />} />
        <Route path='/auctions/:id' element={<AuctionDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
