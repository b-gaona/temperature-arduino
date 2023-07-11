import { createContext, useCallback, useState } from "react";
import axios from "axios";

const ServersContext = createContext();

function ServersProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [servers, setServers] = useState([]);

  const fetchServers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8000/api/servers`);
      if (res.data) {
        setServers(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  const createServer = async (server) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/servers/add",
        server
      );
      const updatedServers = [...servers, res.data];
      setServers(updatedServers);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteServerById = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/servers/delete/${id}`);
      const updatedServers = servers.filter((server) => {
        return server._id !== id;
      });
      setServers(updatedServers);
      return true;
    } catch (error) {
      return false;
    }
  };

  const editServerById = async (id, server) => {
    try {
      let editedServer = {};
      const res = await axios.put(
        `http://localhost:8000/api/servers/update/${id}`,
        server
      );
      const updateServers = servers.map((server) => {
        if (server._id === id) {
          editedServer = JSON.parse(res.request.response);
          return { ...server, ...res.data };
        }
        return server;
      });

      setServers(updateServers);
      return editedServer;
    } catch (error) {
      return false;
    }
  };

  const stableFetchServers = useCallback(fetchServers, []);

  const valueToShare = {
    stableFetchServers,
    setIsLoading,
    createServer,
    editServerById,
    deleteServerById,
    servers,
    isLoading,
  };

  return (
    <ServersContext.Provider value={valueToShare}>
      {children}
    </ServersContext.Provider>
  );
}

export { ServersProvider };
export default ServersContext;
