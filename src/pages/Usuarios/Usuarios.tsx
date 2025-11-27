import { useState } from 'react';
import { Search, Download, Upload, Plus, Eye, Edit, Trash2, User, Shield, X } from 'lucide-react';

type RoleType = 'Administrador' | 'Gerente' | 'Operador' | 'Visualizador';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleType | 'todos'>('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const users: Array<{
    id: string;
    name: string;
    email: string;
    role: RoleType;
    status: 'ATIVO' | 'INATIVO';
    lastAccess: string;
    department: string;
  }> = [
    {
      id: 'USR-001',
      name: 'Carlos Silva',
      email: 'carlos.silva@stockly.com',
      role: 'Administrador',
      status: 'ATIVO',
      lastAccess: '27/11/2024 14:30',
      department: 'TI'
    },
    {
      id: 'USR-002',
      name: 'Mariana Costa',
      email: 'mariana.costa@stockly.com',
      role: 'Gerente',
      status: 'ATIVO',
      lastAccess: '27/11/2024 13:15',
      department: 'Vendas'
    },
    {
      id: 'USR-003',
      name: 'João Santos',
      email: 'joao.santos@stockly.com',
      role: 'Operador',
      status: 'ATIVO',
      lastAccess: '27/11/2024 11:45',
      department: 'Estoque'
    },
    {
      id: 'USR-004',
      name: 'Ana Oliveira',
      email: 'ana.oliveira@stockly.com',
      role: 'Operador',
      status: 'ATIVO',
      lastAccess: '26/11/2024 18:20',
      department: 'Logística'
    },
    {
      id: 'USR-005',
      name: 'Pedro Almeida',
      email: 'pedro.almeida@stockly.com',
      role: 'Visualizador',
      status: 'INATIVO',
      lastAccess: '20/11/2024 09:30',
      department: 'Financeiro'
    },
    {
      id: 'USR-006',
      name: 'Julia Ferreira',
      email: 'julia.ferreira@stockly.com',
      role: 'Gerente',
      status: 'ATIVO',
      lastAccess: '27/11/2024 10:00',
      department: 'Compras'
    }
  ];

  const stats = {
    total: 6,
    active: 5,
    inactive: 1,
    admins: 1
  };

  const getRoleColor = (role: RoleType) => {
    const colors: Record<RoleType, string> = {
      Administrador: 'bg-purple-100 text-purple-700',
      Gerente: 'bg-blue-100 text-blue-700',
      Operador: 'bg-green-100 text-green-700',
      Visualizador: 'bg-gray-100 text-gray-700'
    };

    return colors[role];
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === 'todos' || user.role === roleFilter;

    const matchesStatus =
      statusFilter === 'todos' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-8 h-8 text-teal-500" />
            <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          </div>
          <p className="text-gray-600">Gerencie os usuários e permissões do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total de Usuários</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Usuários Ativos</h3>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border-t-4 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Usuários Inativos</h3>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
          </div>

          <div className="bg-white rounded-xl p-6 border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Administradores</h3>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.admins}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as RoleType | 'todos')}
              className="bg-white text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="todos">Todas as funções</option>
              <option value="Administrador">Administrador</option>
              <option value="Gerente">Gerente</option>
              <option value="Operador">Operador</option>
              <option value="Visualizador">Visualizador</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="todos">Todos os status</option>
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('todos');
                setStatusFilter('todos');
              }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Limpar Filtros
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Upload className="w-4 h-4" />
              Importar
            </button>
            <button 
              onClick={() => setShowNewUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors ml-auto"
            >
              <Plus className="w-4 h-4" />
              Novo Usuário
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Função</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Departamento</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Último Acesso</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.id}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                          <span className="text-teal-700 font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastAccess}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'ATIVO'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Visualizar">
                          <Eye className="w-4 h-4" />
                        </button>

                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>

                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir">
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal Novo Usuário */}
      {showNewUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Novo Usuário</h2>
              <button
                onClick={() => setShowNewUserModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body do Modal */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: João da Silva"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Ex: joao@stockly.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Senha segura"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Repita a senha"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Função <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900">
                    <option value="">Selecione uma função</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Operador">Operador</option>
                    <option value="Visualizador">Visualizador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900">
                    <option value="">Selecione um departamento</option>
                    <option value="TI">TI</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Estoque">Estoque</option>
                    <option value="Logística">Logística</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Compras">Compras</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="ativo"
                      defaultChecked
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">Ativo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inativo"
                      className="w-4 h-4 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700">Inativo</span>
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Permissões da Função</h4>
                <p className="text-xs text-blue-700">
                  As permissões serão definidas automaticamente com base na função selecionada. 
                  Você poderá ajustá-las depois na edição do usuário.
                </p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowNewUserModal(false)}
                className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 px-6 py-2.5 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                Criar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}