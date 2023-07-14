import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SortableTable from "../components/SortableTable";
import useServersContext from "../hooks/use-servers-context";
import Button from "../components/Button";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { Link } from "react-router-dom";

function ServersPage() {
  const {
    servers,
    stableFetchServers,
    editServerById,
    deleteServerById,
    createServer,
  } = useServersContext();

  const [showModal, setShowModal] = useState(false);
  const [selectedServer, setSelectedServer] = useState({ server: "" });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    stableFetchServers();
  }, [stableFetchServers]);

  const handleClick = () => {
    setSelectedServer({ server: "" });
    setShowModal(true);
  };

  const handleSubmit = async (server) => {
    if (edit) {
      await editServerById(server._id, server);
      handleClose();
      setEdit(false);
    } else {
      await createServer(server);
      handleClose();
    }
  };

  const config = [
    {
      label: "Servidor",
      render: (data) => data.server,
      sortValue: (data) => data.server,
    },
    {
      label: "Estado",
      render: (data) => data.status,
      sortValue: (data) => data.status,
    },
    {
      label: "Acciones",
      render: (data) => {
        const handleEdit = async () => {
          setEdit(true);
          setSelectedServer(data);
          setShowModal(true);
        };
        const handleDelete = async () => {
          await deleteServerById(data._id);
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

  const serverObj = [
    {
      label: "Servidor",
      input: {
        type: "text",
        property: "server",
        placeholder: "Dirección IP o URL",
      },
    },
  ];

  const modal = (
    <Modal onClose={handleClose}>
      {/* {addUser && showMessage} */}
      <Form
        config={serverObj}
        onSubmit={handleSubmit}
        objectConfig={selectedServer}
        className="flex justify-between w-64"
      >
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-lg font-semibold">Agregar un nuevo servidor</h1>
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
          <Button className="rounded-md" onClick={handleClick} success>
            Agregar un servidor
          </Button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <SortableTable
            data={servers}
            config={config}
            keyFn={keyFn}
          ></SortableTable>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ServersPage;
