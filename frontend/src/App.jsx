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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header/>
        <NavBar/>
        <Alerta/>
        <CardGeral/>
        <Button text={"Registrar movimentação"} color={"#4171c9"}/>
        <NavCategoriaEstoque/>
        <CardMovimentacao/>
    </>
  )
}

export default App
