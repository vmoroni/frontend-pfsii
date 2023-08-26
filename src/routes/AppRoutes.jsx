import { useContext } from "react";
import { AuthProvider, AuthContext } from "../contexts/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import {
  PageAlunos,
  PageCargos,
  PageCursos,
  PageEmpresas,
  PageFuncionarios,
  PageTurmas,
  HomePage,
} from "../pages/Layout/Index";

import LoginPage from "../pages/LoginPage/Index";
// import HomePage from "../pages/HomePage/Index";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) return <Navigate to="/frontend-pfsii/login" />;

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/frontend-pfsii">
            <Route exact path="/frontend-pfsii/login" element={<LoginPage />} />
            <Route
              exact
              path="/frontend-pfsii"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
            <Route path="/frontend-pfsii/cadastro">
              <Route
                path="/frontend-pfsii/cadastro/alunos"
                element={
                  <Private>
                    <PageAlunos />
                  </Private>
                }
              />
              <Route
                path="/frontend-pfsii/cadastro/cargos"
                element={
                  <Private>
                    <PageCargos />
                  </Private>
                }
              />
              <Route
                path="/frontend-pfsii/cadastro/cursos"
                element={
                  <Private>
                    <PageCursos />
                  </Private>
                }
              />
              <Route
                path="/frontend-pfsii/cadastro/empresas"
                element={
                  <Private>
                    <PageEmpresas />
                  </Private>
                }
              />
              <Route
                path="/frontend-pfsii/cadastro/funcionarios"
                element={
                  <Private>
                    <PageFuncionarios />
                  </Private>
                }
              />
              <Route
                path="/frontend-pfsii/cadastro/turmas"
                element={
                  <Private>
                    <PageTurmas />
                  </Private>
                }
              />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
