import { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroEmpresas(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getEmpresas = async () => {
    try {
      const res = await axios.get(urlBase + "/empresas");
      setEmpresas(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmpresas();
  }, [setEmpresas]);

  return exibeTabela ? (
    <List
      empresas={empresas}
      setEmpresas={setEmpresas}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getEmpresas={getEmpresas}
      setExibeTabela={setExibeTabela}
    />
  );
}
