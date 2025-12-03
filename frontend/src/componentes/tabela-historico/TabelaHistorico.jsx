import styled from "styled-components";
import { TrendingUp, TrendingDown } from "lucide-react";

const TabelaContainer = styled.div`
  margin-top: 2rem;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`;

const Thead = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  color: #495057;
`;

const Tbody = styled.tbody`
  tr:hover {
    background-color: #f8f9fa;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  font-size: 0.9rem;
`;

const DataHora = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .data {
    font-weight: 600;
    color: #212529;
  }

  .hora {
    font-size: 0.85rem;
    color: #6c757d;
  }
`;

const TipoMovimentacao = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  width: fit-content;
  font-size: 0.85rem;
  font-weight: 500;

  &.entrada {
    background-color: #d4edda;
    color: #155724;
  }

  &.saida {
    background-color: #f8d7da;
    color: #D33F4EFF;
  }
`;

export function TabelaHistorico({ movimentacoes = movimentacoesExemplo }) {
  return (
    <TabelaContainer>
      <Table>
        <Thead>
          <tr>
            <Th>Data/Hora</Th>
            <Th>Tipo</Th>
            <Th>Produto</Th>
            <Th>Quantidade</Th>
            <Th>Responsável</Th>
            <Th>Observações</Th>
          </tr>
        </Thead>
        <Tbody>
          {movimentacoes.map((mov) => (
            <tr key={mov.id}>
              <Td>
                <DataHora>
                  <span className="data">{mov.data}</span>
                  <span className="hora">{mov.hora}</span>
                </DataHora>
              </Td>
              <Td>
                <TipoMovimentacao className={mov.tipo.toLowerCase()}>
                  {mov.tipo === 'Entrada' ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                  {mov.tipo}
                </TipoMovimentacao>
              </Td>
              <Td>{mov.produto}</Td>
              <Td>{mov.quantidade} unidade(s)</Td>
              <Td>{mov.responsavel}</Td>
              <Td>{mov.observacoes}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </TabelaContainer>
  );
}

// Dados de exemplo baseados na segunda imagem
const movimentacoesExemplo = [
  {
    id: 1,
    data: "20/11/2024",
    hora: "10:30",
    tipo: "Entrada",
    produto: "iPhone 15 Pro",
    quantidade: 10,
    responsavel: "João Silva",
    observacoes: "Recebimento de fornecedor"
  },
  {
    id: 2,
    data: "22/11/2024",
    hora: "14:15",
    tipo: "Saída",
    produto: "iPhone 15 Pro",
    quantidade: 5,
    responsavel: "Maria Santos",
    observacoes: "Venda loja física"
  },
  {
    id: 3,
    data: "25/11/2024",
    hora: "09:00",
    tipo: "Entrada",
    produto: "MacBook Pro 16\"",
    quantidade: 5,
    responsavel: "Carlos Oliveira",
    observacoes: "Reposição de estoque"
  },
  {
    id: 4,
    data: "26/11/2024",
    hora: "16:45",
    tipo: "Saída",
    produto: "Samsung Neo QLED 65\"",
    quantidade: 3,
    responsavel: "Ana Costa",
    observacoes: "Venda online"
  }
];