import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect } from "react";
import Cabecalho2 from "../../components/Cabecalho2";
import { urlBase } from "../../utils/definitions";
import axios from "axios";
import { toast } from "react-toastify";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";
import FormSelectField from "../../components/Form/form-select-field";
import MultiSelect from "../../components/SearchBar/Index";
import { useState } from "react";

const schema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
  nomeUsuario: Yup.string().required("Usuário é obrigatório"),
  senhaUsuario: Yup.string().required("Senha é obrigatório"),
  status: Yup.string().required("Status é obrigatório"),
  empresa: Yup.number().required("Empresa é obrigatório"),
});

const initialValues = {
  codigo: "",
  nome: "",
  nomeUsuario: "",
  senhaUsuario: "",
  empresa: "",
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormOrientador({
  empresas,
  onEdit,
  setExibeTabela,
  setOnEdit,
  orientadores,
  setOrientadores,
}) {
  const [empresa, setEmpresa] = useState(null);

  const handleSubmit = async (values, actions) => {
    const updatedOrientadores = orientadores;

    if (onEdit) {
      axios
        .put(`${urlBase}/orientadores/`, JSON.stringify(values), options)
        .then((response) => {
          // Get index of item on edition
          const index = updatedOrientadores.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          // Replace old values
          updatedOrientadores[index] = values;
          // Set new list
          setOrientadores(updatedOrientadores);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      axios
        .post(`${urlBase}/orientadores/`, JSON.stringify(values), options)
        .then((response) => {
          formik.setFieldValue("codigo", response.data.id);
          values.codigo = response.data.id;
          updatedOrientadores.push(values);
          setOrientadores(updatedOrientadores);
          toast.success(response.data.message);
          // After pushing new item to list, it goes to the end of it
          // It must be treated on list
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (onEdit) {
      for (const key in onEdit) {
        if (key === "empresa") {
          formik.setFieldValue(key, onEdit[key]["codigo"]);
        } else {
          formik.setFieldValue(key, onEdit[key]);
        }
      }

      setEmpresa(onEdit.empresa);
    }
    // eslint-disable-next-line
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Orientador"} />
      <Container
        className="my-4 p-3 overflow-auto"
        style={{ minHeight: "70vh", maxHeight: "75vh" }}
      >
        <FormikProvider value={formik}>
          <Row>
            <Col sm={2} md={2} lg={2} className="mb-3">
              <FormTextField
                controlId="formOrientador.codigo"
                label="Código"
                name="codigo"
                isDisabled={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formOrientador.nome"
                label="Nome"
                name="nome"
                placeholder="Informe o nome"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormSelectField
                controlId="formOrientador.status"
                label="Status"
                name="status"
                className="mb-3"
                required
              >
                <option value="">Selecione o status</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </FormSelectField>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formOrientador.nomeUsuario"
                label="Usuário"
                name="nomeUsuario"
                placeholder="Informe o usuário (login)"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formOrientador.senhaUsuario"
                label="Senha"
                name="senhaUsuario"
                type="password"
                placeholder="Informe a senha"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <MultiSelect
                controlId="formOrientador.empresa"
                label="Empresa"
                name="empresa"
                selected={empresa}
                data={empresas}
                keyField="codigo"
                searchField="nome"
                formRef={formik}
                required
              />
            </Col>
          </Row>

          <Row>
            <Col className="d-flex">
              <Button
                size="md"
                type="submit"
                value="Salvar"
                className="me-2"
                onClick={formik.handleSubmit}
              >
                Salvar
              </Button>
              <Button
                variant="outline-secondary"
                size="md"
                type="button"
                value="Voltar"
                onClick={handleBackButton}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        </FormikProvider>
      </Container>
    </div>
  );
}
