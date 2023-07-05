import axios from "axios";
import { useState } from "react";
import Form from "../components/Form";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RegisterPage() {
  const objectConfig = {
    nombre: "",
    clave: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [user, setUser] = useState(objectConfig);

  //If you're using select tag instead of input tag. In the type property of the input value type 'select'.
  //In the input object the property is related to the objectConfig. You must type the matched property
  //The ending with '_label' is reserved to the select inputs. It refers to the label of the selected option. It's assigned in the Form component. If you want to use the value of the select option just use the property name.

  const handleSubmit = (info) => {
    setUser(info);
    setShowModal(true);
  };

  const handleClose = () => {
    if (addUser) {
      setUser(objectConfig);
    }
    setShowModal(false);
    setAddUser(false);
  };

  const handleAdd = async () => {
    setAddUser(true);
    //Send user to the database
    try {
      await axios.post(
        "https://temperature-monitoring.onrender.com/api/users/add",
        user
      );
      return true;
    } catch (error) {
      return false;
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

  const confirmData = (
    <div className="flex justify-around gap-5 items-center">
      <h3>¿Estás seguro que los datos son correctos? </h3>
      <Button
        className="px-8 rounded-sm mx-auto"
        onClick={async () => await handleAdd()}
        primary
      >
        Si, estoy seguro
      </Button>
    </div>
  );

  const showMessage = (
    <h1 className="text-center text-xl my-3 bg-green-500 text-white py-1 rounded">
      Usuario ingresado correctamente
    </h1>
  );

  const actionBar = (
    <div>
      {addUser || confirmData}
      <div className="mt-5 mb-2" style={{ fontSize: "10px" }}>
        <p>
          Al confirmar los datos estás consciente de que no podrás cambiar los
          datos en un futuro. En caso de haber un problema, contactános al
          correo:{" "}
          <a
            className="cursor-pointer underline"
            href="mailto:sistemasuttn@gmail.com"
          >
            sistemasuttn@gmail.com
          </a>
        </p>
      </div>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <div className="flex justify-end">
        <Button
          className="w-8 font-semibold text-gray-500 hover:text-gray-700 border-0"
          onClick={handleClose}
        >
          X
        </Button>
      </div>
      {addUser && showMessage}
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Nombre completo</h2>
            <p>{user.nombre}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contraseña</h2>
            <p>{user.clave}</p>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="flex bg-white w-100 justify-center items-center">
        <Panel className="bg-gray-50 px-6 rounded-xl w-full sm:w-1/3">
          <Form onSubmit={handleSubmit} config={config} objectConfig={user}>
            <h1 className="text-3xl text-center">Registro de sesión</h1>
          </Form>
        </Panel>
        {showModal && modal}
      </div>
      <div className="flex justify-center mt-3">
        <p className="text-center">
          ¿Ya cuentas con una sesión?{" "}
          <a
            href="/login"
            className="text-emerald-600 hover:text-emerald-800 underline ease-in duration-100"
          >
            Inicia sesión aquí
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterPage;
