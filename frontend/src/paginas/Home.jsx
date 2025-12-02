import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Alerta } from "../componentes/alerta/Alert";
import { Button } from "../componentes/button/Button";
import { CardGeral } from "../componentes/card-info-geral/CardGeral";
import { NavCategoriaEstoque } from "../componentes/estoque-categoria/Nav-Estoque-Categoria";
import { CardMovimentacao } from "../componentes/movimentacao/CardMovimentacao";



const Home = () => {
  return(
    <>
      <Header/>
      <NavBar/>
      <Alerta/>
      <CardGeral/>
      <Button text={"Registrar movimentação"} color={"#4171c9"}/>
      <NavCategoriaEstoque/>
      <CardMovimentacao/>
    </>
  );

}


export default Home;