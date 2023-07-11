import TablePage from "./pages/TablePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CardsPage from "./pages/CardsPage";
import { UsersProvider } from "./context/usersContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServersPage from "./pages/ServersPage";
import UsersPage from "./pages/UsersPage";
import { ServersProvider } from "./context/serversContext";
import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <UsersProvider>
      <DataProvider>
        <ServersProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/history" element={<TablePage />} />
                <Route index path="/" element={<CardsPage />} />
                <Route path="/servers" element={<ServersPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Route>
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </Router>
        </ServersProvider>
      </DataProvider>
    </UsersProvider>
  );
}

export default App;
