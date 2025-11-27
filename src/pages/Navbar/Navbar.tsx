//Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Folder,
  Truck,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import "./Navbar.css";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const location = useLocation();

  const menuItems = [
    {
      section: "GERENCIAMENTO",
      items: [
        { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/produtos", label: "Produtos", icon: <Package size={18} /> },
        { to: "/categorias", label: "Categorias", icon: <Folder size={18} /> },
        { to: "/Fornecedores", label: "Fornecedores", icon: <Truck size={18} /> },
      ],
    },
    {
      section: "MOVIMENTAÇÃO",
      items: [
        { to: "/entradas", label: "Entradas", icon: <ArrowDownCircle size={18} /> },
        { to: "/saidas", label: "Saídas", icon: <ArrowUpCircle size={18} /> },
      ],
    },
    {
      section: "ADMINISTRAÇÃO",
      items: [
        { to: "/usuarios", label: "Usuários", icon: <Users size={18} /> },
        { to: "/logs", label: "Logs de Atividades", icon: <FileText size={18} /> },
      ],
    },
  ];

  return (
    <aside className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo">
          <Package size={26} className="navbar-icon" />
          <div className="navbar-title">
            <h1>Stockly</h1>
            <p>Sistema Integrado de Produtos</p>
          </div>
        </div>

        <nav className="navbar-menu">
          {menuItems.map((group) => (
            <div key={group.section} className="menu-section">
              <p className="menu-title">{group.section}</p>
              <ul>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`menu-link ${isActive ? "active" : ""}`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="navbar-bottom">
        <Link
          to="/configuracoes"
          className={`menu-link ${
            location.pathname === "/configuracoes" ? "active" : ""
          }`}
        >
          <Settings size={18} />
          <span>Configurações</span>
        </Link>

        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
