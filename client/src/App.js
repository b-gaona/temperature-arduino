import Route from "./components/Route";
import TablePage from "./pages/TablePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CardsPage from "./pages/CardsPage";
import { Fragment } from "react";
import { UsersProvider } from "./context/usersContext";

function App() {
  return (
    <UsersProvider>
      <Fragment>
        <Route path="/history">
          <TablePage></TablePage>
        </Route>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/">
          <CardsPage></CardsPage>
        </Route>
      </Fragment>
    </UsersProvider>
  );
}

export default App;
