import { useState } from "react";
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

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #4171c9;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #365ba8;
  }
`;

export function ModalProduto({ onClose, onSalvar, produto = null }) {
  const [formData, setFormData] = useState(produto || {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{produto ? "Editar Produto" : "Novo Produto"}</h2>
          <X onClick={onClose} style={{ cursor: "pointer" }} />
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required
          />
          
          <Input
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
          />
          
          <Select
            value={formData.categoria_id}
            onChange={(e) => setFormData({...formData, categoria_id: parseInt(e.target.value)})}
          >
            <option value={1}>Smartphone</option>
            <option value={2}>Notebook</option>
            <option value={3}>Smart TV</option>
          </Select>
          
          <Input
            type="number"
            placeholder="Estoque atual"
            value={formData.estoque_atual}
            onChange={(e) => setFormData({...formData, estoque_atual: parseInt(e.target.value)})}
            required
          />
          
          <Input
            type="number"
            placeholder="Estoque mínimo"
            value={formData.estoque_minimo}
            onChange={(e) => setFormData({...formData, estoque_minimo: parseInt(e.target.value)})}
            required
          />
          
          <Input
            placeholder="Tela (ex: 2796 x 1290)"
            value={formData.tela}
            onChange={(e) => setFormData({...formData, tela: e.target.value})}
          />
          
          <Input
            placeholder="Armazenamento (ex: 256GB)"
            value={formData.armazenamento}
            onChange={(e) => setFormData({...formData, armazenamento: e.target.value})}
          />
          
          <Input
            placeholder="RAM (ex: 8GB)"
            value={formData.ram}
            onChange={(e) => setFormData({...formData, ram: e.target.value})}
          />
          
          <Input
            placeholder="Tensão (ex: 110-220V)"
            value={formData.tensao}
            onChange={(e) => setFormData({...formData, tensao: e.target.value})}
          />
          
          <Button type="submit">
            {produto ? "Atualizar" : "Cadastrar"}
          </Button>
        </Form>
      </Modal>
    </Overlay>
  );
}