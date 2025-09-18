export interface Categoria {
  id: number;
  nome: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  categoria: Categoria;
}

export interface Movimentacao {
  id: number;
  produtoId: number;
  quantidade: number;
  tipo: "ENTRADA" | "SAIDA" | "AJUSTE";
  observacao?: string;
  data: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
