import Marketplace from './pages/Marketplace';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuctionDetails from './pages/AuctionDetails';
import ProtectedRoute from './router/ProtectedRoute';
import Login from './pages/Login';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Marketplace />} />
        <Route path='/auctions/:id' element={ <AuctionDetails /> } />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
