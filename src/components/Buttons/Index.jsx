import { Button } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFileAdd,
} from "react-icons/ai";

const AddButton = ({ onclick }) => {
  return (
    <Button
      className="d-flex align-items-center justify-content-around"
      onClick={onclick}
    >
      <AiOutlineFileAdd size={20} className="me-2" /> Novo
    </Button>
  );
};

const EditButton = ({ onclick }) => {
  return (
    <Button
      variant="outline-secondary"
      className="d-flex p-1 me-1"
      onClick={onclick}
      title="Editar"
    >
      <AiOutlineEdit size={16} />
    </Button>
  );
};

const DeleteButton = ({ onclick }) => {
  return (
    <Button
      variant="outline-danger"
      className="d-flex p-1 m-0"
      onClick={onclick}
      title="Excluir"
    >
      <AiOutlineDelete size={16} />
    </Button>
  );
};

export { AddButton, EditButton, DeleteButton };
