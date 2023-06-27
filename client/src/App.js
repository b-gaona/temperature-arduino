import TablePage from "./pages/TablePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CardsPage from "./pages/CardsPage";
import { UsersProvider } from "./context/usersContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UsersProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/history" element={<TablePage />} />
            <Route index path="/" element={<CardsPage />} />
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    </UsersProvider>
  );
}

export default App;
