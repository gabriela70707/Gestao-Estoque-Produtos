import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './componentes/header/Header'
import NavBar from './componentes/navbar/NavBar'
import { Alerta } from './componentes/alerta/Alert'
import { CardGeral } from './card-info-geral/CardGeral'
import { Button } from './button/Button'
import { NavCategoriaEstoque } from './estoque-categoria/Nav-Estoque-Categoria'
import { CardMovimentacao } from './movimentacao/CardMovimentacao'
import styled from 'styled-components'
import { BarraPesquisa } from './barra-pesquisa/BarraPesquisa'
import { Select } from './select/Select'

function App() {
  const [count, setCount] = useState(0)
  //Tela 2
  const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    

    h1{
      font-size: 1rem;
    }
  `;

  const Opcoes = styled.section`
    display: flex;
    margin-top: 2rem;
    gap: 5rem;
    box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
    padding: 1.4rem;
    border-radius: 1rem;
  `;

  return (
    <>
        {/*Tela 1 */}
        {/* <Header/>
        <NavBar/>
        <Alerta/>
        <CardGeral/>
        <Button text={"Registrar movimentação"} color={"#4171c9"}/>
        <NavCategoriaEstoque/>
        <CardMovimentacao/> */}

        {/*Tela 2*/}
        {/* <Header/>
        <NavBar/>
        <Title>
          <h1>Gerenciar Produtos</h1>
          <Button text={"+ Novo Produto"} color={"#4171c9"}/>
        </Title>
        <Opcoes>
          <BarraPesquisa/>
          <Select descricao={"Todas as Categorias"}/>
        </Opcoes> */}
        {/*Falta as tabelas*/}

        {/*Tela 3*/}
        <Header/>
        <NavBar/>
        <Title>
          <h1>Histórico de Movimentações</h1>
          <Button text={"Exportar CSV"} color={"#2e6834ff"}/>
        </Title>


    </>
  )
}

export default App
