const API_URL = 'http://localhost:8000';

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
    return response.json();
  },

  // Produtos
  listarProdutos: async (busca = '', categoria_id = null) => {
    const token = localStorage.getItem('token');
    let url = `${API_URL}/produtos?`;
    if (busca) url += `busca=${busca}&`;
    if (categoria_id) url += `categoria_id=${categoria_id}`;
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
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
    return response.json();
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
    return response.json();
  },

  deletarProduto: async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Movimentações
  listarMovimentacoes: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/movimentacoes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
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
    return response.json();
  },

  // Categorias
  listarCategorias: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/categorias`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  },

  // Produtos com estoque baixo
  produtosEstoqueBaixo: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos-estoque-baixo`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  }
};