import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./screens/registerPage";
import DashboardPage from "./screens/dashboardPage";
import RideStatus from "./screens/rideStatusPage";
import LoginPage from "./screens/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
        <Route path="/rideStatus" element={<RideStatus />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
