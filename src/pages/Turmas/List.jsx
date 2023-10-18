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

export default function TabelaCadastroTurmas({
  turmas,
  setTurmas,
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
      .delete(`${urlBase}/turmas/${codigo}`)
      .then((response) => {
        const newArray = turmas.filter((turma) => turma.codigo !== codigo);

        setTurmas(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  turmas.forEach((turma, i) => {
    // if (turma.curso.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
    //   return;
    // }
    linhas.push(
      <LinhaTurma
        turma={turma}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Turmas"} />
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
              <th>Ano Letivo</th>
              <th>Período</th>
              <th>Data Início</th>
              <th>Data Fim</th>
              {/* <th>Cursos</th> */}
              {/* <th>Professor</th> */}
              {/* <th>Início</th>
              <th>Status</th>
              <th>Vagas</th> */}
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaTurma({ turma, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{turma.codigo}</td>
      <td>{turma.anoLetivo}</td>
      <td>{turma.periodo}</td>
      <td>{turma.dataInicio}</td>
      <td>{turma.dataFim}</td>
      {/* <td>{turma.curso.nome}</td> */}
      {/* <td>{turma.funcionario.nome}</td> */}
      {/* <td>{turma.dataInicio}</td>
      <td>{turma.status}</td>
      <td>{turma.vagas}</td> */}
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(turma)} />
          <DeleteButton onclick={() => handleConfirm(turma.codigo)} />
        </div>
      </td>
    </tr>
  );
}
