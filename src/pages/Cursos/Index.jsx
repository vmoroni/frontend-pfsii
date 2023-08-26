import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroCursos(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getCursos = async () => {
    try {
      const res = await axios.get(urlBase + "/cursos");
      setCursos(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCursos();
  }, [setCursos]);

  return exibeTabela ? (
    <List
      cursos={cursos}
      setCursos={setCursos}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <Form
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getCursos={getCursos}
      setExibeTabela={setExibeTabela}
    />
  );
}
