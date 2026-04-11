import Marketplace from "./pages/Marketplace";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuctionDetails from "./pages/AuctionDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages - no layout wrapper */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main app with layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Marketplace />} />
          <Route path="/auctions/:id" element={<AuctionDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
