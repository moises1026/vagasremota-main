
import { 
  Users, Building2, Calendar, LayoutDashboard, 
  FileText, Filter, Clock, Video, Star, Map, 
  Zap, Bell, CreditCard, Link2, Smartphone 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Building2 className="h-6 w-6 text-remotando-500" />,
      title: "Cadastro de Empresas Remotas",
      description: "Empresas criam perfis com CNPJ, logo e detalhes de cultura organizacional focada no trabalho remoto."
    },
    {
      icon: <Users className="h-6 w-6 text-remotando-500" />,
      title: "Cadastro de Candidatos Remotos",
      description: "Profissionais informam experiências, preferências de fuso horário, idiomas, e áreas de atuação remota."
    },
    {
      icon: <Calendar className="h-6 w-6 text-remotando-500" />,
      title: "Publicação de Vagas com Validade Personalizável",
      description: "Opções de 3, 7, 15, 30 dias e até 3 meses para manter a vaga publicada."
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-remotando-500" />,
      title: "Painel Administrativo (Empresas)",
      description: "Gerência de vagas, currículos recebidos, entrevista por vídeo, edição de vagas e acompanhamento de métricas."
    },
    {
      icon: <FileText className="h-6 w-6 text-remotando-500" />,
      title: "Painel do Candidato",
      description: "Currículo digital, vagas salvas, candidaturas, entrevistas marcadas e sugestões automáticas de vagas."
    },
    {
      icon: <Filter className="h-6 w-6 text-remotando-500" />,
      title: "Filtro por Tipo de Vaga",
      description: "Filtrar por 100% remoto, híbrido, por projeto, CLT ou PJ."
    },
    {
      icon: <Clock className="h-6 w-6 text-remotando-500" />,
      title: "Filtro por Fuso Horário e Horário de Trabalho",
      description: "Empresas e candidatos filtram por compatibilidade de horário de trabalho remoto."
    },
    {
      icon: <Video className="h-6 w-6 text-remotando-500" />,
      title: "Sistema de Vídeoentrevistas Embutido",
      description: "Ferramenta de chamada de vídeo direta dentro do painel com agendamento e gravação opcional."
    },
    {
      icon: <Star className="h-6 w-6 text-remotando-500" />,
      title: "Avaliação e Reputação de Empresas Remotas",
      description: "Os candidatos avaliam experiência de trabalho remoto com a empresa, cultura e comunicação."
    },
    {
      icon: <Map className="h-6 w-6 text-remotando-500" />,
      title: "Busca com Geolocalização Opcional",
      description: "Ainda que seja remoto, permite ver oportunidades de preferência por estados ou cidades (para casos híbridos)."
    },
    {
      icon: <Zap className="h-6 w-6 text-remotando-500" />,
      title: "Sistema de Match de Perfil e Vaga",
      description: "Algoritmo conecta candidatos e empresas com base em habilidades, localização, idiomas e experiência."
    },
    {
      icon: <Bell className="h-6 w-6 text-remotando-500" />,
      title: "Notificações Inteligentes",
      description: "Alertas automáticos de novas vagas remotas homologadas ao perfil do candidato."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-remotando-500" />,
      title: "Planos de Publicação para Empresas",
      description: "Gratuito com limite de vagas, ou planos pagos com destaque, relatórios e entrevistas por vídeo embutidos."
    },
    {
      icon: <Link2 className="h-6 w-6 text-remotando-500" />,
      title: "Currículo Online com Portfólio",
      description: "Os candidatos podem anexar links de portfólio (Behance, GitHub, etc), além de currículo em PDF ou HTML."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-remotando-500" />,
      title: "Design Responsivo e Fluido",
      description: "Interface intuitiva e leve, adaptada para todos os tamanhos de tela com navegação rápida e acessível."
    }
  ];

  return (
    <section id="funcionalidades" className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Funcionalidades da Plataforma</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            O Vagas Remota oferece um conjunto completo de recursos para conectar profissionais e empresas 
            no mundo do trabalho remoto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="bg-slate-50 p-3 rounded-xl mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
