import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Button } from "../componentes/button/Button";
import { BarraPesquisa } from "..BarraPesquisa/componentes/barra-pesquisa/BarraPesquisa";
import { Select } from "..Select/componentes/select/Select";

const Produto = () => {
  const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;

    h1 {
      font-size: 1rem;
    }
  `;

  const Opcoes = styled.section`
    display: flex;
    margin-top: 2rem;
    gap: 5rem;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
    padding: 1.4rem;
    border-radius: 1rem;
  `;

  return (
    <>
      <Header />
      <NavBar />
      <Title>
        <h1>Gerenciar Produtos</h1>
        <Button text={"+ Novo Produto"} color={"#4171c9"} />
      </Title>
      <Opcoes>
        <BarraPesquisa />
        <Select descricao={"Todas as Categorias"} />
      </Opcoes>
    </>
  );
};

export default Produto;
