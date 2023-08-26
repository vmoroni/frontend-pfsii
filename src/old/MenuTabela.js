import { Button } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./styles/MenuTabela.css";

export default function MenuTabela(props) {
  return (
    <div className="d-flex justify-content-between">
      <Button size="sm">
        <AiOutlineEdit size={20} title="Editar" onClick={props.aoEditar} />
      </Button>
      <AiOutlineDelete size={20} title="Excluir" onClick={props.aoExcluir} />
    </div>
  );
}
