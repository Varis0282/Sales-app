import { useDispatch } from "react-redux";
import Navbar from "./Components/navbar";
import Addsale from "./Pages/addsales";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Revenue from "./Pages/revenue";
import Topsale from "./Pages/topsale";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  function DynamicRouter() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem("User"));
      if (userData) {
        dispatch({ type: "successLogin", payload: userData });
        navigate("/addsale");
      } else {
        localStorage.removeItem("User");
        localStorage.removeItem("token");
        dispatch({ type: "errorLogin" });
        navigate("/login");
      }
    },[]);
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addsale" element={<Addsale />} />
        <Route path="/topsale" element={<Topsale />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <DynamicRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
