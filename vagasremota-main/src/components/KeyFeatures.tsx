
import { Briefcase, Calendar, FileText, Filter, Globe, Map, MessageSquare, MonitorSmartphone, Star, User, Video } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Cadastro de Empresas e Candidatos',
    description: 'Perfis personalizados para empresas e profissionais com foco no trabalho remoto.',
    icon: <User className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 2,
    title: 'Publicação de Vagas Personalizável',
    description: 'Opções de 3, 7, 15, 30 dias e até 3 meses para manter a vaga publicada.',
    icon: <Briefcase className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 3,
    title: 'Painéis Intuitivos',
    description: 'Gerenciamento completo para empresas e candidatos, com currículo digital e métricas.',
    icon: <FileText className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 4,
    title: 'Filtros Avançados',
    description: 'Filtre por tipo de vaga, fuso horário, horário de trabalho e muito mais.',
    icon: <Filter className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 5,
    title: 'Vídeoentrevistas Integradas',
    description: 'Realize entrevistas diretamente na plataforma com agendamento e gravação opcional.',
    icon: <Video className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 6,
    title: 'Avaliação de Empresas',
    description: 'Sistema de reputação para empresas remotas com foco em cultura e comunicação.',
    icon: <Star className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 7,
    title: 'Geolocalização Opcional',
    description: 'Encontre oportunidades por estados ou cidades para casos híbridos ou 100% remotos.',
    icon: <Map className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 8,
    title: 'Match Inteligente',
    description: 'Algoritmo que conecta candidatos e empresas com base em perfil e requisitos.',
    icon: <Globe className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 9,
    title: 'Notificações Personalizadas',
    description: 'Alertas automáticos de novas vagas que combinam com seu perfil.',
    icon: <MessageSquare className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 10,
    title: 'Planos Flexíveis',
    description: 'Opções gratuitas e premium para empresas, com destaque e relatórios avançados.',
    icon: <Calendar className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 11,
    title: 'Portfólio Integrado',
    description: 'Anexe links de portfólio e compartilhe seu currículo em PDF ou HTML.',
    icon: <FileText className="h-10 w-10 text-remotando-500" />
  },
  {
    id: 12,
    title: 'Design Responsivo',
    description: 'Interface intuitiva e leve, adaptada para todos os tamanhos de tela.',
    icon: <MonitorSmartphone className="h-10 w-10 text-remotando-500" />
  }
];

const KeyFeatures = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-remotando-50/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Funcionalidades que transformam sua experiência remota</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais do que um site de vagas, uma plataforma completa para a nova era do trabalho remoto no Brasil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card p-6 rounded-xl bg-white border border-remotando-100 hover:border-remotando-300 transition-all duration-300 shadow-sm hover:shadow animate-fade-in"
              style={{ '--index': index * 0.1 } as React.CSSProperties}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
