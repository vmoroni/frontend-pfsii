import { Container, Col, Form, Row, Button } from "react-bootstrap";
import { useRef, useEffect } from "react";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definitions";
import { toast } from "react-toastify";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome do curso é obrigatório"),
  sala: Yup.string().required("Sala do curso é obrigatório"),
  eixo: Yup.string().required("Eixo formativo do curso é obrigatório"),
  cargaHoras: Yup.string().required("Carga de horas é obrigatório"),
  dataCriacao: Yup.string().required("Data de criação é obrigatório"),
  dataDesativacao: Yup.string(),
});

const initialValues = {
  codigo: "",
  nome: "",
  sala: "",
  eixo: "",
  cargaHoras: "",
  dataCriacao: "",
  dataDesativacao: "",
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormCurso({
  onEdit,
  setExibeTabela,
  setOnEdit,
  cursos,
  setCursos,
}) {
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
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (values, actions) => {
    const updatedCursos = cursos;

    if (onEdit) {
      axios
        .put(`${urlBase}/cursos/`, JSON.stringify(values), options)
        .then((response) => {
          const index = updatedCursos.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          updatedCursos[index] = values;
          setCursos(updatedCursos);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      axios
        .post(`${urlBase}/cursos/`, JSON.stringify(values), options)
        .then((response) => {
          formikRef.current.setFieldValue("codigo", response.data.id);
          values.codigo = response.data.id;
          updatedCursos.push(values);
          setCursos(updatedCursos);
          toast.success(response.data.message);
        })
        .catch(({response}) => {
          toast.error(response.data.message);
        });
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Curso"} />
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
                    controlId="formCurso.codigo"
                    label="Código"
                    name="codigo"
                    value={values.codigo}
                    isDisabled={true}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.nome"
                    label="Nome"
                    name="nome"
                    placeholder="Informe o nome do curso"
                    value={values.nome}
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.sala"
                    label="Sala"
                    name="sala"
                    placeholder="Informe a sala do curso"
                    value={values.sala}
                    required
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.eixo"
                    label="Eixo"
                    name="eixo"
                    placeholder="Informe o eixo formativo do curso"
                    value={values.eixo}
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.cargaHoras"
                    label="Carga horária"
                    name="cargaHoras"
                    placeholder="Informe a carga horária do curso"
                    value={values.cargaHoras}
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.dataCriacao"
                    label="Data Início"
                    name="dataCriacao"
                    type="date"
                    value={values.dataCriacao}
                    required
                  />
                </Col>

                <Col md={6} className="mb-3">
                  <FormTextField
                    controlId="formCurso.dataDesativacao"
                    label="Data Fim"
                    name="dataDesativacao"
                    type="date"
                    value={values.dataDesativacao}
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
