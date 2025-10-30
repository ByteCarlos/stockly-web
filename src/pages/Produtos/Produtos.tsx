import { useState } from "react";
import { Plus, Upload, Download, Edit, Trash2, Eye } from "lucide-react";
import "./Produtos.css";

interface ProdutosProps {
  token: string;
}

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  sku: string;
  categoria: string;
  estoque: number;
  preco: number;
  status: "ATIVO" | "INATIVO";
  fornecedor: string;
}

export default function Produtos({ token }: ProdutosProps) {
  const [produtos] = useState<Produto[]>([
    {
      id: 1,
      nome: "Notebook Dell Inspiron 15",
      descricao: "Notebook Dell Inspiron 15 com processador Intel i5",
      sku: "NBK-DEL-001",
      categoria: "Eletrônicos",
      estoque: 45,
      preco: 2499.9,
      status: "ATIVO",
      fornecedor: "Dell Brasil",
    },
    {
      id: 2,
      nome: "Mouse Logitech MX Master",
      descricao: "Mouse wireless ergonômico para produtividade",
      sku: "MOU-LOG-001",
      categoria: "Periféricos",
      estoque: 23,
      preco: 299.9,
      status: "ATIVO",
      fornecedor: "Logitech",
    },
    {
      id: 3,
      nome: "Teclado Mecânico Corsair K95",
      descricao: "Teclado mecânico RGB para gaming",
      sku: "TEC-COR-001",
      categoria: "Periféricos",
      estoque: 8,
      preco: 599.9,
      status: "ATIVO",
      fornecedor: "Corsair",
    },
    {
      id: 4,
      nome: 'Monitor LG 24" Full HD',
      descricao: "Monitor LED 24 polegadas Full HD IPS",
      sku: "MON-LG-001",
      categoria: "Monitores",
      estoque: 15,
      preco: 649.9,
      status: "ATIVO",
      fornecedor: "LG Electronics",
    },
  ]);

  const totalProdutos = produtos.length;
  const ativos = produtos.filter((p) => p.status === "ATIVO").length;
  const estoqueBaixo = produtos.filter((p) => p.estoque < 10).length;
  const valorTotal = produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0);

  return (
    <div className="produtos-container">
      <div className="produtos-header">
        <div>
          <h1>Produtos</h1>
          <p>Gerencie seu catálogo de produtos</p>
        </div>
        <div className="produtos-header-buttons">
          <button className="btn-secondary">
            <Download size={16} /> Exportar
          </button>
          <button className="btn-secondary">
            <Upload size={16} /> Importar
          </button>
          <button className="btn-primary">
            <Plus size={16} /> Novo Produto
          </button>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="produtos-cards">
        <div className="card">
          <p>Total de Produtos</p>
          <h2>{totalProdutos}</h2>
        </div>
        <div className="card">
          <p>Produtos Ativos</p>
          <h2>{ativos}</h2>
        </div>
        <div className="card">
          <p>Estoque Baixo</p>
          <h2>{estoqueBaixo}</h2>
        </div>
        <div className="card valor-total">
          <p>Valor Total</p>
          <h2>
            {valorTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>
        </div>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <input type="text" placeholder="Buscar produtos..." />
        <select>
          <option>Todos</option>
          <option>Ativos</option>
          <option>Inativos</option>
        </select>
        <select>
          <option>Todas as categorias</option>
          <option>Eletrônicos</option>
          <option>Periféricos</option>
          <option>Monitores</option>
        </select>
        <button className="btn-secondary">Limpar Filtros</button>
      </div>

      {/* Tabela */}
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>Produto</th>
            <th>SKU</th>
            <th>Categoria</th>
            <th>Estoque</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>
                <div className="produto-info">
                  <strong>{p.nome}</strong>
                  <p>{p.descricao}</p>
                </div>
              </td>
              <td>{p.sku}</td>
              <td>{p.categoria}</td>
              <td>
                <span
                  className={`estoque ${
                    p.estoque < 10 ? "baixo" : "normal"
                  }`}
                >
                  {p.estoque < 10 ? "BAIXO" : "NORMAL"}
                </span>
              </td>
              <td>
                {p.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>
                <span
                  className={`status ${p.status === "ATIVO" ? "ativo" : "inativo"}`}
                >
                  {p.status}
                </span>
              </td>
              <td>{p.fornecedor}</td>
              <td className="acoes">
                <Eye size={16} className="icon view" />
                <Edit size={16} className="icon edit" />
                <Trash2 size={16} className="icon delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
