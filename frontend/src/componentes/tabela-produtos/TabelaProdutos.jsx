import styled from "styled-components";
import { Pencil, Trash2, Smartphone, Monitor } from "lucide-react";


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

const ProdutoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .produto-nome {
    font-weight: 600;
    color: #212529;
  }

  .produto-detalhes {
    font-size: 0.85rem;
    color: #6c757d;
  }
`;

const CategoriaTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #495057;
`;

const EstoqueInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .quantidade {
    font-weight: 600;
    color: ${props => props.baixo ? '#dc3545' : '#212529'};
  }

  .minimo {
    font-size: 0.85rem;
    color: #6c757d;
  }
`;

const AlertaBaixo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.2rem;

  &::before {
    content: "⚠";
  }
`;

const EspecificacoesInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.85rem;
  color: #495057;
`;

const AcoesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const BotaoAcao = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.2s;

  &.editar {
    background-color: transparent;
    color: #4171c9;

    &:hover {
      background-color: #e7f1ff;
    }
  }

  &.excluir {
    background-color: transparent;
    color: #dc3545;

    &:hover {
      background-color: #ffe5e7;
    }
  }
`;

export function TabelaProdutos({ produtos = produtosExemplo }) {
  const getIconeCategoria = (categoria) => {
    switch(categoria.toLowerCase()) {
      case 'smartphone':
        return <Smartphone size={18} />;
      case 'notebook':
        return <Monitor size={18} />;
      default:
        return <Smartphone size={18} />;
    }
  };

  return (
    <TabelaContainer>
      <Table>
        <Thead>
          <tr>
            <Th>Produto</Th>
            <Th>Categoria</Th>
            <Th>Estoque</Th>
            <Th>Especificações</Th>
            <Th>Ações</Th>
          </tr>
        </Thead>
        <Tbody>
          {produtos.map((produto) => {
            const estoqueBaixo = produto.quantidade <= produto.minimo;
            
            return (
              <tr key={produto.id}>
                <Td>
                  <ProdutoInfo>
                    <span className="produto-nome">{produto.nome}</span>
                    <span className="produto-detalhes">{produto.detalhes}</span>
                  </ProdutoInfo>
                </Td>
                <Td>
                  <CategoriaTag>
                    {getIconeCategoria(produto.categoria)}
                    {produto.categoria}
                  </CategoriaTag>
                </Td>
                <Td>
                  <EstoqueInfo baixo={estoqueBaixo}>
                    <span className="quantidade">{produto.quantidade} unidades</span>
                    <span className="minimo">Mínimo: {produto.minimo}</span>
                    {estoqueBaixo && <AlertaBaixo>Estoque baixo</AlertaBaixo>}
                  </EstoqueInfo>
                </Td>
                <Td>
                  <EspecificacoesInfo>
                    {produto.especificacoes.map((spec, index) => (
                      <div key={index}>{spec}</div>
                    ))}
                  </EspecificacoesInfo>
                </Td>
                <Td>
                  <AcoesContainer>
                    <BotaoAcao 
                      className="editar"
                      onClick={() => console.log('Editar:', produto.id)}
                      aria-label="Editar produto"
                    >
                      <Pencil size={18} />
                    </BotaoAcao>
                    <BotaoAcao 
                      className="excluir"
                      onClick={() => console.log('Excluir:', produto.id)}
                      aria-label="Excluir produto"
                    >
                      <Trash2 size={18} />
                    </BotaoAcao>
                  </AcoesContainer>
                </Td>
              </tr>
            );
          })}
        </Tbody>
      </Table>
    </TabelaContainer>
  );
}

// Dados de exemplo baseados nas imagens
const produtosExemplo = [
  {
    id: 1,
    nome: "iPhone 15 Pro",
    detalhes: "Apple - iPhone 15 Pro 256GB",
    categoria: "Smartphone",
    quantidade: 15,
    minimo: 10,
    especificacoes: [
      "Tela: 2796 x 1290",
      "Armazenamento: 256GB",
      "RAM: 8GB"
    ]
  },
  {
    id: 2,
    nome: "Galaxy S24 Ultra",
    detalhes: "Samsung - Galaxy S24 Ultra 512GB",
    categoria: "Smartphone",
    quantidade: 8,
    minimo: 10,
    especificacoes: [
      "Tela: 3120 x 1440",
      "Armazenamento: 512GB",
      "RAM: 12GB"
    ]
  },
  {
    id: 3,
    nome: "MacBook Pro 16\"",
    detalhes: "Apple - MacBook Pro M3 Pro",
    categoria: "Notebook",
    quantidade: 5,
    minimo: 5,
    especificacoes: [
      "Tela: 3456 x 2234",
      "Armazenamento: 512GB SSD",
      "RAM: 18GB",
      "Tensão: 100-240V"
    ]
  },
  {
    id: 4,
    nome: "Dell XPS 15",
    detalhes: "Dell - XPS 15 9530",
    categoria: "Notebook",
    quantidade: 3,
    minimo: 5,
    especificacoes: [
      "Tela: 3840 x 2400",
      "Armazenamento: 1TB SSD",
      "RAM: 32GB",
      "Tensão: 100-240V"
    ]
  },
  {
    id: 5,
    nome: "Samsung Neo QLED 65\"",
    detalhes: "Samsung - QN65QN90C",
    categoria: "Smart TV",
    quantidade: 12,
    minimo: 8,
    especificacoes: [
      "Tela: 3840 x 2160 (4K)",
      "Tensão: 110-220V"
    ]
  },
  {
    id: 6,
    nome: "LG OLED 77\"",
    detalhes: "LG - OLED77C3PSA",
    categoria: "Smart TV",
    quantidade: 4,
    minimo: 6,
    especificacoes: [
      "Tela: 3840 x 2160 (4K)",
      "Tensão: 110-220V"
    ]
  }
];