import { useContext } from "react";
import ServersContext from "../context/serversContext";

function useServersContext() {
  return useContext(ServersContext);
}

export default useServersContext;
