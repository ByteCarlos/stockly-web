import { useState } from 'react';
import { TrendingDown, Calendar, DollarSign, Plus, Search, Eye, Edit, Trash2, Download, Upload, Package } from 'lucide-react';

interface SaidasProps {
  token: string;
}

interface Saida {
  id: string;
  data: string;
  hora: string;
  cliente: string;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  status: 'concluida' | 'pendente' | 'cancelada';
  notaFiscal: string;
}

// Interface para o estado inicial do formulário (FormData)
interface NewSaidaFormData {
  cliente: string;
  produto: string;
  quantidade: number | string;
  valorUnitario: number | string;
  notaFiscal: string;
}

export default function Saidas({ token: _token }: SaidasProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [clienteFilter, setClienteFilter] = useState('todos');
  const [showNewSaida, setShowNewSaida] = useState(false);

  // Estado para o formulário de nova saída (inicializado com valores vazios/default)
  const [formData, setFormData] = useState<NewSaidaFormData>({
    cliente: '',
    produto: '',
    quantidade: '', // Usando string para refletir o input type="number" (que retorna string) ou vazio
    valorUnitario: '', // Usando string para refletir o input type="text" ou vazio
    notaFiscal: '',
  });

  const [saidas] = useState<Saida[]>([
    {
      id: 'SAI-001',
      data: '2024-11-27',
      hora: '15:45',
      cliente: 'Tech Solutions Ltda',
      produto: 'Notebook Dell Inspiron 15',
      quantidade: 10,
      valorUnitario: 2499.90,
      valorTotal: 24999.00,
      status: 'concluida',
      notaFiscal: 'NF-54321'
    },
    {
      id: 'SAI-002',
      data: '2024-11-27',
      hora: '13:20',
      cliente: 'Empresa ABC',
      produto: 'Mouse Logitech MX Master',
      quantidade: 15,
      valorUnitario: 299.90,
      valorTotal: 4498.50,
      status: 'concluida',
      notaFiscal: 'NF-54322'
    },
    {
      id: 'SAI-003',
      data: '2024-11-26',
      hora: '17:30',
      cliente: 'Distribuidora XYZ',
      produto: 'Teclado Mecânico Corsair K95',
      quantidade: 8,
      valorUnitario: 599.90,
      valorTotal: 4799.20,
      status: 'concluida',
      notaFiscal: 'NF-54323'
    },
    {
      id: 'SAI-004',
      data: '2024-11-26',
      hora: '10:15',
      cliente: 'Tech Solutions Ltda',
      produto: 'Monitor LG 24" Full HD',
      quantidade: 12,
      valorUnitario: 649.90,
      valorTotal: 7798.80,
      status: 'pendente',
      notaFiscal: 'NF-54324'
    },
    {
      id: 'SAI-005',
      data: '2024-11-25',
      hora: '14:50',
      cliente: 'Varejo Digital',
      produto: 'Mouse Logitech MX Master',
      quantidade: 20,
      valorUnitario: 299.90,
      valorTotal: 5998.00,
      status: 'cancelada',
      notaFiscal: 'NF-54325'
    }
  ]);

  const totalSaidas = 145;
  const saidasMes = 38;
  const valorTotalMes = 189320.50;
  const mediaDiaria = 5.4;

  // Handler genérico para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler de submissão do formulário (NOVA FUNÇÃO ADICIONADA)
  const handleSubmit = () => {
    console.log('Nova Saída Registrada:', formData);
    
    // Simulação de requisição à API
    // ... Lógica para calcular valorTotal e salvar a nova Saída ...
    
    setShowNewSaida(false); // Fecha o modal
    
    // Resetar o formulário
    setFormData({
      cliente: '',
      produto: '',
      quantidade: '',
      valorUnitario: '',
      notaFiscal: '',
    });

    // Adiciona o alerta de sucesso na tela de entrada
    alert('Saída salva com sucesso!');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'concluida': return 'bg-green-100 text-green-700';
      case 'pendente': return 'bg-yellow-100 text-yellow-700';
      case 'cancelada': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'concluida': return 'CONCLUÍDA';
      case 'pendente': return 'PENDENTE';
      case 'cancelada': return 'CANCELADA';
      default: return status.toUpperCase();
    }
  };

  const filteredSaidas = saidas.filter(saida => {
    const matchSearch = saida.produto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       saida.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       saida.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'todos' || saida.status === statusFilter;
    const matchCliente = clienteFilter === 'todos' || saida.cliente === clienteFilter;
    return matchSearch && matchStatus && matchCliente;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Saídas</h1>
            <p className="text-gray-600">Gerencie as saídas de produtos do estoque</p>
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
              onClick={() => {
                setShowNewSaida(true);
                // Opcional: Limpar o form ao abrir, caso o estado não esteja limpo
                setFormData({
                  cliente: '',
                  produto: '',
                  quantidade: '',
                  valorUnitario: '',
                  notaFiscal: '',
                });
              }}
              className="flex items-center gap-2 bg-[#23C55E] hover:bg-[#1fa04e] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              Nova Saída
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Saídas</p>
                <h2 className="text-3xl font-bold text-gray-800">{totalSaidas}</h2>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#23C55E]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Saídas no Mês</p>
                <h2 className="text-3xl font-bold text-gray-800">{saidasMes}</h2>
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
                <TrendingDown className="w-6 h-6 text-orange-600" />
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
                placeholder="Buscar saídas..."
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
              <option value="pendente">Pendente</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <select 
              value={clienteFilter}
              onChange={(e) => setClienteFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
            >
              <option value="todos">Todos os clientes</option>
              <option value="Tech Solutions Ltda">Tech Solutions Ltda</option>
              <option value="Empresa ABC">Empresa ABC</option>
              <option value="Distribuidora XYZ">Distribuidora XYZ</option>
              <option value="Varejo Digital">Varejo Digital</option>
            </select>

            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('todos');
                setClienteFilter('todos');
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Quantidade</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Valor Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Nota Fiscal</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredSaidas.map((saida) => (
                  <tr key={saida.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{saida.id}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-800">
                        {new Date(saida.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-gray-500">{saida.hora}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{saida.cliente}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{saida.produto}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800">{saida.quantidade}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                      {saida.valorTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{saida.notaFiscal}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(saida.status)}`}>
                        {getStatusText(saida.status)}
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

      {/* Modal Nova Saída */}
      {showNewSaida && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Saída</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                  <select 
                    name="cliente" // Adicionado name
                    value={formData.cliente} // Adicionado value
                    onChange={handleInputChange} // Adicionado onChange
                    className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                  >
                    <option value="">Selecione um cliente</option>
                    <option value="Tech Solutions Ltda">Tech Solutions Ltda</option>
                    <option value="Empresa ABC">Empresa ABC</option>
                    <option value="Distribuidora XYZ">Distribuidora XYZ</option>
                    <option value="Varejo Digital">Varejo Digital</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
                  <select 
                    name="produto" // Adicionado name
                    value={formData.produto} // Adicionado value
                    onChange={handleInputChange} // Adicionado onChange
                    className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                  >
                    <option value="">Selecione um produto</option>
                    <option value="Notebook Dell Inspiron 15">Notebook Dell Inspiron 15</option>
                    <option value="Mouse Logitech MX Master">Mouse Logitech MX Master</option>
                    <option value="Teclado Mecânico Corsair K95">Teclado Mecânico Corsair K95</option>
                    <option value="Monitor LG 24&quot; Full HD">Monitor LG 24" Full HD</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
                  <input 
                    type="number" 
                    name="quantidade" // Adicionado name
                    value={formData.quantidade} // Adicionado value
                    onChange={handleInputChange} // Adicionado onChange
                    className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Unitário</label>
                  <input 
                    type="text" 
                    name="valorUnitario" // Adicionado name
                    value={formData.valorUnitario} // Adicionado value
                    onChange={handleInputChange} // Adicionado onChange
                    className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nota Fiscal</label>
                <input 
                  type="text" 
                  name="notaFiscal" // Adicionado name
                  value={formData.notaFiscal} // Adicionado value
                  onChange={handleInputChange} // Adicionado onChange
                  className="text-black bg-white w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23C55E]" 
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button 
                  onClick={() => setShowNewSaida(false)}
                  className="text-red-600 bg-red-200 flex-1 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  CANCELAR
                </button>
                <button 
                  onClick={handleSubmit} // Chamada para a nova função de submissão
                  className="flex-1 px-6 py-2 bg-[#23C55E] text-white rounded-lg hover:bg-[#1fa04e] transition-colors"
                >
                  Salvar Saída
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}