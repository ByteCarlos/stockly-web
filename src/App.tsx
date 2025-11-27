import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Navbar from "./pages/Navbar/Navbar";
import Produtos from "./pages/Produtos/Produtos";
//import Categorias from "./pages/Categorias/Categorias";
import Movimentacoes from "./pages/Movimentacoes/Movimentacoes";
import Fornecedores from "./pages/Fornecedores/Fornecedores"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import Entradas from "./pages/Entradas/Entradas";

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
            {/*<Route path="/categorias" element={<Categorias token={token} />} />*/}
            <Route path="/fornecedores" element={<Fornecedores token={token} />} /> {/* Adicione esta linha */}
            <Route path="/movimentacoes" element={<Movimentacoes token={token} />} />
            <Route path="/entradas" element={<Entradas token={token} />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;