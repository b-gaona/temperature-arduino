import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SortableTable from "../components/SortableTable";
import useUsersContext from "../hooks/use-users-context";
import moment from "moment";
import "moment/locale/es";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Form from "../components/Form";

function UsersPage() {
  const { users, stableFetchUsers, editUserById, createUser, deleteUserById } =
    useUsersContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ nombre: "", clave: "" });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    stableFetchUsers();
  }, [stableFetchUsers]);

  const handleClick = () => {
    setSelectedUser({ nombre: "", clave: "" });
    setShowModal(true);
  };

  const handleSubmit = async (server) => {
    if (edit) {
      await editUserById(server._id, server);
      handleClose();
      setEdit(false);
    } else {
      await createUser(server);
      handleClose();
    }
  };

  const config = [
    {
      label: "Usuario",
      render: (data) => data.nombre,
      sortValue: (data) => data.nombre,
    },
    // {
    //   label: "Contraseña",
    //   render: (data) => data.clave,
    //   sortValue: (data) => data.clave,
    // },
    {
      label: "Fecha de registro",
      render: (data) => moment(data.fecha).local("es").format("LLL:ss"),
      sortValue: (data) => data.fecha,
    },
    {
      label: "Acciones",
      render: (data) => {
        const handleEdit = async () => {
          setEdit(true);
          setSelectedUser({...data, clave: ""});
          setShowModal(true);
        };

        const handleDelete = async () => {
          await deleteUserById(data._id);
        };

        return (
          <div className="flex gap-3 justify-center">
            <Button className="rounded-md" primary onClick={handleEdit}>
              Editar
            </Button>
            <Button className="rounded-md" danger onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];

  const keyFn = (uniqueData) => {
    return uniqueData._id;
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const userObj = [
    {
      label: "Nombre de usuario",
      input: {
        type: "text",
        property: "nombre",
        placeholder: "Escribe tu nombre",
      },
    },
    {
      label: "Contraseña",
      input: {
        type: "password",
        property: "clave",
        placeholder: "Escribe tu contraseña",
      },
    },
  ];

  const modal = (
    <Modal onClose={handleClose}>
      {/* {addUser && showMessage} */}
      <Form
        config={userObj}
        onSubmit={handleSubmit}
        objectConfig={selectedUser}
        className="flex justify-between w-64"
      >
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-lg font-semibold">Agregar un nuevo usuario</h1>
        </div>
      </Form>
    </Modal>
  );

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="mx-5">
        {showModal && modal}
        <div className="flex justify-between mb-4">
          <Button className="rounded-md" primary>
            <Link className="text-white" key="Ver historial" to="/">
              Volver
            </Link>
          </Button>
          <Button onClick={handleClick} success>
            Agregar un usuario
          </Button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <SortableTable
            data={users}
            config={config}
            keyFn={keyFn}
          ></SortableTable>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default UsersPage;
