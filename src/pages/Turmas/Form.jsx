import { Container, Col, Form, Row, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definitions";
import { toast } from "react-toastify";
import axios from "axios";
import SearchBar from "../../components/SearchBar/Index";
import { Formik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";
import FormSelectField from "../../components/Form/form-select-field";

const schema = Yup.object().shape({
  periodo: Yup.string().required("Período é obrigatório"),
  anoLetivo: Yup.number()
    .required("Ano letivo é obrigatório")
    .positive("Precisa ser um número positivo")
    .min(
      new Date().getFullYear(),
      "O valor mínimo não pode ser menor do que o ano atual"
    ),
  curso: Yup.object().required("Curso é obrigatório"),
  dataInicio: Yup.string().required("Data início é obrigatório"),
  dataFim: Yup.string().required("Data fim é obrigatório"),
  status: Yup.string().required("Status é obrigatório"),
  vagas: Yup.number().required("Vagas é obrigatório"),
  funcionario: Yup.object().required("Professor é obrigatório"),
});

const initialValues = {
  codigo: "",
  periodo: "",
  anoLetivo: "",
  curso: "",
  dataInicio: "",
  dataFim: "",
  status: "",
  vagas: "",
  funcionario: "",
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormTurma({
  cursos,
  funcionarios,
  onEdit,
  setExibeTabela,
  setOnEdit,
  turmas,
  setTurmas,
}) {
  const [selectedProf, setSelectedProf] = useState();
  const [selectedCurso, setSelectedCurso] = useState();
  const formRef = useRef();
  const formikRef = useRef();

  useEffect(() => {
    if (onEdit) {
      for (const key in onEdit) {
        // Set this condition only if the form has possibly nullable fields
        if (onEdit[key] !== null) {
          formikRef.current.setFieldValue(key, onEdit[key]);
        }
      }

      setSelectedCurso({
        codigo: onEdit.curso.codigo,
        nome: onEdit.curso.nome,
      });
      setSelectedProf({
        codigo: onEdit.funcionario.codigo,
        nome: onEdit.funcionario.nome,
      });
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (values, actions) => {
    const updatedTurmas = turmas;

    if (onEdit) {
      axios
        .put(`${urlBase}/turmas/`, JSON.stringify(values), options)
        .then((response) => {
          const index = updatedTurmas.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          updatedTurmas[index] = values;
          setTurmas(updatedTurmas);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      axios
        .post(`${urlBase}/turmas/`, JSON.stringify(values), options)
        .then((response) => {
          formikRef.current.setFieldValue("codigo", response.data.id);
          values.codigo = response.data.id;
          updatedTurmas.push(values);
          setTurmas(updatedTurmas);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Turma"} />
      <Container
        className="my-4 p-3 overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <Formik
          innerRef={formikRef}
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            isValid,
            isSubmitting,
            dirty,
          }) => (
            <Form noValidate onSubmit={handleSubmit} ref={formRef}>
              <Row>
                <Col sm={2} md={2} lg={2} className="mb-3">
                  <FormTextField
                    controlId="formTurma.codigo"
                    label="Código"
                    name="codigo"
                    value={values.codigo}
                    isDisabled={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormSelectField
                    controlId="formTurma.periodo"
                    label="Período"
                    name="periodo"
                    className="mb-3"
                    value={values.periodo}
                    required
                  >
                    <option value="">Selecione um período</option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                  </FormSelectField>
                </Col>

                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formTurma.anoLetivo"
                    label="Ano letivo"
                    name="anoLetivo"
                    type="number"
                    placeholder="Informe o ano letivo"
                    value={values.anoLetivo}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col className="mb-3">
                  <SearchBar
                    controlId="formTurma.curso"
                    label="Curso"
                    name="curso"
                    placeholder="Informe o curso"
                    data={cursos}
                    keyField="codigo"
                    searchField="nome"
                    select={setSelectedCurso}
                    selected={selectedCurso}
                    value={values.curso}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formTurma.dataInicio"
                    label="Data Início"
                    name="dataInicio"
                    type="date"
                    value={values.dataInicio}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formTurma.dataFim"
                    label="Data Fim"
                    name="dataFim"
                    type="date"
                    value={values.dataFim}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <FormSelectField
                    controlId="formTurma.status"
                    label="Status"
                    name="status"
                    className="mb-3"
                    value={values.status}
                    required
                  >
                    <option value="">Selecione o status do curso</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </FormSelectField>
                </Col>

                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formTurma.vagas"
                    label="Vagas"
                    name="vagas"
                    placeholder="Informe a quantidade de vagas"
                    value={values.vagas}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <SearchBar
                    controlId="formTurma.funcionario"
                    label="Professor"
                    name="funcionario"
                    placeholder="Informe o professor"
                    data={funcionarios}
                    keyField="codigo"
                    searchField="nome"
                    select={setSelectedProf}
                    selected={selectedProf}
                    value={values.funcionario}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col className="d-flex">
                  <Button
                    disabled={isSubmitting}
                    as="input"
                    size="md"
                    type="submit"
                    value="Salvar"
                    className="me-2"
                  />
                  <Button
                    variant="outline-secondary"
                    as="input"
                    size="md"
                    type="button"
                    value="Voltar"
                    onClick={handleBackButton}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
