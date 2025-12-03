import Historico from "./paginas/Historico";
import Home from "./paginas/Home";
import Produto from "./paginas/Produtos";
import Login from "./paginas/Login";
import { Routes, Route, Navigate } from "react-router-dom";

// Função para verificar autenticação
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/produtos" element={<PrivateRoute><Produto /></PrivateRoute>} />
      <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
    </Routes>
  );
}


