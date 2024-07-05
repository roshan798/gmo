import { Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Error404 from "./pages/Error404";
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="*" element={<Error404 />}></Route>
    </Routes >
    </>
  );
}

export default App;
