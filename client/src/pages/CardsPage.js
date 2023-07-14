import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import Panel from "../components/Panel";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import useDataContext from "../hooks/use-data-context";
import { Link } from "react-router-dom";
import useServersContext from "../hooks/use-servers-context";

function CardsPage() {
  const [currDate, setCurrDate] = useState(
    moment(new Date()).local("es").format("LLL:ss")
  );
  const { stableFetchCurrentData, currentData } = useDataContext();
  const { servers, stableFetchServers } = useServersContext();

  useEffect(() => {
    stableFetchCurrentData();
    stableFetchServers();
  }, [stableFetchCurrentData, stableFetchServers, currDate]);

  const renderedPanels = currentData.map((element) => {
    return (
      <Panel
        key={element._id}
        className="py-8 rounded-lg shadow-md shadow-gray-400 w-96"
      >
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-lg font-semibold text-center">
            Sección: {element.seccion}
          </h1>
          <h1 className="text-lg font-semibold">
            Temperatura:{" "}
            <span className="font-normal">{element.temperatura}° C</span>
          </h1>
          <h1 className="text-lg font-semibold">
            Humedad: <span className="font-normal">{element.humedad} %</span>
          </h1>
          <h1 className="text-lg font-semibold">
            Índice de calor:{" "}
            <span className="font-normal">{element.indice_calor}</span>
          </h1>
          <h1 className="text-lg font-semibold">
            Fecha:{" "}
            <span className="font-normal">
              {moment(element.fecha).local("es").format("LLL:ss")}
            </span>
          </h1>
        </div>
      </Panel>
    );
  });

  const renderedServers = servers.map(({ server, estado }) => {
    return (
      <tr
        className={`${
          estado === "Encendido" ? "bg-green-500" : "bg-red-500"
        } border-gray-800 border-2`}
        key={server}
      >
        <td className="px-4 py-2">{server}</td>
        <td className="px-4 py-2">
          {estado === "Encendido" ? <p>Encendido</p> : <p>Apagado</p>}
        </td>
      </tr>
    );
  });

  const handleClick = () => {
    setCurrDate(moment(new Date()).local("es").format("LLL:ss"));
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="mx-5">
        <div className="flex justify-center sm:justify-between flex-wrap gap-4 items-center">
          <p>
            <span className="font-semibold">Última actualización:</span>{" "}
            {currDate}
          </p>
          <div className="flex justify-end items-center gap-5">
            <Button className="rounded-md" primary>
              <Link className="text-white" key="Ver historial" to="/history">
                Ver historial
              </Link>
            </Button>
            <Button className="rounded-md" onClick={handleClick} secondary>
              <Link className="text-white" key="Recargar datos" to="/">
                Recargar datos
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex gap-10 mt-5 flex-wrap justify-center items-center">
          {renderedPanels}
        </div>
        <hr className="bg-black h-1 my-12"></hr>
        <div className="flex flex-col justify-center items-center">
          <table className="border-2 border-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="py-2">Servidor</th>
                <th className="py-2">Estado</th>
              </tr>
            </thead>
            <tbody>{renderedServers}</tbody>
          </table>
        </div>
      </main>
      <div className="flex items-center justify-center mt-3 gap-9 mx-5">
        <p className="text-center">
          <Link
            to="/users"
            className="font-semibold text-md text-emerald-600 hover:text-emerald-800 underline ease-in duration-100"
          >
            Ver usuarios
          </Link>
        </p>
        <p className="text-center">
          <Link
            to="/servers"
            className="font-semibold text-md text-emerald-600 hover:text-emerald-800 underline ease-in duration-100"
          >
            Ver servidores
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default CardsPage;
