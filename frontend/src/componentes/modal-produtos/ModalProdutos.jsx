import { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "lucide-react";

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

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.3rem;
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

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export function ModalProduto({ onClose, onSalvar, produto = null }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria_id: 1,
    estoque_atual: 0,
    estoque_minimo: 0,
    tela: "",
    armazenamento: "",
    ram: "",
    tensao: ""
  });
  const [loading, setLoading] = useState(false);

  // Carregar dados do produto ao abrir modal para edição
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        categoria_id: produto.categoria_id || 1,
        estoque_atual: produto.estoque_atual || 0,
        estoque_minimo: produto.estoque_minimo || 0,
        tela: produto.tela || "",
        armazenamento: produto.armazenamento || "",
        ram: produto.ram || "",
        tensao: produto.tensao || ""
      });
    }
  }, [produto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Converter valores numéricos
      const dadosParaSalvar = {
        ...formData,
        categoria_id: parseInt(formData.categoria_id),
        estoque_atual: parseInt(formData.estoque_atual),
        estoque_minimo: parseInt(formData.estoque_minimo)
      };

      await onSalvar(dadosParaSalvar);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{produto ? "Editar Produto" : "Novo Produto"}</h2>
          <X onClick={onClose} style={{ cursor: "pointer" }} />
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Nome do Produto *</Label>
            <Input
              placeholder="Nome do produto"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Descrição</Label>
            <TextArea
              placeholder="Descrição do produto"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Categoria *</Label>
            <Select
              value={formData.categoria_id}
              onChange={(e) => setFormData({...formData, categoria_id: parseInt(e.target.value)})}
              required
            >
              <option value={1}>Smartphone</option>
              <option value={2}>Notebook</option>
              <option value={3}>Smart TV</option>
            </Select>
          </InputGroup>
          
          <InputGroup>
            <Label>Estoque Atual *</Label>
            <Input
              type="number"
              min="0"
              placeholder="Quantidade em estoque"
              value={formData.estoque_atual}
              onChange={(e) => setFormData({...formData, estoque_atual: e.target.value})}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Estoque Mínimo *</Label>
            <Input
              type="number"
              min="0"
              placeholder="Quantidade mínima"
              value={formData.estoque_minimo}
              onChange={(e) => setFormData({...formData, estoque_minimo: e.target.value})}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Tela</Label>
            <Input
              placeholder="ex: 2796 x 1290"
              value={formData.tela}
              onChange={(e) => setFormData({...formData, tela: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Armazenamento</Label>
            <Input
              placeholder="ex: 256GB"
              value={formData.armazenamento}
              onChange={(e) => setFormData({...formData, armazenamento: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>RAM</Label>
            <Input
              placeholder="ex: 8GB"
              value={formData.ram}
              onChange={(e) => setFormData({...formData, ram: e.target.value})}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Tensão</Label>
            <Input
              placeholder="ex: 110-220V"
              value={formData.tensao}
              onChange={(e) => setFormData({...formData, tensao: e.target.value})}
            />
          </InputGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : (produto ? "Atualizar Produto" : "Cadastrar Produto")}
          </Button>
        </Form>
      </Modal>
    </Overlay>
  );
}