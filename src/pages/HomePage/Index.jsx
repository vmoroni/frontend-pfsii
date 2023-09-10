import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Container } from "react-bootstrap";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return <Container className="mt-4">Bem vindo(a), {user.email}!</Container>;
};

export default HomePage;
