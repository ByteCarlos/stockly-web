import React, { useState } from 'react';
import { Settings, Building2, User, Bell, Shield, Database, Palette, Save } from 'lucide-react';

// -----------------------------------------------------------------------------
// Configurações - Tipo, valores padrão e hook
// -----------------------------------------------------------------------------

export interface ConfigType {
  // Empresa
  nomeEmpresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;

  // Notificações
  emailEstoqueBaixo: boolean;
  emailNovaEntrada: boolean;
  emailNovaSaida: boolean;
  notifEstoqueCritico: boolean;
  notifVencimento: boolean;

  // Sistema
  moeda: 'BRL' | 'USD' | 'EUR';
  idioma: 'pt-BR' | 'en-US' | 'es-ES';
  formato_data: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  fuso_horario: 'America/Sao_Paulo' | 'America/Manaus' | 'America/Noronha';
  estoque_minimo_padrao: string;

  // Aparência
  tema: 'claro' | 'escuro';
  cor_primaria: string;
}

const defaultConfig: ConfigType = {
  nomeEmpresa: 'Minha Empresa Ltda',
  cnpj: '12.345.678/0001-90',
  email: 'contato@empresa.com',
  telefone: '(11) 3456-7890',
  endereco: 'Av. Paulista, 1000',
  cidade: 'São Paulo',
  estado: 'SP',
  cep: '01310-100',

  emailEstoqueBaixo: true,
  emailNovaEntrada: false,
  emailNovaSaida: true,
  notifEstoqueCritico: true,
  notifVencimento: true,

  moeda: 'BRL',
  idioma: 'pt-BR',
  formato_data: 'DD/MM/YYYY',
  fuso_horario: 'America/Sao_Paulo',
  estoque_minimo_padrao: '10',

  tema: 'escuro',
  cor_primaria: '#23C55E'
};

function useConfig(initial: ConfigType = defaultConfig) {
  const [config, setConfig] = useState<ConfigType>(initial);

  const set = <K extends keyof ConfigType>(key: K, value: ConfigType[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return { config, set, setConfig } as const;
}

// -----------------------------------------------------------------------------
// Componentes de UI reutilizáveis
// -----------------------------------------------------------------------------

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

function Input({ label, hint, ...rest }: InputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        {...rest}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${rest.className || ''}`}
      />
      {hint && <p className="text-sm text-gray-500 mt-2">{hint}</p>}
    </div>
  );
}

function Select<T extends string | number>({ label, value, onChange, children }: {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <select
        value={String(value)}
        onChange={(e) => onChange(e.target.value as unknown as T)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      >
        {children}
      </select>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
    </label>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="p-4 bg-gray-50 rounded-lg">{children}</div>;
}

// -----------------------------------------------------------------------------
// Painéis
// -----------------------------------------------------------------------------

function EmpresaPanel({ config, set }: { config: ConfigType; set: ReturnType<typeof useConfig>['set'] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações da Empresa</h2>
      <div className="grid grid-cols-2 gap-6">
        <Input label="Nome da Empresa" placeholder="Ex: Minha Empresa Ltda" value={config.nomeEmpresa} onChange={(e) => set('nomeEmpresa', e.target.value)} />
        <Input label="CNPJ" placeholder="00.000.000/0000-00" value={config.cnpj} onChange={(e) => set('cnpj', e.target.value)} />
        <Input label="E-mail" type="email" placeholder="contato@empresa.com" value={config.email} onChange={(e) => set('email', e.target.value)} />
        <Input label="Telefone" placeholder="(00) 0000-0000" value={config.telefone} onChange={(e) => set('telefone', e.target.value)} />
        <div className="col-span-2">
          <Input label="Endereço" placeholder="Rua, Avenida, número" value={config.endereco} onChange={(e) => set('endereco', e.target.value)} />
        </div>
        <Input label="Cidade" placeholder="Nome da cidade" value={config.cidade} onChange={(e) => set('cidade', e.target.value)} />
        <Select label="Estado" value={config.estado} onChange={(v) => set('estado', v as any)}>
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="MG">Minas Gerais</option>
          <option value="SE">Sergipe</option>
        </Select>
        <Input label="CEP" placeholder="00000-000" value={config.cep} onChange={(e) => set('cep', e.target.value)} />
      </div>
    </div>
  );
}

function UsuarioPanel() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Perfil do Usuário</h2>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">CS</div>
        <div>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Alterar Foto</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Input label="Nome Completo" placeholder="Seu nome completo" defaultValue="Carlos Silva" />
        <Input label="E-mail" placeholder="seu@email.com" defaultValue="carlos.silva@stockly.com" type="email" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Função</label>
          <input disabled defaultValue="Administrador" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
        </div>
        <Input label="Departamento" placeholder="Nome do departamento" defaultValue="TI" />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Alterar Senha</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <Input label="Senha Atual" type="password" placeholder="Digite sua senha atual" />
          </div>
          <Input label="Nova Senha" type="password" placeholder="Digite a nova senha" />
          <Input label="Confirmar Nova Senha" type="password" placeholder="Confirme a nova senha" />
        </div>
      </div>
    </div>
  );
}

function NotificacoesPanel({ config, set }: { config: ConfigType; set: ReturnType<typeof useConfig>['set'] }) {
  const emailItems = [
    { key: 'emailEstoqueBaixo' as const, label: 'Alertas de estoque baixo', desc: 'Receba e-mails quando produtos atingirem o estoque mínimo' },
    { key: 'emailNovaEntrada' as const, label: 'Novas entradas de produtos', desc: 'Notificação sobre todas as entradas registradas' },
    { key: 'emailNovaSaida' as const, label: 'Novas saídas de produtos', desc: 'Notificação sobre todas as saídas registradas' }
  ];

  const sysItems = [
    { key: 'notifEstoqueCritico' as const, label: 'Estoque crítico', desc: 'Alertas quando produtos estão em níveis críticos' },
    { key: 'notifVencimento' as const, label: 'Produtos próximos ao vencimento', desc: 'Notificações sobre produtos que vencem em breve' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferências de Notificações</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações por E-mail</h3>
          <div className="space-y-4">
            {emailItems.map(item => (
              <div key={item.key} className="flex items-start justify-between p-4 bg-white rounded-lg border">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
                <Toggle checked={config[item.key]} onChange={(v) => set(item.key, v as any)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notificações do Sistema</h3>
          <div className="space-y-4">
            {sysItems.map(item => (
              <div key={item.key} className="flex items-start justify-between p-4 bg-white rounded-lg border">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
                <Toggle checked={config[item.key]} onChange={(v) => set(item.key, v as any)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SistemaPanel({ config, set }: { config: ConfigType; set: ReturnType<typeof useConfig>['set'] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações do Sistema</h2>
      <div className="grid grid-cols-2 gap-6">
        <Select label="Moeda" value={config.moeda} onChange={(v) => set('moeda', v as any)}>
          <option value="BRL">Real (R$)</option>
          <option value="USD">Dólar (US$)</option>
          <option value="EUR">Euro (€)</option>
        </Select>

        <Select label="Idioma" value={config.idioma} onChange={(v) => set('idioma', v as any)}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
        </Select>

        <Select label="Formato de Data" value={config.formato_data} onChange={(v) => set('formato_data', v as any)}>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </Select>

        <Select label="Fuso Horário" value={config.fuso_horario} onChange={(v) => set('fuso_horario', v as any)}>
          <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
          <option value="America/Manaus">Manaus (GMT-4)</option>
          <option value="America/Noronha">Fernando de Noronha (GMT-2)</option>
        </Select>

        <div className="col-span-2">
          <Input label="Estoque Mínimo Padrão" type="number" placeholder="Ex: 10" value={config.estoque_minimo_padrao} onChange={(e) => set('estoque_minimo_padrao', e.target.value)} hint="Quantidade mínima padrão para novos produtos" />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Backup Automático</h3>
        <p className="text-sm text-blue-800 mb-4">O sistema realiza backups automáticos diariamente às 03:00.</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Fazer Backup Agora</button>
      </div>
    </div>
  );
}

function AparenciaPanel({ config, set }: { config: ConfigType; set: ReturnType<typeof useConfig>['set'] }) {
  const colorOptions = [
    { color: '#23C55E', name: 'Verde' },
    { color: '#1fa04e', name: 'Verde escuro' },
    { color: '#3b82f6', name: 'Azul' },
    { color: '#8b5cf6', name: 'Roxo' },
    { color: '#f59e0b', name: 'Laranja' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalização de Aparência</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tema</label>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => set('tema', 'claro')} className={`p-6 border-2 rounded-lg transition-all ${config.tema === 'claro' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}>
              <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                <div className="h-2 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
              </div>
              <p className="font-medium text-gray-800">Tema Claro</p>
            </button>

            <button onClick={() => set('tema', 'escuro')} className={`p-6 border-2 rounded-lg transition-all ${config.tema === 'escuro' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'}`}>
              <div className="bg-gray-800 rounded-lg p-4 shadow-sm mb-3">
                <div className="h-2 bg-gray-600 rounded mb-2"></div>
                <div className="h-2 bg-gray-600 rounded w-3/4"></div>
              </div>
              <p className="font-medium text-gray-800">Tema Escuro</p>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Cor Primária</label>
          <div className="grid grid-cols-5 gap-3">
            {colorOptions.map(item => (
              <button key={item.color} onClick={() => set('cor_primaria', item.color)} className={`p-4 border-2 rounded-lg transition-all ${config.cor_primaria === item.color ? 'border-gray-800 scale-105' : 'border-gray-300 hover:border-gray-400'}`}>
                <div className="w-full h-12 rounded-lg mb-2" style={{ backgroundColor: item.color }}></div>
                <p className="text-sm font-medium text-gray-700">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SegurancaPanel() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Segurança e Privacidade</h2>
      <div className="space-y-6">
        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Autenticação em Dois Fatores</h3>
          <p className="text-sm text-gray-600 mb-4">Adicione uma camada extra de segurança à sua conta.</p>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Ativar 2FA</button>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Sessões Ativas</h3>
          <p className="text-sm text-gray-600 mb-4">Gerencie os dispositivos conectados à sua conta.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Chrome - Windows</p>
                <p className="text-sm text-gray-600">Aracaju, Brasil • Ativo agora</p>
              </div>
              <span className="text-xs text-emerald-600 font-medium">Atual</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Safari - iPhone</p>
                <p className="text-sm text-gray-600">São Paulo, Brasil • Há 2 dias</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">Encerrar</button>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Logs de Acesso</h3>
          <p className="text-sm text-gray-600 mb-4">Visualize o histórico de acessos à sua conta.</p>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Ver Histórico</button>
        </Card>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Componente principal
// -----------------------------------------------------------------------------

export default function ConfiguracoesStockly({ token }: { token?: string }) {
  const [activeTab, setActiveTab] = useState<'empresa' | 'usuario' | 'notificacoes' | 'sistema' | 'aparencia' | 'seguranca'>('empresa');

  const { config, set } = useConfig();

  const tabs = [
    { id: 'empresa', label: 'Adicionar Empresa', icon: Building2 },
    { id: 'usuario', label: 'Usuário', icon: User },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'sistema', label: 'Sistema', icon: Database },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'seguranca', label: 'Segurança', icon: Shield }
  ] as const;

  const handleSave = async () => {
    try {
      if (token) {
        // fetch('/api/config', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(config) })
      }
      window.alert('Configurações salvas com sucesso!');
    } catch (err) {
      console.error(err);
      window.alert('Erro ao salvar configurações. Veja o console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8" style={{ color: config.cor_primaria }} />
            <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
          </div>
          <p className="text-gray-600">Gerencie as configurações do sistema</p>
        </div>

        <div className="flex gap-6">
          <aside className="w-64 bg-white rounded-lg shadow-sm p-4 h-fit">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeTab === tab.id ? 'bg-emerald-500 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </aside>

          <main className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'empresa' && <EmpresaPanel config={config} set={set} />}
            {activeTab === 'usuario' && <UsuarioPanel />}
            {activeTab === 'notificacoes' && <NotificacoesPanel config={config} set={set} />}
            {activeTab === 'sistema' && <SistemaPanel config={config} set={set} />}
            {activeTab === 'aparencia' && <AparenciaPanel config={config} set={set} />}
            {activeTab === 'seguranca' && <SegurancaPanel />}

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">Cancelar</button>

              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                <Save className="w-5 h-5" />
                Salvar Configurações
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}