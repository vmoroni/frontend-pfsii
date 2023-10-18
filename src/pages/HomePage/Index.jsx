import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Container } from "react-bootstrap";
// import icons from "../../components/HomePageIcon/IconList.js";
// import HomePageIcon from "../../components/HomePageIcon/Index.jsx";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container className="my-4 d-flex">
      {/* {icons.map((item) => (
        <HomePageIcon key={item.name} {...item} />
      ))} */}
      <p>Bem vindo, {user.email}!</p>
    </Container>
  );
};

export default HomePage;
