import { useState } from "react";
import { Plus, Upload, Download, Edit, Trash2, Eye, Package, X } from "lucide-react";

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

interface NovoProdutoForm {
  nome: string;
  descricao: string;
  sku: string;
  categoria: string;
  estoque: string;
  preco: string;
  status: string;
  fornecedor: string;
}

export default function Produtos({ token: _token }: ProdutosProps) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<NovoProdutoForm>({
    nome: '',
    descricao: '',
    sku: '',
    categoria: '',
    estoque: '',
    preco: '',
    status: 'ATIVO',
    fornecedor: ''
  });

  const [produtos] = useState<Produto[]>([
    {
      id: 1,
      nome: "Notebook Dell Inspiron 15",
      descricao: "Notebook Dell Inspiron 15 com processador Intel i5",
      sku: "NBK-DEL-001",
      categoria: "Eletrônicos",
      estoque: 2,
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
      estoque: 8,
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

  const getEstoqueStatus = (estoque: number) => {
    if (estoque < 10) return { label: "BAIXO", class: "bg-red-100 text-red-700" };
    return { label: "NORMAL", class: "bg-green-100 text-green-700" };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Novo produto:', formData);
    // Aqui você faria a requisição para a API com o token
    setShowModal(false);
    // Limpar formulário
    setFormData({
      nome: '',
      descricao: '',
      sku: '',
      categoria: '',
      estoque: '',
      preco: '',
      status: 'ATIVO',
      fornecedor: ''
    });
    
    // Simulando notificação de sucesso
    alert('Produto salvo com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Produtos</h1>
            <p className="text-gray-600">Gerencie seu catálogo de produtos</p>
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
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#23C55E] hover:bg-[#1fa04e] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              Novo Produto
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Produtos</p>
                <h2 className="text-3xl font-bold text-gray-800">{totalProdutos}</h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Produtos Ativos</p>
                <h2 className="text-3xl font-bold text-gray-800">{ativos}</h2>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estoque Baixo</p>
                <h2 className="text-3xl font-bold text-gray-800">{estoqueBaixo}</h2>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                <h2 className="text-3xl font-bold text-[#23C55E]">
                  {valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h2>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
            />
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]">
              <option>Todos</option>
              <option>Ativos</option>
              <option>Inativos</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]">
              <option>Todas as categorias</option>
              <option>Eletrônicos</option>
              <option>Periféricos</option>
              <option>Monitores</option>
            </select>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">SKU</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Categoria</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Estoque</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Preço</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fornecedor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => {
                  const estoqueStatus = getEstoqueStatus(p.estoque);
                  return (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{p.nome}</p>
                          <p className="text-xs text-gray-500">{p.descricao}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">{p.sku}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{p.categoria}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">{p.estoque}</span>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${estoqueStatus.class}`}>
                            {estoqueStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800">
                        {p.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            p.status === "ATIVO"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">{p.fornecedor}</td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Novo Produto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Novo Produto</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulário */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome do Produto */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full text-black bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: Notebook Dell Inspiron 15"
                  />
                </div>

                {/* Descrição */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Produto
                  </label>
                  <textarea
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border text-black bg-white border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Descreva o produto..."
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full border text-black bg-white border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: NBK-DEL-001"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Acessórios">Acessórios</option>
                  </select>
                </div>

                {/* Estoque */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estoque *
                  </label>
                  <input
                    type="number"
                    name="estoque"
                    value={formData.estoque}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border text-black bg-white border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço (R$) *
                  </label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full border text-black bg-white border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0,00"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="INATIVO">Inativo</option>
                  </select>
                </div>

                {/* Fornecedor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fornecedor *
                  </label>
                  <input
                    type="text"
                    name="fornecedor"
                    value={formData.fornecedor}
                    onChange={handleInputChange}
                    className="w-full border text-black bg-white border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: Dell Brasil"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Salvar Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}