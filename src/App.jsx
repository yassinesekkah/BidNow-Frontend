import Marketplace from "./pages/Marketplace";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuctionDetails from "./pages/AuctionDetails";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Marketplace />} />
          <Route path="/auctions/:id" element={<AuctionDetails />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
