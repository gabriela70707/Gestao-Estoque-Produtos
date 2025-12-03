import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../componentes/header/Header";
import NavBar from "../componentes/navbar/NavBar";
import { Button } from "../componentes/button/Button";
import { Card } from "../componentes/cards/Card";
import { Funnel } from "lucide-react";
import { TabelaHistorico } from "../componentes/tabela-historico/TabelaHistorico";
import { api } from "../service/api";

const Historico = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [movimentacoesFiltradas, setMovimentacoesFiltradas] = useState([]);
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    totalEntradas: 0,
    totalSaidas: 0
  });

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    filtrarMovimentacoes();
  }, [busca, tipoFiltro, movimentacoes]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const data = await api.listarMovimentacoes();
      
      // Formatar dados
      const movimentacoesFormatadas = data.map(m => ({
        id: m.id,
        data: new Date(m.data_movimentacao).toLocaleDateString('pt-BR'),
        hora: new Date(m.data_movimentacao).toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        tipo: m.tipo === 'entrada' ? 'Entrada' : 'Saída',
        produto: m.produto.nome,
        quantidade: m.quantidade,
        responsavel: m.usuario.nome,
        observacoes: m.observacoes || '-'
      }));

      setMovimentacoes(movimentacoesFormatadas);

      // Calcular estatísticas
      const totalEntradas = data
        .filter(m => m.tipo === 'entrada')
        .reduce((sum, m) => sum + m.quantidade, 0);
      
      const totalSaidas = data
        .filter(m => m.tipo === 'saida')
        .reduce((sum, m) => sum + m.quantidade, 0);

      setEstatisticas({
        total: data.length,
        totalEntradas,
        totalSaidas
      });
    } catch (error) {
      console.error("Erro ao carregar movimentações:", error);
      alert("Erro ao carregar histórico. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const filtrarMovimentacoes = () => {
    let filtradas = [...movimentacoes];

    // Filtro de busca
    if (busca) {
      filtradas = filtradas.filter(m =>
        m.produto.toLowerCase().includes(busca.toLowerCase()) ||
        m.responsavel.toLowerCase().includes(busca.toLowerCase()) ||
        m.observacoes.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Filtro de tipo
    if (tipoFiltro) {
      filtradas = filtradas.filter(m => m.tipo === tipoFiltro);
    }

    setMovimentacoesFiltradas(filtradas);
  };

  const exportarCSV = () => {
    // Cabeçalhos do CSV
    const headers = ['Data', 'Hora', 'Tipo', 'Produto', 'Quantidade', 'Responsável', 'Observações'];
    
    // Dados
    const rows = movimentacoesFiltradas.map(m => [
      m.data,
      m.hora,
      m.tipo,
      m.produto,
      m.quantidade,
      m.responsavel,
      m.observacoes
    ]);

    // Montar CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `historico_movimentacoes_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      gap: 0.5rem;
      align-items: center;
      font-weight: 600;
    }

    .filtros {
      display: flex;
      gap: 2rem;
    }
  `;

  const Input = styled.input`
    padding: 0.7rem;
    border: solid 0.1rem #727272ff;
    border-radius: 1rem;
    width: 100%;
    font-size: 0.95rem;
  `;

  const Select = styled.select`
    padding: 0.7rem;
    border: solid 0.1rem #727272ff;
    border-radius: 1rem;
    width: 100%;
    font-size: 0.95rem;
    background-color: white;
  `;

  const LoadingMessage = styled.div`
    text-align: center;
    padding: 3rem;
    font-size: 1.1rem;
    color: #6c757d;
  `;

  if (loading) {
    return (
      <>
        <Header />
        <NavBar />
        <LoadingMessage>Carregando histórico...</LoadingMessage>
      </>
    );
  }

  return (
    <>
      <Header />
      <NavBar />
      <Title>
        <h1>Histórico de Movimentações</h1>
        <div onClick={exportarCSV}>
          <Button text={"Exportar CSV"} color={"#2e6834ff"} />
        </div>
      </Title>
      
      <Overview>
        <Card 
          text={"Total de Movimentações"} 
          numero={estatisticas.total} 
          color={"#000"} 
        />
        <Card
          text={"Total de Entradas"}
          numero={`${estatisticas.totalEntradas} unidades`}
          color={"#10510bff"}
        />
        <Card
          text={"Total de Saídas"}
          numero={`${estatisticas.totalSaidas} unidades`}
          color={"#a00d0dff"}
        />
      </Overview>
      
      <Filtros>
        <div className="title">
          <Funnel size={20} />
          Filtros
        </div>
        <div className="filtros">
          <Input
            placeholder="Buscar por produto, responsável ou observações..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          
          <Select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </Select>
        </div>
      </Filtros>
      
      <TabelaHistorico movimentacoes={movimentacoesFiltradas} />
    </>
  );
};

export default Historico;