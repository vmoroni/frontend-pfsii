import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Container } from "react-bootstrap";
// import styled from "styled-components";

// const HomePageBtn = styled.div`
//   display: flex;
//   width: 125px;
//   height: 125px;
//   border: 1px solid #ced4da;
//   border-radius: 5%;
//   margin: 0 15px 15px 0;
//   &:hover {
//     cursor: pointer;
//     background-color: #e9ecef;
//     color: #0d6efd;
//     font-weight: bold;
//     border: 1px solid #0d6efd;
//   }
// `;

// const SideBarDiv = styled.div`
//   border-radius: 15px;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
// `;

// const SideBarDivTitle = styled.div`
//   border-radius: 15px 15px 0 0;
//   background-color: #ced4da;
//   text-align: center;
//   padding: 8px;
// `;

// const SideBarDivText = styled.div`
//   padding: 8px;
// `;

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container className="my-4">
      <p>Bem vindo, {user.email}!</p>
    </Container>
  );
};

export default HomePage;
