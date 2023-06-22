import { useCallback, useEffect } from "react";
import SortableTable from "../components/SortableTable";
import Paginator from "../components/Paginator";
import Header from "../components/Header";
import Footer from "../components/Footer";
import moment from "moment";
import "moment/locale/es";
import useUsersContext from "../hooks/use-users-context";
import Link from "../components/Link";
import Button from "../components/Button";

function TablePage() {
  const { data, setData, stableFetchData } = useUsersContext();

  useEffect(() => {
    stableFetchData();
  }, [stableFetchData]);

  function fetchData() {
    //Listen for future events
    const eventSource = new EventSource("http://192.168.137.1:8000/api/events");

    function updateMessage(message) {
      //If someone sends many objects in a row
      if (message.length > 1) {
        for (const iterator of message) {
          setData((current) => {
            return [iterator, ...current];
          });
        }
      } else {
        setData((current) => {
          return [message, ...current];
        });
      }
    }

    eventSource.onmessage = function (event) {
      const eventData = JSON.parse(event.data);
      //If we want to insert a new data
      if (eventData.type === "insert") {
        updateMessage(eventData.data);
      }
    };

    eventSource.onerror = function () {
      updateMessage({ error: "Server closed connection" });
      eventSource.close();
    };
  }

  const stableFetch = useCallback(fetchData, [setData]);

  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const config = [
    {
      label: "Temperatura",
      render: (data) => data.temperatura + "°C",
      sortValue: (data) => data.temperatura,
    },
    {
      label: "Humedad",
      render: (data) => data.humedad + "%",
      sortValue: (data) => data.humedad,
    },
    {
      label: "Índice de calor",
      render: (data) => data.indice_calor,
      sortValue: (data) => data.indice_calor,
    },
    {
      label: "Sección",
      render: (data) => data.seccion,
      sortValue: (data) => data.seccion,
    },
    {
      label: "Fecha",
      render: (data) => moment(data.fecha).local("es").format("LLL:ss"),
      sortValue: (data) => data.fecha,
    },
  ];

  const keyFn = (uniqueData) => {
    return uniqueData._id;
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main>
        <div className="flex justify-center sm:justify-end items-center mx-5 mb-7">
          <Button className="rounded-md" primary>
            <Link
              activeClassName="font-bold border-l-4 border-blue-500 pl-2"
              className="text-white"
              key="Ver parámetros actuales"
              to="/"
            >
              Ver parámetros actuales
            </Link>
          </Button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <SortableTable
            data={data}
            config={config}
            keyFn={keyFn}
          ></SortableTable>
        </div>
        <div className="flex justify-center items-center">
          <Paginator />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default TablePage;
