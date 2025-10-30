import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Navbar from "./pages/Navbar/Navbar";
import Produtos from "./pages/Produtos/Produtos";
import Categorias from "./pages/Categorias/Categorias";
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes";
import Relatorios from "./pages/Relatorios/Relatorios";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="main">
        <Navbar onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard token={token} />} />
            <Route path="/produtos" element={<Produtos token={token} />} />
            <Route path="/categorias" element={<Categorias token={token} />} />
            <Route path="/movimentacoes" element={<Movimentacoes token={token} />} />
            <Route path="/relatorios" element={<Relatorios token={token} />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
