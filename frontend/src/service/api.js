const API_URL = 'http://localhost:8000';

// Função auxiliar para tratar erros
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Erro ${response.status}: ${response.statusText}`);
  }
  
  // Se for 204 No Content, retornar null
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

export const api = {
  // Autenticação
  login: async (email, senha) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', senha);
    
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse(response);
  },

  // Produtos
  listarProdutos: async (busca = '', categoria_id = null) => {
    const token = localStorage.getItem('token');
    let url = `${API_URL}/produtos?`;
    if (busca) url += `busca=${encodeURIComponent(busca)}&`;
    if (categoria_id) url += `categoria_id=${categoria_id}`;
    
    const response = await fetch(url, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  obterProduto: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  criarProduto: async (produto) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(produto)
    });
    return handleResponse(response);
  },

  atualizarProduto: async (id, produto) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(produto)
    });
    return handleResponse(response);
  },

  deletarProduto: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Movimentações
  listarMovimentacoes: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/movimentacoes`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  criarMovimentacao: async (movimentacao) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/movimentacoes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(movimentacao)
    });
    return handleResponse(response);
  },

  // Categorias
  listarCategorias: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/categorias`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Produtos com estoque baixo
  produtosEstoqueBaixo: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos-estoque-baixo`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  }
};