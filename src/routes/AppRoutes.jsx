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

    if (!authenticated) return <Navigate to="/login" />;

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route path="/cadastro">
            <Route
              path="alunos"
              element={
                <Private>
                  <PageAlunos />
                </Private>
              }
            />
            <Route
              path="cargos"
              element={
                <Private>
                  <PageCargos />
                </Private>
              }
            />
            <Route
              path="cursos"
              element={
                <Private>
                  <PageCursos />
                </Private>
              }
            />
            <Route
              path="empresas"
              element={
                <Private>
                  <PageEmpresas />
                </Private>
              }
            />
            <Route
              path="funcionarios"
              element={
                <Private>
                  <PageFuncionarios />
                </Private>
              }
            />
            <Route
              path="turmas"
              element={
                <Private>
                  <PageTurmas />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
