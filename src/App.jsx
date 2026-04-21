import Marketplace from "./pages/Marketplace";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuctionDetails from "./pages/AuctionDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import CreateProduct from "./pages/CreateProduct";
import ProtectedRoute from "./router/ProtectedRoute";
import CreateAuction from "./pages/CreateAuction";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyBids from "./pages/MyBids";
import Header from "./components/Header";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Header />
        <Routes>
          {/* Auth pages - no layout wrapper */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main app with layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Marketplace />} />
            <Route path="/auctions/:id" element={<AuctionDetails />} />
            <Route
              path="/my-products"
              element={
                <ProtectedRoute>
                  {" "}
                  <MyProducts />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-bids"
              element={
                <ProtectedRoute>
                  {" "}
                  <MyBids />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-product"
              element={
                <ProtectedRoute>
                  {" "}
                  <CreateProduct />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-auction/:productId"
              element={
                <ProtectedRoute>
                  {" "}
                  <CreateAuction />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  {" "}
                  <EditProduct />{" "}
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
