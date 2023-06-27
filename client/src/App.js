import Route from "./components/Route";
import TablePage from "./pages/TablePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CardsPage from "./pages/CardsPage";
import { Fragment } from "react";
import { UsersProvider } from "./context/usersContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UsersProvider>
      <Fragment>
        <ProtectedRoute path="/history" redirectPath="/login">
          <TablePage></TablePage>
        </ProtectedRoute>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <ProtectedRoute path="/" redirectPath="/login">
          <CardsPage></CardsPage>
        </ProtectedRoute>
      </Fragment>
    </UsersProvider>
  );
}

export default App;
