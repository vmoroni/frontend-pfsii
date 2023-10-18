import { Table, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/Buttons/Index";
import Cabecalho2 from "../../components/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroAlunos({
  alunos,
  setAlunos,
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
      .delete(`${urlBase}/alunos/${codigo}`)
      .then((response) => {
        const newArray = alunos.filter((aluno) => aluno.codigo !== codigo);

        setAlunos(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  alunos.forEach((aluno, i) => {
    if (aluno.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaAluno
        aluno={aluno}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Alunos"} />
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
              {/* <th>RG</th> */}
              {/* <th>Telefone</th> */}
              {/* <th>Escola</th> */}
              <th>Serie</th>
              <th>Periodo</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaAluno({ aluno, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{aluno.codigo}</td>
      <td>{aluno.nome}</td>
      <td>{aluno.cpf}</td>
      {/* <td>{aluno.rg}</td> */}
      {/* <td>{aluno.telefone}</td> */}
      {/* <td>{aluno.escola}</td> */}
      <td>{aluno.serie}</td>
      <td>{aluno.periodo}</td>
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(aluno)} />
          <DeleteButton onclick={() => handleConfirm(aluno.codigo)} />
        </div>
      </td>
    </tr>
  );
}
