import Cursos from "../Cursos/Index";
import Empresas from "../Empresas/Index";
import Cargos from "../Cargos/Index";
import Funcionarios from "../Funcionarios/Index";
import Alunos from "../Alunos/Index";
import Turmas from "../Turmas/Index";
import Cabecalho1 from "../../components/Cabecalho1";
import Home from "../HomePage/Index";
import Pagina404 from "../404/Index";

// PÁGINAS

function PageAlunos(props) {
  return (
    <>
      <Cabecalho1 />
      <Alunos />
    </>
  );
}

function PageCargos(props) {
  return (
    <>
      <Cabecalho1 />
      <Cargos />
    </>
  );
}

function PageCursos(props) {
  return (
    <>
      <Cabecalho1 />
      <Cursos />
    </>
  );
}

function PageEmpresas(props) {
  return (
    <>
      <Cabecalho1 />
      <Empresas />
    </>
  );
}

function PageFuncionarios(props) {
  return (
    <>
      <Cabecalho1 />
      <Funcionarios />
    </>
  );
}

function PageTurmas(props) {
  return (
    <>
      <Cabecalho1 />
      <Turmas />
    </>
  );
}

// TELAS

function HomePage(props) {
  return (
    <>
      <Cabecalho1 />
      <Home />
    </>
  );
}

function Page404(props) {
  return (
    <>
      {/* < Cabecalho1 /> */}
      <Pagina404 />
    </>
  );
}

export {
  PageAlunos,
  PageCargos,
  PageCursos,
  PageEmpresas,
  PageFuncionarios,
  HomePage,
  PageTurmas,
  Page404,
};
