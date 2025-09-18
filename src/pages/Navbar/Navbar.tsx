import { Link } from "react-router-dom";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/produtos">Produtos</Link></li>
        <li><Link to="/categorias">Categorias</Link></li>
        <li><Link to="/movimentacoes">Movimentações</Link></li>
        <li><Link to="/relatorios">Relatórios</Link></li>
      </ul>
      <button onClick={onLogout}>Sair</button>
    </nav>
  );
}
