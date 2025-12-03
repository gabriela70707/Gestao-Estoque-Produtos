import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Button } from "../componentes/button/Button";
import { Card } from "../componentes/cards/Card";
import { Funnel } from "lucide-react";
import { BarraPesquisa } from "../componentes/barra-pesquisa/BarraPesquisa";
import { Select } from "../componentes/select/Select";
import { TabelaHistorico } from "../componentes/tabela-historico/TabelaHistorico";

const Historico = () => {
  const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;

    h1 {
      font-size: 1rem;
    }
  `;

  const Overview = styled.section`
    display: flex;
    gap: 1rem;
    margin-top: 2.5rem;
  `;

  const Filtros = styled.section`
    display: grid;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 1rem;
    margin-top: 2rem;

    .title {
      display: flex;
    }

    .filtros {
      display: flex;
      gap: 2rem;
    }
  `;

  return (
    <>
      <Header />
      <NavBar />
      <Title>
        <h1>Histórico de Movimentações</h1>
        <Button text={"Exportar CSV"} color={"#2e6834ff"} />
      </Title>
      <Overview>
        <Card text={"Total de Movimentações"} numero={"4"} color={"#000"} />
        <Card
          text={"Total de Entradas"}
          numero={"15 unidades"}
          color={"#10510bff"}
        />
        <Card
          text={"Total de Movimentações"}
          numero={"8 unidades"}
          color={"#a00d0dff"}
        />
      </Overview>
      <Filtros>
        <div className="title">
          <Funnel />
          Filtros
        </div>
        <div className="filtros">
          <BarraPesquisa />
          <Select descricao={"Todos os tipos"} />
          <Select descricao={"Todas as Datas"} />
        </div>
      </Filtros>
      <TabelaHistorico />
    </>
  );
};

export default Historico;
