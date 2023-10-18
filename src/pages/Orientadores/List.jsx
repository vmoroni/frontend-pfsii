import { Table, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
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

export default function TabelaCadastroOrientadores({
  orientadores,
  setOrientadores,
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
      .delete(`${urlBase}/orientadores/${codigo}`)
      .then((response) => {
        const newArray = orientadores.filter(
          (orientador) => orientador.codigo !== codigo
        );

        setOrientadores(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  orientadores.forEach((orientador, i) => {
    if (orientador.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaOrientador
        orientador={orientador}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Orientadores"} />
      <Container className="mt-3">
        <Row className="justify-content-between">
          <Col xs={12} md={6} lg={8} className="mb-3">
            <AddButton onclick={() => setExibeTabela(false)} />
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-3">
            <InputGroup>
              <Form.Control
                type="text"
                value={filtro}
                placeholder="Pesquisar por nome..."
                onChange={(e) => aoMudarFiltro(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => aoMudarFiltro("")}
              >
                Limpar
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Table bordered hover className="fs-6">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Empresa</th>
              <th>Status</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaOrientador({ orientador, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{orientador.codigo}</td>
      <td>{orientador.nome}</td>
      <td>{orientador.nomeUsuario}</td>
      <td>{orientador.empresa.nome}</td>
      {/* <td>{funcionario.telefone}</td> */}
      <td>{orientador.status ? "Ativo" : "Inativo"}</td>
      {/* <td>{funcionario.email}</td> */}
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(orientador)} />
          <DeleteButton onclick={() => handleConfirm(orientador.codigo)} />
        </div>
      </td>
    </tr>
  );
}
