import { createContext, useCallback, useState } from "react";
import axios from "axios";

const UsersContext = createContext();

function UsersProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    clave: "",
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8000/api/users`);
      if (res.data) {
        setUsers(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  const handleLogUser = async (info) => {
    const res = await axios.post(
      "https://temperature-monitoring.onrender.com/api/users/verify",
      info
    );
    if (res.data) {
      setUser(res.data);
    }
    return res.data;
  };

  const createUser = async (user) => {
    try {
      const res = await axios.post("http://localhost:8000/api/users/add", user);
      const updatedUsers = [...users, res.data];
      setUsers(updatedUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteUserById = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
      const updatedUsers = users.filter((user) => {
        return user._id !== id;
      });
      setUsers(updatedUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  const editUserById = async (id, user) => {
    try {
      let editedUser = {};
      const res = await axios.put(
        `http://localhost:8000/api/users/update/${id}`,
        user
      );
      const updateUsers = users.map((user) => {
        if (user._id === id) {
          editedUser = JSON.parse(res.request.response);
          return { ...user, ...res.data };
        }
        return user;
      });

      setUsers(updateUsers);
      return editedUser;
    } catch (error) {
      return false;
    }
  };

  const stableFetchUsers = useCallback(fetchUsers, []);

  const valueToShare = {
    stableFetchUsers,
    handleLogUser,
    createUser,
    editUserById,
    deleteUserById,
    setIsLoading,
    setUser,
    isLoading,
    users,
    user,
  };

  return (
    <UsersContext.Provider value={valueToShare}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersProvider };
export default UsersContext;
