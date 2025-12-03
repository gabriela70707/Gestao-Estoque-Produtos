import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Button } from "../componentes/button/Button";
import { ModalMovimentacao } from "../componentes/modal-movimentacao/ModalMovimentacao";
import { api } from "../service/api";
import { TrendingUp, TrendingDown, Package, DollarSign, CircleArrowUp, CircleArrowDown, TriangleAlert } from 'lucide-react';
import { lighten } from "polished";

const Home = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    totalProdutos: 0,
    totalEstoque: 0,
    entradas7dias: 0,
    saidas7dias: 0
  });
  const [produtosBaixo, setProdutosBaixo] = useState([]);
  const [ultimasMovimentacoes, setUltimasMovimentacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [produtos, movimentacoes, estoqueBaixo, categoriasData] = await Promise.all([
        api.listarProdutos(),
        api.listarMovimentacoes(),
        api.produtosEstoqueBaixo(),
        api.listarCategorias()
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
      
      // Pegar as 5 últimas movimentações
      setUltimasMovimentacoes(movimentacoes.slice(0, 5));

      // Calcular estoque por categoria
      const estoquesPorCategoria = categoriasData.map(cat => {
        const produtosDaCategoria = produtos.filter(p => p.categoria.id === cat.id);
        const totalUnidades = produtosDaCategoria.reduce((sum, p) => sum + p.estoque_atual, 0);
        return {
          nome: cat.nome,
          unidades: totalUnidades,
          produtos: produtosDaCategoria.length
        };
      });

      setCategorias(estoquesPorCategoria);
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
      carregarDados();
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
      
      <EstoquePorCategoria categorias={categorias} />
      
      <UltimasMovimentacoes movimentacoes={ultimasMovimentacoes} />

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
  return (
    <AlertContent>
      <AlertTitle>
        <TriangleAlert color='red'/>
        <p>Alerta de Estoque Baixo</p>
      </AlertTitle>
      <AlertItens>
        {produtos.map(produto => (
          <p key={produto.id}>
            • {produto.nome} - Estoque atual: {produto.estoque_atual} (mínimo: {produto.estoque_minimo})
          </p>
        ))}
      </AlertItens>
    </AlertContent>
  );
};

// Componente CardGeral dinâmico
const CardGeralDinamico = ({ estatisticas }) => {
  return (
    <CardContainer>
      <Card>
        <Info>
          <p>Total de Produtos</p>
          <h2>{estatisticas.totalProdutos}</h2>
        </Info>
        <FundoLogo color="#0C2655FF">
          <Package color="#0C2655FF"/>
        </FundoLogo>
      </Card>

      <Card>
        <Info>
          <p>Itens em Estoque</p>
          <h2>{estatisticas.totalEstoque}</h2>
        </Info>
        <FundoLogo color="#4D0650FF">
          <DollarSign color="#4D0650FF"/>
        </FundoLogo>
      </Card>

      <Card>
        <Info>
          <p>Entradas (7 dias)</p>
          <h2>{estatisticas.entradas7dias}</h2>
        </Info>
        <FundoLogo color="#014201FF">
          <CircleArrowUp color="#014201FF"/>
        </FundoLogo>
      </Card>

      <Card>
        <Info>
          <p>Saídas (7 dias)</p>
          <h2>{estatisticas.saidas7dias}</h2>
        </Info>
        <FundoLogo color="#5A1B02FF">
          <CircleArrowDown color="#5A1B02FF"/>
        </FundoLogo>
      </Card>
    </CardContainer>
  );
};

// Componente Estoque por Categoria
const EstoquePorCategoria = ({ categorias }) => {
  return (
    <CategoriaContainer>
      <CategoriaTitle>
        <p>Estoque por Categoria</p>
      </CategoriaTitle>
      <CategoriaCards>
        {categorias.map((cat, index) => (
          <CategoriaCard key={index}>
            <p style={{ fontWeight: '600' }}>{cat.nome}</p>
            <p>{cat.unidades} unidades</p>
            <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>{cat.produtos} produto(s)</p>
          </CategoriaCard>
        ))}
      </CategoriaCards>
    </CategoriaContainer>
  );
};

// Componente Últimas Movimentações
const UltimasMovimentacoes = ({ movimentacoes }) => {
  return (
    <MovimentacaoContainer>
      <p style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '1rem' }}>
        Últimas Movimentações
      </p>
      {movimentacoes.map(mov => (
        <MovimentacaoLine key={mov.id}>
          <MovimentacaoInfo>
            <FundoLogo color={mov.tipo === 'entrada' ? '#003A0DFF' : '#5A1B02FF'}>
              {mov.tipo === 'entrada' ? (
                <TrendingUp color='#003A0DFF' />
              ) : (
                <TrendingDown color='#5A1B02FF' />
              )}
            </FundoLogo>
            <div>
              <p style={{ fontWeight: '600' }}>{mov.produto.nome}</p>
              <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                {mov.tipo === 'entrada' ? 'Entrada' : 'Saída'} de {mov.quantidade} unidade(s)
              </p>
            </div>
          </MovimentacaoInfo>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: '600' }}>{mov.usuario.nome}</p>
            <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>
              {new Date(mov.data_movimentacao).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </MovimentacaoLine>
      ))}
    </MovimentacaoContainer>
  );
};

// Styled Components
const AlertContent = styled.div`
  display: grid;
  background-color: #EB76762D;
  margin-top: 3rem;
  padding: 1.2rem;
  gap: 1rem;
  border-left: 5px solid red;
  border-radius: 0.5rem;
`;

const AlertTitle = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: center;
  font-weight: 600;
`;

const AlertItens = styled.div`
  display: grid;
  gap: 0.3rem;
`;

const CardContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  gap: 1rem;
`;

const Card = styled.div`
  display: flex;
  height: 5.9rem;
  flex: 1;
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
  
  p {
    font-size: 0.9rem;
    color: #6c757d;
  }
  
  h2 {
    font-size: 1.8rem;
  }
`;

const FundoLogo = styled.div`
  display: grid;  
  place-items: center;
  height: clamp(2rem, 3vw, 3.5rem);
  width: clamp(2rem, 3vw, 3.5rem);
  border-radius: 1rem;
  background-color: ${({ color }) => lighten(0.75, color)}; 
`;

const CategoriaContainer = styled.section`
  display: grid;
  box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1rem;
`;

const CategoriaTitle = styled.div`
  display: flex;
  padding: 0 0 2rem 0;
  font-weight: 600;
  font-size: 1.1rem;
`;

const CategoriaCards = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const CategoriaCard = styled.div`
  display: grid;
  height: 5.9rem;
  flex: 1;
  border-radius: 0.5rem;
  background-color: #ffffff;
  padding: 0.8rem;
  border: 0.2px solid #E6E6E6FF;
  place-items: start;
`;

const MovimentacaoContainer = styled.section`
  display: grid;
  box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const MovimentacaoLine = styled.div`
  display: flex;
  border: 0.2px solid #E6E6E6FF;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
`;

const MovimentacaoInfo = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.1rem;
  color: #6c757d;
`;

export default Home;