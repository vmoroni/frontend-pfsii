import Cursos from "../Cursos/Index";
import Empresas from "../Empresas/Index";
import Cargos from "../Cargos/Index";
import Funcionarios from "../Funcionarios/Index";
import Alunos from "../Alunos/Index";
import Turmas from "../Turmas/Index";
import Header from "../../components/Header";
import Home from "../HomePage/Index";
import Orientadores from "../Orientadores/Index";
import Pagina404 from "../404/Index";
import TelaInserirAlunosTurmas from "../AlunosTurmas/Index";

// PÁGINAS

function PageAlunos(props) {
  return (
    <>
      <Header />
      <Alunos />
    </>
  );
}

function PageCargos(props) {
  return (
    <>
      <Header />
      <Cargos />
    </>
  );
}

function PageCursos(props) {
  return (
    <>
      <Header />
      <Cursos />
    </>
  );
}

function PageEmpresas(props) {
  return (
    <>
      <Header />
      <Empresas />
    </>
  );
}

function PageFuncionarios(props) {
  return (
    <>
      <Header />
      <Funcionarios />
    </>
  );
}

function PageOrientadores(props) {
  return (
    <>
      <Header />
      <Orientadores />
    </>
  );
}

function PageTurmas(props) {
  return (
    <>
      <Header />
      <Turmas />
    </>
  );
}

function PageAlunosTurmas(props) {
  return (
    <>
      <Header />
      <TelaInserirAlunosTurmas />
    </>
  );
}

// TELAS

function HomePage(props) {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

function Page404(props) {
  return (
    <>
      {/* < Header /> */}
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
  PageOrientadores,
  HomePage,
  PageTurmas,
  Page404,
  PageAlunosTurmas,
};
