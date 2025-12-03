import { useState, useEffect } from "react";
import styled from "styled-components";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { api } from "../../service/api";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  min-height: 80px;
  resize: vertical;
`;

const TipoMovimentacaoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const TipoButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.ativo ? props.cor : '#e9ecef'};
  background-color: ${props => props.ativo ? `${props.cor}15` : 'white'};
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.ativo ? props.cor : '#6c757d'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => `${props.cor}15`};
    border-color: ${props => props.cor};
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #4171c9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  
  &:hover {
    background-color: #365ba8;
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.3rem;
`;

const EstoqueAtualInfo = styled.div`
  padding: 0.8rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #495057;
  
  strong {
    color: #212529;
  }
`;

const ErrorMessage = styled.div`
  padding: 0.8rem;
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 0.5rem;
  color: #842029;
  font-size: 0.85rem;
`;

export function ModalMovimentacao({ onClose, onSalvar }) {
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    produto_id: "",
    tipo: "entrada",
    quantidade: 1,
    observacoes: "",
    data_movimentacao: new Date().toISOString().slice(0, 16)
  });
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  useEffect(() => {
    if (formData.produto_id) {
      const produto = produtos.find(p => p.id === parseInt(formData.produto_id));
      setProdutoSelecionado(produto);
    } else {
      setProdutoSelecionado(null);
    }
  }, [formData.produto_id, produtos]);

  const carregarProdutos = async () => {
    try {
      const data = await api.listarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setErro("Erro ao carregar produtos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    // Validações
    if (!formData.produto_id) {
      setErro("Selecione um produto");
      return;
    }

    if (formData.quantidade <= 0) {
      setErro("Quantidade deve ser maior que zero");
      return;
    }

    if (formData.tipo === "saida" && produtoSelecionado) {
      if (formData.quantidade > produtoSelecionado.estoque_atual) {
        setErro(`Quantidade insuficiente em estoque. Disponível: ${produtoSelecionado.estoque_atual}`);
        return;
      }
    }

    try {
      setLoading(true);
      await onSalvar({
        ...formData,
        quantidade: parseInt(formData.quantidade),
        produto_id: parseInt(formData.produto_id)
      });
    } catch (error) {
      setErro(error.message || "Erro ao registrar movimentação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Nova Movimentação</h2>
          <X onClick={onClose} style={{ cursor: "pointer" }} />
        </Header>
        
        <Form onSubmit={handleSubmit}>
          {erro && <ErrorMessage>{erro}</ErrorMessage>}

          <div>
            <Label>Tipo de Movimentação</Label>
            <TipoMovimentacaoContainer>
              <TipoButton
                type="button"
                ativo={formData.tipo === "entrada"}
                cor="#28a745"
                onClick={() => setFormData({...formData, tipo: "entrada"})}
              >
                <TrendingUp size={20} />
                Entrada
              </TipoButton>
              <TipoButton
                type="button"
                ativo={formData.tipo === "saida"}
                cor="#dc3545"
                onClick={() => setFormData({...formData, tipo: "saida"})}
              >
                <TrendingDown size={20} />
                Saída
              </TipoButton>
            </TipoMovimentacaoContainer>
          </div>

          <div>
            <Label>Produto</Label>
            <Select
              value={formData.produto_id}
              onChange={(e) => setFormData({...formData, produto_id: e.target.value})}
              required
            >
              <option value="">Selecione um produto</option>
              {produtos.map(produto => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - {produto.categoria.nome}
                </option>
              ))}
            </Select>
          </div>

          {produtoSelecionado && (
            <EstoqueAtualInfo>
              <strong>Estoque atual:</strong> {produtoSelecionado.estoque_atual} unidades
              <br />
              <strong>Estoque mínimo:</strong> {produtoSelecionado.estoque_minimo} unidades
            </EstoqueAtualInfo>
          )}

          <div>
            <Label>Quantidade</Label>
            <Input
              type="number"
              min="1"
              value={formData.quantidade}
              onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
              required
            />
          </div>

          <div>
            <Label>Data e Hora</Label>
            <Input
              type="datetime-local"
              value={formData.data_movimentacao}
              onChange={(e) => setFormData({...formData, data_movimentacao: e.target.value})}
              required
            />
          </div>

          <div>
            <Label>Observações</Label>
            <TextArea
              placeholder="Adicione observações sobre esta movimentação..."
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
            />
          </div>
          
          <Button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Movimentação"}
          </Button>
        </Form>
      </Modal>
    </Overlay>
  );
}