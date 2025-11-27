import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Phone, Mail, Building2 } from "lucide-react";

interface FornecedoresProps {
  token: string;
}

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  razaoSocial: string;
  email: string;
  telefone: string;
  celular: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  nomeContato: string;
  cargoContato: string;
  categorias: string[];
  status: "ATIVO" | "INATIVO";
  prazoEntrega: string;
  condicaoPagamento: string;
}

export default function Fornecedores({ token: _token }: FornecedoresProps) {
  const [fornecedores] = useState<Fornecedor[]>([
    {
      id: 1,
      nome: "Dell Brasil",
      cnpj: "72.381.189/0001-10",
      razaoSocial: "Dell Computadores do Brasil Ltda",
      email: "comercial@dell.com.br",
      telefone: "(11) 3555-4000",
      celular: "(11) 98765-4321",
      endereco: "Av. Industrial Belgraf, 400",
      cidade: "Eldorado do Sul",
      estado: "RS",
      cep: "92990-000",
      nomeContato: "Carlos Silva",
      cargoContato: "Gerente Comercial",
      categorias: ["Eletrônicos", "Notebooks", "Computadores"],
      status: "ATIVO",
      prazoEntrega: "15 dias",
      condicaoPagamento: "30/60 dias",
    },
    {
      id: 2,
      nome: "Logitech",
      cnpj: "45.987.234/0001-88",
      razaoSocial: "Logitech Periféricos Ltda",
      email: "vendas@logitech.com.br",
      telefone: "(11) 4002-8922",
      celular: "(11) 99876-5432",
      endereco: "Rua Verbo Divino, 1488",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04719-002",
      nomeContato: "Mariana Costa",
      cargoContato: "Supervisora de Vendas",
      categorias: ["Periféricos", "Mouse", "Teclados"],
      status: "ATIVO",
      prazoEntrega: "10 dias",
      condicaoPagamento: "30 dias",
    },
    {
      id: 3,
      nome: "Corsair",
      cnpj: "33.456.789/0001-22",
      razaoSocial: "Corsair Gaming Brasil Ltda",
      email: "contato@corsair.com.br",
      telefone: "(21) 3500-2000",
      celular: "(21) 97654-3210",
      endereco: "Av. das Américas, 3434",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      cep: "22640-102",
      nomeContato: "Roberto Alves",
      cargoContato: "Diretor de Vendas",
      categorias: ["Periféricos", "Gaming", "Componentes"],
      status: "ATIVO",
      prazoEntrega: "20 dias",
      condicaoPagamento: "45 dias",
    },
    {
      id: 4,
      nome: "LG Electronics",
      cnpj: "01.166.372/0001-55",
      razaoSocial: "LG Electronics do Brasil Ltda",
      email: "b2b@lg.com.br",
      telefone: "(11) 3526-3000",
      celular: "(11) 96543-2109",
      endereco: "Rua do Rocio, 109",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04552-000",
      nomeContato: "Patricia Lima",
      cargoContato: "Gerente de Contas",
      categorias: ["Monitores", "TVs", "Eletrônicos"],
      status: "ATIVO",
      prazoEntrega: "12 dias",
      condicaoPagamento: "30/60 dias",
    },
    {
      id: 5,
      nome: "HP Brasil",
      cnpj: "61.797.924/0001-40",
      razaoSocial: "HP Brasil Indústria e Comércio Ltda",
      email: "vendas.corporativas@hp.com",
      telefone: "(11) 3747-7799",
      celular: "(11) 95432-1098",
      endereco: "Av. Presidente Juscelino Kubitschek, 1726",
      cidade: "São Paulo",
      estado: "SP",
      cep: "04543-000",
      nomeContato: "Fernando Santos",
      cargoContato: "Executivo de Vendas",
      categorias: ["Eletrônicos", "Impressoras", "Notebooks"],
      status: "ATIVO",
      prazoEntrega: "18 dias",
      condicaoPagamento: "45/60 dias",
    },
    {
      id: 6,
      nome: "Samsung Brasil",
      cnpj: "00.280.273/0001-37",
      razaoSocial: "Samsung Eletrônica da Amazônia Ltda",
      email: "comercial.b2b@samsung.com.br",
      telefone: "(92) 2126-5000",
      celular: "(92) 94321-0987",
      endereco: "Av. das Nações Unidas, 14171",
      cidade: "Manaus",
      estado: "AM",
      cep: "69067-000",
      nomeContato: "Julia Ferreira",
      cargoContato: "Coordenadora Comercial",
      categorias: ["Eletrônicos", "Monitores", "TVs"],
      status: "ATIVO",
      prazoEntrega: "14 dias",
      condicaoPagamento: "30 dias",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  // CORREÇÃO 1: Declaração do estado do formulário (formData)
  const [formData, setFormData] = useState<Fornecedor>({
    id: 0,
    nome: '',
    cnpj: '',
    razaoSocial: '',
    email: '',
    telefone: '',
    celular: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    nomeContato: '',
    cargoContato: '',
    categorias: [],
    status: "ATIVO",
    prazoEntrega: '',
    condicaoPagamento: '',
  });

  const totalFornecedores = fornecedores.length;
  const ativos = fornecedores.filter((f) => f.status === "ATIVO").length;
  const inativos = fornecedores.filter((f) => f.status === "INATIVO").length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Lógica específica para o campo 'categorias', convertendo string para array
    if (name === 'categorias') {
      const categoriesArray = value.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0);
      setFormData(prev => ({ ...prev, [name]: categoriesArray }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log('Novo Fornecedor:', formData);
    // Aqui você faria a requisição para a API com o token
    setShowModal(false);
    
    // CORREÇÃO 2: Limpar formulário com os campos corretos
    setFormData({
      id: 0,
      nome: '',
      cnpj: '',
      razaoSocial: '',
      email: '',
      telefone: '',
      celular: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      nomeContato: '',
      cargoContato: '',
      categorias: [],
      status: 'ATIVO',
      prazoEntrega: '',
      condicaoPagamento: '',
    });
    
    // Simulando notificação de sucesso
    alert('Fornecedor salvo com sucesso!');
  }; // CORREÇÃO ESTRUTURAL: Fechar handleSubmit aqui

  // CORREÇÃO ESTRUTURAL: Início do return do componente
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fornecedores</h1>
            <p className="text-gray-600">Gerencie seus fornecedores e contatos</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#23C55E] hover:bg-[#1fa04e] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              Novo Fornecedor
            </button>
          </div>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de Fornecedores</p>
                <h2 className="text-3xl font-bold text-gray-800">{totalFornecedores}</h2>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Fornecedores Ativos</p>
                <h2 className="text-3xl font-bold text-gray-800">{ativos}</h2>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Fornecedores Inativos</p>
                <h2 className="text-3xl font-bold text-gray-800">{inativos}</h2>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <Building2 className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar fornecedores..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
            />
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#23C55E]">
              <option>Todos os status</option>
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

        {/* Cards de Fornecedores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fornecedores.map((f) => (
            <div key={f.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Header do Card */}
              <div className="bg-gradient-to-r from-[#23C55E] to-[#1fa04e] p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{f.nome}</h3>
                    <p className="text-sm text-white/90">{f.razaoSocial}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      f.status === "ATIVO"
                        ? "bg-white/20 text-white"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6 space-y-4">
                {/* Informações Principais */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CNPJ</p>
                    <p className="text-sm font-medium text-gray-800">{f.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Categorias</p>
                    <div className="flex flex-wrap gap-1">
                      {f.categorias.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {cat}
                        </span>
                      ))}
                      {f.categorias.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{f.categorias.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">CONTATO PRINCIPAL</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">
                          {f.nomeContato.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{f.nomeContato}</p>
                        <p className="text-xs text-gray-500">{f.cargoContato}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={14} className="text-gray-400" />
                      <a href={`mailto:${f.email}`} className="hover:text-[#23C55E] transition-colors">
                        {f.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        <span>{f.telefone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        <span>{f.celular}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2 font-semibold">ENDEREÇO</p>
                  <p className="text-sm text-gray-700">{f.endereco}</p>
                  <p className="text-sm text-gray-700">{f.cidade} - {f.estado}, CEP: {f.cep}</p>
                </div>

                {/* Condições Comerciais */}
                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Prazo de Entrega</p>
                    <p className="text-sm font-medium text-gray-800">{f.prazoEntrega}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Condição de Pagamento</p>
                    <p className="text-sm font-medium text-gray-800">{f.condicaoPagamento}</p>
                  </div>
                </div>
              </div>

              {/* Footer com ações */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
                <button className="text-gray-400 hover:text-[#23C55E] p-2 rounded transition-colors" title="Visualizar">
                  <Eye size={18} />
                </button>
                <button className="text-gray-400 hover:text-[#23C55E] p-2 rounded transition-colors" title="Editar">
                  <Edit size={18} />
                </button>
                <button className="text-gray-400 hover:text-red-600 p-2 rounded transition-colors" title="Excluir">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Novo Fornecedor */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header do Modal */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">Novo Fornecedor</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    // CORREÇÃO: Ajuste de classes para o botão de fechar
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors" 
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Informações Básicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Fornecedor *
                      </label>
                      <input
                        type="text"
                        name="nome" // CORREÇÃO: Adicionado name
                        value={formData.nome} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Dell Brasil"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Razão Social *
                      </label>
                      <input
                        type="text"
                        name="razaoSocial" // CORREÇÃO: Adicionado name
                        value={formData.razaoSocial} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Dell Computadores do Brasil Ltda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ *
                      </label>
                      <input
                        type="text"
                        name="cnpj" // CORREÇÃO: Adicionado name
                        value={formData.cnpj} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select 
                        name="status" // CORREÇÃO: Adicionado name
                        value={formData.status} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                      >
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contato Principal */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contato Principal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Contato *
                      </label>
                      <input
                        type="text"
                        name="nomeContato" // CORREÇÃO: Adicionado name
                        value={formData.nomeContato} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Carlos Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        name="cargoContato" // CORREÇÃO: Adicionado name
                        value={formData.cargoContato} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Gerente Comercial"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email" // CORREÇÃO: Adicionado name
                        value={formData.email} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="contato@empresa.com.br"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="telefone" // CORREÇÃO: Adicionado name
                        value={formData.telefone} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="(00) 0000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Celular
                      </label>
                      <input
                        type="text"
                        name="celular" // CORREÇÃO: Adicionado name
                        value={formData.celular} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="endereco" // CORREÇÃO: Adicionado name
                        value={formData.endereco} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Av. Industrial Belgraf, 400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="cidade" // CORREÇÃO: Adicionado name
                        value={formData.cidade} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="estado" // CORREÇÃO: Adicionado name
                        value={formData.estado} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: SP"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="cep" // CORREÇÃO: Adicionado name
                        value={formData.cep} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>

                {/* Condições Comerciais */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Condições Comerciais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prazo de Entrega
                      </label>
                      <input
                        type="text"
                        name="prazoEntrega" // CORREÇÃO: Adicionado name
                        value={formData.prazoEntrega} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: 15 dias"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condição de Pagamento
                      </label>
                      <input
                        type="text"
                        name="condicaoPagamento" // CORREÇÃO: Adicionado name
                        value={formData.condicaoPagamento} // CORREÇÃO: Adicionado value
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: 30/60 dias"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categorias
                      </label>
                      <input
                        type="text"
                        name="categorias" // CORREÇÃO: Adicionado name
                        // O valor aqui será a string unida por vírgulas para edição
                        value={formData.categorias.join(', ')} 
                        onChange={handleInputChange} // CORREÇÃO: Adicionado onChange
                        className="text-black bg-white w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#23C55E]"
                        placeholder="Ex: Eletrônicos, Notebooks (separadas por vírgula)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="bg-gray-50 p-6 flex items-center justify-end gap-3 sticky bottom-0">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit} // CORREÇÃO 3: Adicionado o handler de submissão
                  className="px-6 py-2 bg-[#23C55E] hover:bg-[#1fa04e] text-white rounded-lg font-medium transition-colors"
                >
                  Salvar Fornecedor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}