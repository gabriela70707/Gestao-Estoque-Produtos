import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Alerta } from "../componentes/alerta/Alert";
import { Button } from "../componentes/button/Button";
import { CardGeral } from "../componentes/card-info-geral/CardGeral";
import { NavCategoriaEstoque } from "../componentes/estoque-categoria/Nav-Estoque-Categoria";
import { CardMovimentacao } from "../componentes/movimentacao/CardMovimentacao";
import { ModalMovimentacao } from "../componentes/modal-movimentacao/ModalMovimentacao";
import { api } from "../service/api";

const Home = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    totalProdutos: 0,
    totalEstoque: 0,
    entradas7dias: 0,
    saidas7dias: 0
  });
  const [produtosBaixo, setProdutosBaixo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [produtos, movimentacoes, estoqueBaixo] = await Promise.all([
        api.listarProdutos(),
        api.listarMovimentacoes(),
        api.produtosEstoqueBaixo()
      ]);

      // Calcular estatísticas
      const totalProdutos = produtos.length;
      const totalEstoque = produtos.reduce((sum, p) => sum + p.estoque_atual, 0);

      // Movimentações dos últimos 7 dias
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
      
      const movimentacoesRecentes = movimentacoes.filter(m => 
        new Date(m.data_movimentacao) >= seteDiasAtras
      );

      const entradas7dias = movimentacoesRecentes
        .filter(m => m.tipo === "entrada")
        .reduce((sum, m) => sum + m.quantidade, 0);

      const saidas7dias = movimentacoesRecentes
        .filter(m => m.tipo === "saida")
        .reduce((sum, m) => sum + m.quantidade, 0);

      setEstatisticas({
        totalProdutos,
        totalEstoque,
        entradas7dias,
        saidas7dias
      });

      setProdutosBaixo(estoqueBaixo);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro ao carregar dados. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarMovimentacao = async (dados) => {
    try {
      await api.criarMovimentacao(dados);
      alert("Movimentação registrada com sucesso!");
      setModalAberto(false);
      carregarDados(); // Recarregar dados
    } catch (error) {
      console.error("Erro ao registrar movimentação:", error);
      throw new Error(error.message || "Erro ao registrar movimentação");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <NavBar />
        <LoadingMessage>Carregando dados...</LoadingMessage>
      </>
    );
  }

  return (
    <>
      <Header />
      <NavBar />
      
      {produtosBaixo.length > 0 && <AlertaBaixoEstoque produtos={produtosBaixo} />}
      
      <CardGeralDinamico estatisticas={estatisticas} />
      
      <div onClick={() => setModalAberto(true)}>
        <Button text={"Registrar movimentação"} color={"#4171c9"} />
      </div>
      
      <NavCategoriaEstoque />
      <CardMovimentacao />

      {modalAberto && (
        <ModalMovimentacao
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvarMovimentacao}
        />
      )}
    </>
  );
};

// Componente de Alerta dinâmico
const AlertaBaixoEstoque = ({ produtos }) => {
  const Content = styled.div`
    display: grid;
    background-color: #EB76762D;
    margin-top: 3rem;
    padding: 1.2rem;
    gap: 1rem;
    border-left: 5px solid red;
    border-radius: 0.5rem;
  `;

  const Title = styled.div`
    display: flex;
    gap: 0.9rem;
    align-items: center;
    font-weight: 600;
  `;

  return (
    <Content>
      <Title>
        ⚠️ Alerta de Estoque Baixo
      </Title>
      <div>
        {produtos.map(produto => (
          <p key={produto.id}>
            • {produto.nome} - Estoque atual: {produto.estoque_atual} (mínimo: {produto.estoque_minimo})
          </p>
        ))}
      </div>
    </Content>
  );
};

// Componente CardGeral dinâmico
const CardGeralDinamico = ({ estatisticas }) => {
  const Content = styled.div`
    display: flex;
    margin-top: 2rem;
    justify-content: space-between;
  `;

  const Card = styled.div`
    display: flex;
    height: 5.9rem;
    width: 18rem;
    border-radius: 0.5rem;
    background-color: #ffffff;
    padding: 0.8rem;
    box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
    place-items: center;    
    justify-content: space-around;
  `;

  const Info = styled.div`
    display: grid;
    text-align: start;
    height: 3.5rem;
    align-items: center;
  `;

  return (
    <Content>
      <Card>
        <Info>
          <p>Total de Produtos</p>
          <h2>{estatisticas.totalProdutos}</h2>
        </Info>
      </Card>

      <Card>
        <Info>
          <p>Itens em Estoque</p>
          <h2>{estatisticas.totalEstoque}</h2>
        </Info>
      </Card>

      <Card>
        <Info>
          <p>Entradas (7 dias)</p>
          <h2>{estatisticas.entradas7dias}</h2>
        </Info>
      </Card>

      <Card>
        <Info>
          <p>Saídas (7 dias)</p>
          <h2>{estatisticas.saidas7dias}</h2>
        </Info>
      </Card>
    </Content>
  );
};

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #6c757d;
`;

export default Home;