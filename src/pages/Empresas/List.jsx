import { Table, Form } from "react-bootstrap";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/Buttons/Index";
import Cabecalho2 from "../../components/Cabecalho2";
import { Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroEmpresas({
  empresas,
  setEmpresas,
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
      .delete(`${urlBase}/empresas/${codigo}`)
      .then((response) => {
        const newArray = empresas.filter(
          (empresa) => empresa.codigo !== codigo
        );

        setEmpresas(newArray);
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.message));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  empresas.forEach((empresa, i) => {
    if (empresa.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaEmpresa
        empresa={empresa}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Empresas"} />
      <Container className="mt-3 overflow-auto">
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
              <th>Razão Social</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaEmpresa({ empresa, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td className="text-center">{empresa.codigo}</td>
      <td>{empresa.nome}</td>
      <td>{empresa.info.telefone}</td>
      <td>{empresa.info.email}</td>
      <td>
        <div className="d-flex justify-content-center">
          <EditButton onclick={() => handleEdit(empresa)} />
          <DeleteButton onclick={() => handleConfirm(empresa.codigo)} />
        </div>
      </td>
    </tr>
  );
}
