import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import Panel from "../components/Panel";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import useUsersContext from "../hooks/use-users-context";
import { Link } from "react-router-dom";

function CardsPage() {
  const [currDate, setCurrDate] = useState(
    moment(new Date()).local("es").format("LLL:ss")
  );
  const { stableFetchCurrentData, currentData } = useUsersContext();

  useEffect(() => {
    stableFetchCurrentData();
  }, [stableFetchCurrentData, currDate]);

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
      </main>
      <div className="flex justify-center mt-3">
        <p className="text-center">
          ¿Quieres agregar a nuevos usuarios?{" "}
          <Link
            to="/register"
            className="text-emerald-600 hover:text-emerald-800 underline ease-in duration-100"
          >
            Regístralo aquí
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default CardsPage;
