import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../../components/Botoes";
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
      <Container className="mt-3 overflow-auto">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
          <Form>
            <Form.Control
              type="text"
              value={filtro}
              placeholder="Curso..."
              onChange={(e) => aoMudarFiltro(e.target.value)}
              style={{ width: "300px" }}
            />
          </Form>
        </div>
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Ano Letivo</th>
              <th>Período</th>
              <th>Data Início</th>
              <th>Data Fim</th>
              {/* <th>Cursos</th> */}
              {/* <th>Professor</th> */}
              {/* <th>Início</th>
              <th>Status</th>
              <th>Vagas</th> */}
              <th>Ações</th>
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
      <td>{turma.codigo}</td>
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
        <AiOutlineEdit
          size={20}
          onClick={() => handleEdit(turma)}
          style={{ cursor: "pointer" }}
          title="Editar"
        />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(turma.codigo)}
          style={{ cursor: "pointer", color: "red" }}
          title="Excluir"
        />
      </td>
    </tr>
  );
}
