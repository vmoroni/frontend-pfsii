import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  InputGroup,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import Cabecalho2 from "../../components/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";
// import CustomModal from "../../components/Modal/Index";

export default function TelaInserirAlunosTurmas() {
  const [turmas, setTurmas] = useState([]); // Armazena a lista de turmas cadastradas.
  const [alunosNaoInscritos, setAlunosNaoInscritos] = useState([]); // Armazena a lista de alunos não inscritos.
  const [filtro, setFiltro] = useState(""); // Armazena o valor do filtro de pesquisa por nome de aluno.
  const [selectedAlunos, setSelectedAlunos] = useState([]); // Armazena os alunos selecionados.
  const [selectedTurma, setSelectedTurma] = useState(""); // Armazena a turma selecionada.
  const [selectAll, setSelectAll] = useState(false); // Controla o estado do checkbox "Selecionar todos".
  // const [showInscricaoModal, setShowInscricaoModal] = useState(false); // Controla a visibilidade do modal de inscrição

  const toggleSelectAluno = (codigo) => {
    const updatedSelectedAlunos = [...selectedAlunos];
    if (updatedSelectedAlunos.includes(codigo)) {
      updatedSelectedAlunos.splice(updatedSelectedAlunos.indexOf(codigo), 1);
    } else {
      updatedSelectedAlunos.push(codigo);
    }
    setSelectedAlunos(updatedSelectedAlunos);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedAlunos([]);
    } else {
      const allAlunoCodes = alunosNaoInscritos.map((aluno) => aluno.codigo);
      setSelectedAlunos(allAlunoCodes);
    }
    setSelectAll(!selectAll);
  };

  const getTurmas = async () => {
    await axios
      .get(urlBase + "/turmas")
      .then((res) => {
        setTurmas(res.data);
      })

      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getAlunosNaoInscritos = async () => {
    axios
      .get(urlBase + `/turmas/${selectedTurma}/alunos-nao-inscritos`)
      .then((res) => {
        setAlunosNaoInscritos(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getTurmas();
  }, []);

  useEffect(() => {
    if (selectedTurma !== "") {
      getAlunosNaoInscritos();
    } else {
      setAlunosNaoInscritos([]);
    }

    // eslint-disable-next-line
  }, [selectedTurma]);

  const linhas = [];

  alunosNaoInscritos.forEach((aluno) => {
    if (aluno.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <tr key={aluno.codigo} onClick={() => toggleSelectAluno(aluno.codigo)}>
        <td>
          <Form.Check
            type="checkbox"
            checked={selectedAlunos.includes(aluno.codigo)}
            onChange={() => toggleSelectAluno(aluno.codigo)}
          />
        </td>
        <td>{aluno.codigo}</td>
        <td>{aluno.nome}</td>
        <td>{aluno.cpf}</td>
        <td>{aluno.rg}</td>
        <td>{aluno.info.telefone}</td>
      </tr>
    );
  });

  const handleSubmit = async () => {
    const dataInscricao = new Date().toISOString().slice(0, 10);

    const inscricoes = selectedAlunos.map((codigoAluno) => ({
      codigoAluno: codigoAluno,
      dataInscricao,
      status: true,
    }));

    axios
      .post(`${urlBase}/turmas/${selectedTurma}/inscricoes`, { inscricoes })
      .then(({ data }) => {
        toast.success(data.message);
        const alunosRestantes = alunosNaoInscritos.filter(
          (aluno) => !selectedAlunos.includes(aluno.codigo)
        );
        setAlunosNaoInscritos(alunosRestantes);
        // setSelectedAlunos([]); // Redefinir os alunos selecionados
        // setSelectedTurma(""); // Redefinir a turma selecionada
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Cabecalho2 texto1={"Turmas"} texto2={"Inserir Alunos"} />
      <Container className="mt-3">
        <Row className="justify-content-between">
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Form.Group controlId="selectTurma">
              <Form.Select
                as="select"
                value={selectedTurma}
                onChange={(e) => {
                  setSelectedTurma(e.target.value);
                  setSelectedAlunos([]);
                }}
              >
                <option value="">Turmas</option>
                {turmas.map((turma) => (
                  <option key={turma.codigo} value={turma.codigo}>
                    Turma {turma.codigo} / {turma.anoLetivo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Form>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={filtro}
                  placeholder="Pesquisar por nome..."
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setFiltro("")}
                >
                  Limpar
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
        <Table hover responsive="sm">
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={() => {
                if (
                  window.confirm("Confirma a inserção do(s) aluno(s) na turma?")
                ) {
                  handleSubmit();
                }
              }}
              disabled={selectedAlunos.length === 0 || selectedTurma === ""}
            >
              Inserir aluno(s)
            </Button>
          </Col>
        </Row>
      </Container>
      {/* <CustomModal
        show={showInscricaoModal}
        onHide={() => setShowInscricaoModal(false)}
        onConfirm={enviarInscricaoAoBackend}
        title="Confirmação"
        body="Confirma a inserção do(s) aluno(s) na turma?"
      /> */}
    </>
  );
}
