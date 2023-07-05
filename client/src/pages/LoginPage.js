import Form from "../components/Form";
import Panel from "../components/Panel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useUsersContext from "../hooks/use-users-context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { handleLogUser, user, setUser } = useUsersContext();
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (info) => {
    setUser(info);
    const flag = await handleLogUser(info);
    if (!flag) {
      setErrorMessage(true);
    } else {
      navigate("/");
    }
  };

  const config = [
    {
      label: "Nombre completo",
      input: {
        type: "text",
        property: "nombre",
      },
    },
    {
      label: "Contraseña",
      input: {
        type: "password",
        property: "clave",
      },
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex bg-white w-100 justify-center items-center">
        <Panel className="bg-gray-50 px-6 rounded-xl w-full sm:w-1/3">
          {errorMessage && (
            <h1 className="bg-red-500 w-full text-center border-red-600 border-2 p-2 text-white mb-4 rounded-md font-semibold">
              Error al inciar sesión
            </h1>
          )}
          <Form onSubmit={handleSubmit} config={config} objectConfig={user}>
            <h1 className="text-3xl text-center">Inicio de sesión</h1>
          </Form>
        </Panel>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
