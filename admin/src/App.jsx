import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add.jsx";
import List from "./pages/List/List.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const url = process.env.NODE_ENV === 'production'
  ? "https://mern-delivery-app-1.onrender.com"
  : "http://localhost:5001";
  return (
    <div>
      <ToastContainer toastStyle={{ backgroundColor: "black"}} />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
