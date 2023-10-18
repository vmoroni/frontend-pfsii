import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect } from "react";
import Cabecalho2 from "../../components/Cabecalho2";
import axios from "axios";
import { toast } from "react-toastify";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import FormTextField from "../../components/Form/form-field";
import FormSelectField from "../../components/Form/form-select-field";
import { emailRegex } from "../../utils/expressions";
import { urlBase } from "../../utils/definitions";
import MaskedFormTextField from "../../components/Form/masked-form-field";

const schema = Yup.object().shape({
  nome: Yup.string().required("Razão social é obrigatório"),
  cnpj: Yup.string().required("CNPJ é obrigatório"),
  ie: Yup.string().required("Inscrição estadual é obrigatório"),
  proprietario: Yup.string().required("Proprietário é obrigatório"),
  info_telefone: Yup.string().required("Telefone é obrigatório"),
  // Regex to validate email format, need to break this expression in multilines
  info_email: Yup.string()
    .required("E-mail é obrigatório")
    .matches(emailRegex, "Endereço de email inválido"),
  info_endereco: Yup.string().required("Endereço é obrigatório"),
  info_bairro: Yup.string().required("Bairro é obrigatório"),
  info_cidade: Yup.string().required("Cidade é obrigatório"),
  info_cep: Yup.string().required("CEP é obrigatório"),
  info_uf: Yup.string().required("UF é obrigatório"),
});

const initialValues = {
  codigo: "",
  cnpj: "",
  ie: "",
  nome: "",
  proprietario: "",
  info_telefone: "",
  info_email: "",
  info_endereco: "",
  info_bairro: "",
  info_cidade: "",
  info_cep: "",
  info_uf: "",
};

const options = {
  headers: { "content-type": "application/json" },
};

export default function FormEmpresa({
  onEdit,
  setExibeTabela,
  setOnEdit,
  empresas,
  setEmpresas,
}) {
  // Submissão dos dados
  const handleSubmit = async (values, actions) => {
    const updatedEmpresas = empresas;

    if (onEdit) {
      axios
        .put(`${urlBase}/empresas/`, JSON.stringify(values), options)
        .then((response) => {
          // Get index of item on edition
          const index = updatedEmpresas.findIndex(
            (i) => i.codigo === onEdit.codigo
          );
          // Replace old values
          updatedEmpresas[index] = values;
          // Set new list
          setEmpresas(updatedEmpresas);
          toast.success(response.data.message);
        })
        .catch(({ response }) => {
          toast.error(response.data.message);
        });
    } else {
      axios
        .post(`${urlBase}/empresas/`, JSON.stringify(values), options)
        .then((response) => {
          formik.setFieldValue("codigo", response.data.id);
          values.codigo = response.data.id;
          updatedEmpresas.push(values);
          setEmpresas(updatedEmpresas);
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
        if (key === "info") {
          for (const key2 in onEdit["info"]) {
            formik.setFieldValue(`info_${key2}`, onEdit[key][key2]);
          }
        } else {
          formik.setFieldValue(key, onEdit[key]);
        }
      }
    }
    // eslint-disable-next-line
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Empresa"} />
      <Container
        className="my-4 p-3 overflow-auto"
        style={{ maxHeight: "75vh" }}
      >
        <FormikProvider value={formik}>
          <Row>
            <Col sm={2} md={2} lg={2} className="mb-3">
              <FormTextField
                controlId="formEmpresa.codigo"
                label="Código"
                name="codigo"
                isDisabled={true}
              />
            </Col>
          </Row>

          <Row>
            <Col className="mb-3">
              <FormTextField
                controlId="formEmpresa.razaoSocial"
                label="Razão Social"
                name="nome"
                placeholder="Informe a Razão Social da empresa"
                required
              />
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formEmpresa.cnpj"
                label="CNPJ"
                name="cnpj"
                format="##.###.###/####-##"
                mask="_"
                placeholder="Informe o CPNJ da empresa"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.ie"
                label="Inscrição Estadual"
                name="ie"
                placeholder="Informe a Inscrição Estadual da empresa"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.proprietario"
                label="Proprietário"
                name="proprietario"
                placeholder="Informe a Proprietário da empresa"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formEmpresa.cep"
                label="CEP"
                name="info_cep"
                format="######-###"
                mask="_"
                placeholder="Informe a CEP da empresa"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.endereco"
                label="Endereço"
                name="info_endereco"
                placeholder="Informe a Endereço da empresa"
                required
              />
            </Col>

            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.bairro"
                label="Bairro"
                name="info_bairro"
                placeholder="Informe a Bairro da empresa"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.cidade"
                label="Cidade"
                name="info_cidade"
                placeholder="Informe a cidade da empresa"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormSelectField
                controlId="formEmpresa.uf"
                label="UF"
                name="info_uf"
                className="mb-3"
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
              </FormSelectField>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <MaskedFormTextField
                controlId="formEmpresa.telefone"
                label="Telefone"
                name="info_telefone"
                format="(##) #####-####"
                mask="_"
                placeholder="Informe a telefone da empresa"
                required
              />
            </Col>
            <Col md={6} className="mb-3">
              <FormTextField
                controlId="formEmpresa.email"
                label="E-mail"
                name="info_email"
                type="email"
                placeholder="Informe a e-mail da empresa"
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
