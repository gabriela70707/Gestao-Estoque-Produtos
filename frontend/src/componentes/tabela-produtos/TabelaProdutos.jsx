import styled from "styled-components";
import { Pencil, Trash2, Smartphone, Monitor, Tv } from "lucide-react";

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

const MensagemVazia = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  font-size: 1rem;
`;

export function TabelaProdutos({ produtos = [], onEditar, onExcluir }) {
  const getIconeCategoria = (categoria) => {
    switch(categoria.toLowerCase()) {
      case 'smartphone':
        return <Smartphone size={18} />;
      case 'notebook':
        return <Monitor size={18} />;
      case 'smart tv':
        return <Tv size={18} />;
      default:
        return <Smartphone size={18} />;
    }
  };

  if (produtos.length === 0) {
    return (
      <TabelaContainer>
        <MensagemVazia>
          Nenhum produto encontrado. Cadastre um novo produto!
        </MensagemVazia>
      </TabelaContainer>
    );
  }

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
                      onClick={() => onEditar(produto.id)}
                      aria-label="Editar produto"
                    >
                      <Pencil size={18} />
                    </BotaoAcao>
                    <BotaoAcao 
                      className="excluir"
                      onClick={() => onExcluir(produto.id)}
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