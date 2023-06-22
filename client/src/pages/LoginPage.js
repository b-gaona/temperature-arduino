import { useState } from "react";
import Form from "../components/Form";
import Panel from "../components/Panel";
import axios from "axios";
import useNavigation from "../hooks/use-navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LoginPage() {
  const { navigate } = useNavigation();

  const objectConfig = {
    nombre: "",
    clave: "",
  };

  const [user, setUser] = useState(objectConfig);

  const handleSubmit = async (info) => {
    setUser(info);
    const res = await axios.post(
      "http://192.168.137.1:8000/api/users/verify",
      info
    );
    if (res.data) {
      navigate("/");
    } else {
      console.log("Error");
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
