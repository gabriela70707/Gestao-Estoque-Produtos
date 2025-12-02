import Historico from "./paginas/Historico";
import Home from "./paginas/Home";
import Produto from "./paginas/Produtos";
import { Routes, Route } from "react-router-dom";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Produto />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  );
}

export default Rotas;
