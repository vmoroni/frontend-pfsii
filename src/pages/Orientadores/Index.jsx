import { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definitions.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroOrientadores(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState();
  const [orientadores, setOrientadores] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getOrientadores = async () => {
    axios
      .get(urlBase + "/orientadores")
      .then((res) => {
        setOrientadores(res.data);
      })
      .catch((err) => {
        toast.error(`Não foi possível obter orientadores: ${err.message}`);
      });
  };

  const getEmpresas = async () => {
    axios
      .get(urlBase + "/empresas")
      .then((res) => {
        setEmpresas(res.data);
      })
      .catch((err) => {
        toast.error(`Não foi possível obter cargos: ${err.message}`);
      });
  };

  useEffect(() => {
    getOrientadores();
    getEmpresas();
  }, [orientadores]);

  return exibeTabela ? (
    <List
      orientadores={orientadores}
      setOrientadores={setOrientadores}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      empresas={empresas}
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      orientadores={orientadores}
      setOrientadores={setOrientadores}
      setExibeTabela={setExibeTabela}
    />
  );
}
