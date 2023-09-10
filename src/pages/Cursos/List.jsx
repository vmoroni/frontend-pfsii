import { Table, Form } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../../components/Botoes";
import Cabecalho2 from "../../components/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroCursos({
  cursos,
  setCursos,
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
      .delete(`${urlBase}/cursos/${codigo}`)
      .then((response) => {
        const newArray = cursos.filter((curso) => curso.codigo !== codigo);

        setCursos(newArray);
        toast.success(response.data.message);
      })
      .catch(( {response} ) =>
        toast.error(response.data.message)
      );

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  cursos.forEach((curso, i) => {
    if (curso.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaCurso
        curso={curso}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Cursos"} />
      <Container className="mt-3 overflow-auto">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
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
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Sala</th>
              <th>Eixo</th>
              <th>Carga horária</th>
              {/* <th>Criado em</th>
              <th>Desativado em</th> */}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaCurso({ curso, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td>{curso.codigo}</td>
      <td>{curso.nome}</td>
      <td>{curso.sala}</td>
      <td>{curso.eixo}</td>
      <td>{curso.cargaHoras}</td>
      {/* <td>{curso.dataCriacao}</td>
      <td>{curso.dataDesativacao}</td> */}
      <td>
        <AiOutlineEdit
          size={20}
          onClick={() => handleEdit(curso)}
          style={{ cursor: "pointer" }}
          title="Editar"
        />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(curso.codigo)}
          style={{ cursor: "pointer", color: "red" }}
          title="Excluir"
        />
      </td>
    </tr>
  );
}