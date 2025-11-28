import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './componentes/header/Header'
import NavBar from './componentes/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header/>
        <NavBar/>
    </>
  )
}

export default App
