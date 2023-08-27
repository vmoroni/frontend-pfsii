import { Container } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/Index";
import { useState } from "react";

const list = [
  {
    cpf: "111.111.111-11",
    nome: "João da Silva",
  },
  {
    cpf: "222.222.222-11",
    nome: "Maria das Rosas",
  },
];

const HomePage = () => {
  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem);

  return (
    <>
      <Container className="mt-3">
        <SearchBar
          placeholder="Pesquisar por nome"
          data={list}
          keyField="cpf"
          searchField="nome"
          select={setSelectedItem}
          value=""
        />
      </Container>
    </>
  );
};
