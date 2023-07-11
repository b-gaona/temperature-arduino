import { useContext } from "react";
import DataContext from "../context/dataContext";

function useDataContext() {
  return useContext(DataContext);
}

export default useDataContext;
