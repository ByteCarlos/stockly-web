import React, { useState } from 'react';
import { Package, FileText, AlertCircle, TrendingUp, Plus, BarChart3 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: 'NORMAL' | 'BAIXO' | 'CRITICO' | 'ALTO';
  lastUpdate: string;
}

interface StockAlert {
  id: number;
  name: string;
  category: string;
  quantity: number;
  minimum: number;
  status: 'Crítico' | 'Baixo';
}

interface DashboardProps {
  token: string;
}

const Dashboard: React.FC<DashboardProps> = ({ token: _token }) => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Notebook Dell Inspiron',
      category: 'Eletrônicos',
      stock: 45,
      price: 2499.90,
      status: 'NORMAL',
      lastUpdate: 'Hoje, 14:30'
    },
    {
      id: 2,
      name: 'Mouse Wireless',
      category: 'Periféricos',
      stock: 8,
      price: 89.90,
      status: 'BAIXO',
      lastUpdate: 'Hoje, 12:15'
    },
    {
      id: 3,
      name: 'Teclado Mecânico',
      category: 'Periféricos',
      stock: 156,
      price: 299.90,
      status: 'ALTO',
      lastUpdate: 'Ontem, 16:45'
    },
    {
      id: 4,
      name: 'Monitor 24" Full HD',
      category: 'Monitores',
      stock: 23,
      price: 649.90,
      status: 'NORMAL',
      lastUpdate: 'Ontem, 10:20'
    },
    {
      id: 5,
      name: 'Webcam HD',
      category: 'Periféricos',
      stock: 3,
      price: 159.90,
      status: 'CRITICO',
      lastUpdate: '25/09, 09:30'
    }
  ]);

  const [alerts] = useState<StockAlert[]>([
    {
      id: 1,
      name: 'Notebook Dell Inspiron 15',
      category: 'Eletrônicos',
      quantity: 2,
      minimum: 5,
      status: 'Crítico'
    },
    {
      id: 2,
      name: 'Mouse Logitech MX',
      category: 'Acessórios',
      quantity: 8,
      minimum: 15,
      status: 'Baixo'
    },
    {
      id: 3,
      name: 'Monitor LG 24"',
      category: 'Eletrônicos',
      quantity: 3,
      minimum: 10,
      status: 'Baixo'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NORMAL':
        return 'bg-green-100 text-green-700';
      case 'BAIXO':
        return 'bg-yellow-100 text-yellow-700';
      case 'CRITICO':
        return 'bg-red-100 text-red-700';
      case 'ALTO':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <p className="text-gray-600">Visão geral do seu estoque</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-800">1,247</p>
                <p className="text-sm text-gray-600 font-medium">TOTAL DE PRODUTOS</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Ver lista de produtos →</a>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-800">89</p>
                <p className="text-sm text-gray-600 font-medium">CATEGORIAS</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-800">23</p>
                <p className="text-sm text-gray-600 font-medium">ESTOQUE BAIXO</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-3xl font-bold text-gray-800">R$ 45.230</p>
                <p className="text-sm text-gray-600 font-medium">VALOR TOTAL</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <p>Estoque Total: R$ 1417,25</p>
              <p>Margem de Lucro: 63,53%</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Movimentações dos Últimos 7 Dias</h2>
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Gráfico de movimentações</p>
                <p className="text-sm text-gray-400">Entradas vs Saídas</p>
              </div>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h2 className="text-lg font-semibold text-gray-800">Alertas de Estoque</h2>
            </div>
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="bg-gray-50 p-2 rounded">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{alert.name}</p>
                    <p className="text-xs text-gray-500">{alert.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 text-sm">{alert.quantity} unidades</p>
                    <p className="text-xs text-gray-500">Mín: {alert.minimum}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                      alert.status === 'Crítico' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Products Table */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Produtos Recentes</h2>
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categoria</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estoque</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Preço</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-800">{product.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{product.category}</td>
                    <td className="py-4 px-4 text-sm text-gray-800 font-medium">{product.stock}</td>
                    <td className="py-4 px-4 text-sm text-gray-800 font-medium">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{product.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
