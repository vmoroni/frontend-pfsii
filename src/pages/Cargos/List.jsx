import { Table, Form } from "react-bootstrap";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/Buttons/Index";
import Cabecalho2 from "../../components/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroCargos({
  cargos,
  setCargos,
  filtro,
  aoMudarFiltro,
  setOnEdit,
  setExibeTabela,
}) {
  const linhas = [];

  const confirmOnDelete = (codigo) => {
    if (window.confirm(`Confirma a exclusão do item ${codigo}?`)) {
      handleDelete(codigo);
    }
  };

  const handleDelete = async (codigo) => {
    await axios
      .delete(`${urlBase}/cargos/${codigo}`)
      .then((response) => {
        const newArray = cargos.filter((cargo) => cargo.codigo !== codigo);

        setCargos(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  cargos.forEach((cargo, i) => {
    if (cargo.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaCargo
        cargo={cargo}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Cargos"} />
      <Container className="mt-3">
        <div className="d-flex mb-3 justify-content-between">
          <AddButton onclick={() => setExibeTabela(false)} />
          <Form>
            <Form.Control
              type="text"
              value={filtro}
              placeholder="Pesquisar por nome..."
              onChange={(e) => aoMudarFiltro(e.target.value)}
              style={{ width: "300px" }}
            />
          </Form>
        </div>
        <Table bordered hover className="fs-6">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaCargo({ cargo, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{cargo.codigo}</td>
      <td>{cargo.nome}</td>
      <td>{cargo.descricao}</td>
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(cargo)} />
          <DeleteButton onclick={() => handleConfirm(cargo.codigo)} />
        </div>
      </td>
    </tr>
  );
}
