import { createContext, useCallback, useState } from "react";
import axios from "axios";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({
    nombre: "",
    clave: "",
  });

  const fetchData = async () => {
    try {
      const before = data;
      setIsLoading(true);
      setData([]);
      const res = await axios.get(
        `https://temperature-monitoring.onrender.com/api/data?page=${page}&limit=15`
      );
      setTimeout(() => {
        if (res.data) {
          setData(res.data);
        } else {
          setData(before);
        }
        setIsLoading(false);
      }, 150);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  // eslint-disable-next-line
  const stableFetchData = useCallback(fetchData, [page]);

  const fetchCurrentData = async () => {
    try {
      const before = data;
      setCurrentData([]);
      const res = await axios.get(
        `https://temperature-monitoring.onrender.com/api/data/current`
      );
      if (res.data) {
        setCurrentData(res.data);
      } else {
        setCurrentData(before);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleLogUser = async (info) => {
    const res = await axios.post(
      "http://localhost:8000/api/users/verify",
      info
    );
    if (res.data) {
      setUser(res.data);
    }
    return res.data;
  };

  // eslint-disable-next-line
  const stableFetchCurrentData = useCallback(fetchCurrentData, [page]);

  const valueToShare = {
    stableFetchData,
    stableFetchCurrentData,
    setData,
    setIsLoading,
    setPage,
    handleLogUser,
    setUser,
    user,
    data,
    isLoading,
    page,
    currentData,
  };

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;
