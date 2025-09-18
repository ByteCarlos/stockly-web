import { useEffect, useState } from "react";
import type { Produto } from "../../types/models";

interface ProdutosProps {
  token: string;
}

export default function Produtos({ token }: ProdutosProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/produtos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProdutos(data);
    };
    fetchProdutos();
  }, [token]);

  return (
    <div>
      <h2>Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Qtd. Estoque</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>{p.quantidadeEstoque}</td>
              <td>{p.categoria?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
