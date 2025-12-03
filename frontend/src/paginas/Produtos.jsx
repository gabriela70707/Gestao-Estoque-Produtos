import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Button } from "../componentes/button/Button";
import { TabelaProdutos } from "../componentes/tabela-produtos/TabelaProdutos";
import { BarraPesquisa } from "../componentes/barra-pesquisa/BarraPesquisa";
import { ModalProduto } from "../componentes/modal-produtos/ModalProdutos";
import { api } from "../service/api";

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
  }, [busca, categoriaFiltro]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [produtosData, categoriasData] = await Promise.all([
        api.listarProdutos(busca, categoriaFiltro || null),
        api.listarCategorias()
      ]);
      
      // Transformar dados para o formato da tabela
      const produtosFormatados = produtosData.map(p => ({
        id: p.id,
        nome: p.nome,
        detalhes: p.descricao,
        categoria: p.categoria.nome,
        quantidade: p.estoque_atual,
        minimo: p.estoque_minimo,
        especificacoes: [
          p.tela && `Tela: ${p.tela}`,
          p.armazenamento && `Armazenamento: ${p.armazenamento}`,
          p.ram && `RAM: ${p.ram}`,
          p.tensao && `Tensão: ${p.tensao}`
        ].filter(Boolean)
      }));
      
      setProdutos(produtosFormatados);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Erro ao carregar produtos. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setModalAberto(true);
  };

  const handleEditarProduto = (id) => {
    const produto = produtos.find(p => p.id === id);
    setProdutoEditando(produto);
    setModalAberto(true);
  };

  const handleExcluirProduto = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await api.deletarProduto(id);
      alert("Produto excluído com sucesso!");
      carregarDados();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Erro ao excluir produto.");
    }
  };

  const handleSalvarProduto = async (dados) => {
    try {
      if (produtoEditando) {
        await api.atualizarProduto(produtoEditando.id, dados);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.criarProduto(dados);
        alert("Produto cadastrado com sucesso!");
      }
      setModalAberto(false);
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

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

  const Select = styled.select`
    display: flex;
    padding: 0.7rem;
    width: 100%;
    border: solid 0.1rem #727272ff;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
    color: black;
  `;

  const LoadingMessage = styled.div`
    text-align: center;
    padding: 3rem;
    font-size: 1.1rem;
    color: #6c757d;
  `;

  return (
    <>
      <Header />
      <NavBar />
      <Title>
        <h1>Gerenciar Produtos</h1>
        <div onClick={handleNovoProduto}>
          <Button text={"+ Novo Produto"} color={"#4171c9"} />
        </div>
      </Title>
      
      <Opcoes>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: "0.7rem",
            border: "solid 0.1rem #727272ff",
            borderRadius: "1rem",
            width: "100%"
          }}
        />
        
        <Select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </Select>
      </Opcoes>

      {loading ? (
        <LoadingMessage>Carregando produtos...</LoadingMessage>
      ) : (
        <TabelaProdutos 
          produtos={produtos}
          onEditar={handleEditarProduto}
          onExcluir={handleExcluirProduto}
        />
      )}

      {modalAberto && (
        <ModalProduto
          onClose={() => setModalAberto(false)}
          onSalvar={handleSalvarProduto}
          produto={produtoEditando}
        />
      )}
    </>
  );
};

export default Produto;