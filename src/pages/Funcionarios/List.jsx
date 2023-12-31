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

export default function TabelaCadastroFuncionarios({
  funcionarios,
  setFuncionarios,
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
      .delete(`${urlBase}/funcionarios/${codigo}`)
      .then((response) => {
        const newArray = funcionarios.filter(
          (funcionario) => funcionario.codigo !== codigo
        );

        setFuncionarios(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  funcionarios.forEach((funcionario, i) => {
    if (funcionario.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaFuncionario
        funcionario={funcionario}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Funcionários"} />
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
              <th>CPF</th>
              {/* <th>Usuário</th> */}
              {/* <th>Cargo</th> */}
              {/* <th>Telefone</th> */}
              <th>Status</th>
              {/* <th>E-mail</th> */}
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaFuncionario({ funcionario, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{funcionario.codigo}</td>
      <td>{funcionario.nome}</td>
      <td>{funcionario.cpf}</td>
      {/* <td>{funcionario.nomeUsuario}</td> */}
      {/* <td>{funcionario.cargo.nome}</td> */}
      {/* <td>{funcionario.telefone}</td> */}
      <td>{funcionario.status ? "Ativo" : "Inativo"}</td>
      {/* <td>{funcionario.email}</td> */}
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(funcionario)} />
          <DeleteButton onclick={() => handleConfirm(funcionario.codigo)} />
        </div>
      </td>
    </tr>
  );
}
