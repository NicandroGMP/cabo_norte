import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const SelectWork = createContext();
const GetWork = createContext();
export const useWork = () => useContext(SelectWork);
export const useSelectWork = () => useContext(GetWork);

const SelectWorkProvider = ({ children }) => {
  const navigate = useNavigate();
  const [work, setWork] = useState({
    work: null,
  });
  const [batch, setBatch] = useState({ batch: null });
  const [provider, setProvider] = useState({ provider: null });

  const selectedWork = (ev) => {
    /* setWork({ work: data }); */
    setWork({ work: ev.target.innerText });
    navigate("/guardias/entradas/lotes");
  };
  const getServices = useCallback(
    (id) => () => {
      setBatch({ batch: id });
      navigate("/guardias/entradas/servicios");
    },
    []
  );
  const getProvider = useCallback(
    (id) => () => {
      setProvider({ provider: id });
      navigate("/guardias/entradas/cones");
    },
    []
  );
  return (
    <SelectWork.Provider
      value={{
        ...work,
        ...batch,
        ...provider,
      }}
    >
      <GetWork.Provider value={{ selectedWork, getServices, getProvider }}>
        {children}
      </GetWork.Provider>
    </SelectWork.Provider>
  );
};

export default SelectWorkProvider;

SelectWorkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
