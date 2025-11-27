import { useState } from 'react';
import { TrendingUp, Calendar, DollarSign, Plus, Search, Eye, Edit, Trash2, Download, Upload, Package } from 'lucide-react';

interface EntradasProps {
  token: string;
}

interface Entrada {
  id: string;
  data: string;
  hora: string;
  fornecedor: string;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  status: 'concluida' | 'EM ANDAMENTO' | 'cancelada';
  notaFiscal: string;
}

// Interface para o estado inicial do formulário (FormData)
interface NewEntradaFormData {
  cliente: string;
  produto: string;
  quantidade: number | string;
  valorUnitario: number | string;
  notaFiscal: string;
}

export default function Entradas({ token: _token }: EntradasProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [fornecedorFilter, setFornecedorFilter] = useState('todos');
  const [showNewEntrada, setShowNewEntrada] = useState(false);

  // Estado para o formulário de nova saída (inicializado com valores vazios/default)
  const [formData, setFormData] = useState<NewEntradaFormData>({
    cliente: '',
    produto: '',
    quantidade: '', // Usando string para refletir o input type="number" (que retorna string) ou vazio
    valorUnitario: '', // Usando string para refletir o input type="text" ou vazio
    notaFiscal: '',
  });

  const [entradas] = useState<Entrada[]>([
    {
      id: 'ENT-001',
      data: '2024-11-27',
      hora: '14:30',
      fornecedor: 'Dell Brasil',
      produto: 'Notebook Dell Inspiron 15',
      quantidade: 50,
      valorUnitario: 2499.90,
      valorTotal: 124995.00,
      status: 'concluida',
      notaFiscal: 'NF-12345'
    },
    {
      id: 'ENT-002',
      data: '2024-11-27',
      hora: '11:15',
      fornecedor: 'Logitech',
      produto: 'Mouse Logitech MX Master',
      quantidade: 30,
      valorUnitario: 299.90,
      valorTotal: 8997.00,
      status: 'concluida',
      notaFiscal: 'NF-12346'
    },
    {
      id: 'ENT-003',
      data: '2024-11-26',
      hora: '16:45',
      fornecedor: 'Corsair',
      produto: 'Teclado Mecânico Corsair K95',
      quantidade: 25,
      valorUnitario: 599.90,
      valorTotal: 14997.50,
      status: 'concluida',
      notaFiscal: 'NF-12347'
    },
    {
      id: 'ENT-004',
      data: '2024-11-26',
      hora: '09:20',
      fornecedor: 'LG Electronics',
      produto: 'Monitor LG 24" Full HD',
      quantidade: 40,
      valorUnitario: 649.90,
      valorTotal: 25996.00,
      status: 'EM ANDAMENTO',
      notaFiscal: 'NF-12348'
    },
    {
      id: 'ENT-005',
      data: '2024-11-25',
      hora: '13:00',
      fornecedor: 'Dell Brasil',
      produto: 'Notebook Dell Inspiron 15',
      quantidade: 15,
      valorUnitario: 2499.90,
      valorTotal: 37498.50,
      status: 'cancelada',
      notaFiscal: 'NF-12349'
    }
  ]);

  const totalEntradas = 160;
  const entradasMes = 45;
  const valorTotalMes = 212483.00;
  const mediaDiaria = 6.2;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'concluida': return 'bg-green-100 text-green-700';
      case 'EM ANDAMENTO': return 'bg-yellow-100 text-yellow-700';
      case 'cancelada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'concluida': return 'CONCLUÍDA';
      case 'EM ANDAMENTO': return 'EM ANDAMENTO';
      case 'cancelada': return 'CANCELADA';
      default: return status.toUpperCase();
    }
  };

  const filteredEntradas = entradas.filter(entrada => {
    const matchSearch = entrada.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       entrada.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       entrada.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'todos' || entrada.status === statusFilter;
    const matchFornecedor = fornecedorFilter === 'todos' || entrada.fornecedor === fornecedorFilter;
    return matchSearch && matchStatus && matchFornecedor;
  });

  // Handler de submissão do formulário (NOVA FUNÇÃO ADICIONADA)
  const handleSubmit = () => {
    console.log('Nova Entrada Registrada:', formData);
    
    // Simulação de requisição à API
    // ... Lógica para calcular valorTotal e salvar a nova Saída ...
    
    setShowNewEntrada(false); // Fecha o modal
    
    // Resetar o formulário
    setFormData({
      cliente: '',
      produto: '',
      quantidade: '',
      valorUnitario: '',
      notaFiscal: '',
    });

    // Adiciona o alerta de sucesso na tela de entrada
    alert('Entrada salva com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Entradas</h1>
            <p className="text-gray-600">Gerencie as entradas de produtos no estoque</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
              <Download size={16} />
              Exportar
            </button>
            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
              <Upload size={16} />
              Importar
            </button>
            <button 
              onClick={() => setShowNewEntrada(true)}
              className="flex items-center gap-2 bg-[#23C55E] hover:bg-[#1fa04e] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              Nova Entrada
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Entradas</p>
                <h2 className="text-3xl font-bold text-gray-800">{totalEntradas}</h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#23C55E]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Entradas no Mês</p>
                <h2 className="text-3xl font-bold text-gray-800">{entradasMes}</h2>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor Total do Mês</p>
                <h2 className="text-3xl font-bold text-[#23C55E]">
                  {valorTotalMes.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </h2>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Média Diária</p>
                <h2 className="text-3xl font-bold text-gray-800">{mediaDiaria}</h2>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Buscar entradas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
              />
            </div>

            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
            >
              <option value="todos">Todos os status</option>
              <option value="concluida">Concluída</option>
              <option value="EM ANDAMENTO">EM ANDAMENTO</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <select 
              value={fornecedorFilter}
              onChange={(e) => setFornecedorFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
            >
              <option value="todos">Todos os fornecedores</option>
              <option value="Dell Brasil">Dell Brasil</option>
              <option value="Logitech">Logitech</option>
              <option value="Corsair">Corsair</option>
              <option value="LG Electronics">LG Electronics</option>
            </select>

            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('todos');
                setFornecedorFilter('todos');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Data/Hora</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fornecedor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Quantidade</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nota Fiscal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntradas.map((entrada) => (
                  <tr key={entrada.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{entrada.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-800">
                        {new Date(entrada.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-gray-500">{entrada.hora}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{entrada.fornecedor}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{entrada.produto}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{entrada.quantidade}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                      {entrada.valorTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{entrada.notaFiscal}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(entrada.status)}`}>
                        {getStatusText(entrada.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-[#26a69a] p-1 rounded transition-colors" title="Visualizar">
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-[#26a69a] p-1 rounded transition-colors" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-[#26a69a] p-1 rounded transition-colors" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Nova Entrada */}
      {showNewEntrada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Entrada</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fornecedor</label>
                  <select className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]">
                    <option>Selecione um fornecedor</option>
                    <option>Dell Brasil</option>
                    <option>Logitech</option>
                    <option>Corsair</option>
                    <option>LG Electronics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
                  <select className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]">
                    <option>Selecione um produto</option>
                    <option>Notebook Dell Inspiron 15</option>
                    <option>Mouse Logitech MX Master</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
                  <input 
                    type="number" 
                    className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Unitário</label>
                  <input 
                    type="text" 
                    className=" text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nota Fiscal</label>
                <input 
                  type="text" 
                  className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowNewEntrada(false)}
                  className="text-red-600 bg-red-200 flex-1 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  CANCELAR
                </button>
                <button 
                onClick={handleSubmit}
                className="flex-1 px-6 py-2 bg-[#23C55E] text-white rounded-lg hover:bg-[#1fa04e] transition-colors">
                  Salvar Entrada
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}