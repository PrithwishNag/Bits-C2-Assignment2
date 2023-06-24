import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./screens/registerPage";
import DashboardPage from "./screens/dashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route> // todo: LoginPage
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
