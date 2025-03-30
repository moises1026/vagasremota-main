import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from "sonner";
import { Clock, MapPin, Briefcase, ArrowLeft, Building, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Sample job data - in a real app this would come from an API
const jobs = [
  {
    id: 1,
    title: 'Designer Gráfico Remoto (PJ)',
    company: 'Agência Criativa',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    description: 'Estamos em busca de um Designer Gráfico talentoso para trabalhar em projetos criativos para nossos clientes. Experiência com Adobe Creative Suite é essencial.',
    responsibilities: [
      'Criar designs para mídias sociais, websites e materiais impressos',
      'Desenvolver identidades visuais para marcas',
      'Trabalhar em estreita colaboração com a equipe de marketing',
      'Apresentar conceitos criativos para clientes'
    ],
    requirements: [
      'Experiência comprovada como Designer Gráfico',
      'Domínio do Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
      'Portfólio demonstrando trabalhos anteriores',
      'Conhecimento de princípios de design e tendências atuais'
    ],
    benefits: [
      'Trabalho 100% remoto',
      'Horário flexível',
      'Pagamento competitivo',
      'Oportunidades de crescimento'
    ],
    salary: 'R$ 3.000 - R$ 5.000',
    postedAt: '2023-07-15',
    logo: '/placeholder.svg',
    companyDescription: 'Agência de design e marketing digital especializada em soluções criativas para pequenas e médias empresas.'
  },
  {
    id: 2,
    title: 'Desenvolvedor(a) Front-end React',
    company: 'TechSolutions',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Buscamos desenvolvedor React com experiência em TypeScript para integrar nosso time de desenvolvimento de produtos digitais.',
    responsibilities: [
      'Desenvolver interfaces de usuário responsivas e acessíveis',
      'Trabalhar com APIs RESTful',
      'Participar de code reviews e implementar melhores práticas',
      'Colaborar com designers e outros desenvolvedores'
    ],
    requirements: [
      'Experiência com React e TypeScript',
      'Conhecimento de HTML, CSS e JavaScript moderno',
      'Familiaridade com controle de versão Git',
      'Capacidade de trabalhar de forma autônoma e em equipe'
    ],
    benefits: [
      'Plano de saúde',
      'Vale refeição',
      'Home office',
      'Ambiente colaborativo'
    ],
    salary: 'R$ 6.000 - R$ 9.000',
    postedAt: '2023-07-20',
    logo: '/placeholder.svg',
    companyDescription: 'Empresa especializada em desenvolvimento de software, com foco em tecnologias modernas e inovação.'
  },
  {
    id: 3,
    title: 'Social Media Manager',
    company: 'Marketing Digital Ltda',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    description: 'Gerenciar redes sociais de clientes, criar estratégias de conteúdo e analisar métricas de desempenho.',
    responsibilities: [
      'Gerenciar contas de redes sociais para múltiplos clientes',
      'Desenvolver e implementar estratégias de conteúdo',
      'Analisar métricas e ajustar estratégias conforme necessário',
      'Manter-se atualizado sobre tendências de redes sociais'
    ],
    requirements: [
      'Experiência comprovada em gestão de redes sociais',
      'Conhecimento de ferramentas de analytics',
      'Excelente comunicação escrita',
      'Capacidade de trabalhar com prazos'
    ],
    benefits: [
      'Trabalho 100% remoto',
      'Horário flexível',
      'Bônus por performance',
      'Oportunidades de crescimento'
    ],
    salary: 'R$ 3.500 - R$ 5.500',
    postedAt: '2023-07-25',
    logo: '/placeholder.svg',
    companyDescription: 'Empresa especializada em marketing digital, com foco em estratégias de conteúdo e análise de dados.'
  },
  {
    id: 4,
    title: 'Analista de Suporte Técnico',
    company: 'TechHelp',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Fornecer suporte técnico aos clientes, solucionar problemas e garantir a satisfação dos usuários.',
    responsibilities: [
      'Atender chamados de suporte técnico',
      'Diagnosticar e solucionar problemas de hardware e software',
      'Documentar soluções e criar tutoriais',
      'Colaborar com outras áreas para resolver problemas complexos'
    ],
    requirements: [
      'Experiência em suporte técnico',
      'Conhecimento de sistemas operacionais Windows e macOS',
      'Habilidade de comunicação e atendimento ao cliente',
      'Certificações em áreas relacionadas são um diferencial'
    ],
    benefits: [
      'Plano de saúde',
      'Vale transporte',
      'Seguro de vida',
      'Treinamentos e certificações'
    ],
    salary: 'R$ 2.500 - R$ 4.000',
    postedAt: '2023-08-01',
    logo: '/placeholder.svg',
    companyDescription: 'Empresa especializada em suporte técnico, com foco em soluções eficientes e eficazes.'
  },
  {
    id: 5,
    title: 'Redator de Conteúdo',
    company: 'ContentPro',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    description: 'Criação de artigos, blogs e materiais para diversas áreas. Boa capacidade de pesquisa e escrita impecável são requisitos.',
    responsibilities: [
      'Escrever artigos e posts para blogs',
      'Criar conteúdo para redes sociais',
      'Revisar e editar textos',
      'Realizar pesquisas para embasar o conteúdo'
    ],
    requirements: [
      'Excelente habilidade de escrita',
      'Conhecimento de SEO',
      'Capacidade de pesquisa',
      'Experiência em produção de conteúdo digital'
    ],
    benefits: [
      'Trabalho 100% remoto',
      'Horário flexível',
      'Pagamento por projeto',
      'Oportunidades de crescimento'
    ],
    salary: 'R$ 2.000 - R$ 3.500',
    postedAt: '2023-08-05',
    logo: '/placeholder.svg',
    companyDescription: 'Empresa especializada em conteúdo digital, com foco em qualidade e inovação.'
  },
  {
    id: 6,
    title: 'Desenvolvedor(a) Back-end Node.js',
    company: 'SoftwareHouse',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Desenvolver APIs e serviços usando Node.js, Express e MongoDB. Experiência com arquitetura de microserviços é um diferencial.',
    responsibilities: [
      'Desenvolver APIs RESTful',
      'Implementar testes unitários e de integração',
      'Participar de code reviews',
      'Colaborar com a equipe front-end'
    ],
    requirements: [
      'Experiência com Node.js, Express e MongoDB',
      'Conhecimento de JavaScript e TypeScript',
      'Familiaridade com arquitetura de microserviços',
      'Experiência com Docker e Kubernetes é um diferencial'
    ],
    benefits: [
      'Plano de saúde',
      'Vale refeição',
      'Home office',
      'Ambiente colaborativo'
    ],
    salary: 'R$ 7.000 - R$ 10.000',
    postedAt: '2023-08-10',
    logo: '/placeholder.svg',
    companyDescription: 'Empresa especializada em desenvolvimento de software, com foco em tecnologias modernas e inovação.'
  },
];

const VagaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Find the job with the matching ID
  const job = jobs.find(job => job.id === Number(id));
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Vaga não encontrada</h1>
            <p className="mb-6">A vaga que você está procurando não existe ou foi removida.</p>
            <Button variant="default" onClick={() => navigate('/vagas')}>
              Voltar para vagas
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleApply = () => {
    setApplied(true);
    setShowSuccessDialog(true);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Button 
            variant="outline" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate('/vagas')}
          >
            <ArrowLeft className="h-4 w-4" /> Voltar para vagas
          </Button>
          
          <div className="glass-card p-8 rounded-2xl mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded bg-remotando-100 flex items-center justify-center">
                <img src={job.logo} alt={job.company} className="w-10 h-10" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                
                <div className="flex items-center text-muted-foreground mb-4">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="mr-3">{job.company}</span>
                  
                  <Calendar className="h-4 w-4 mr-1 ml-2" />
                  <span>Publicada em {formatDate(job.postedAt)}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-remotando-50 text-remotando-700 px-3 py-1 rounded-full flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="bg-remotando-50 text-remotando-700 px-3 py-1 rounded-full flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.schedule}</span>
                  </div>
                  
                  <div className="bg-remotando-50 text-remotando-700 px-3 py-1 rounded-full flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                </div>
                
                {!applied ? (
                  <div className="flex gap-3">
                    <Button 
                      variant="default" 
                      className="remotando-button-primary px-8 py-3 h-12 rounded-xl"
                      onClick={handleApply}
                    >
                      Candidatar-se agora
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-6 py-3 h-12 rounded-xl"
                      onClick={() => toast.success("Vaga salva com sucesso!")}
                    >
                      Salvar vaga
                    </Button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    ✅ Você já se candidatou para esta vaga. Boa sorte!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="border rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Descrição da vaga</h2>
                <p className="text-muted-foreground mb-6">{job.description}</p>
                
                <h3 className="text-lg font-medium mb-3">Responsabilidades</h3>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium mb-3">Requisitos</h3>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-medium mb-3">Benefícios</h3>
                <ul className="list-disc list-inside space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Resumo da vaga</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Empresa</h3>
                    <p>{job.company}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Localização</h3>
                    <p>{job.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tipo de contratação</h3>
                    <p>{job.type}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Jornada</h3>
                    <p>{job.schedule}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Faixa salarial</h3>
                    <p>{job.salary}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data de publicação</h3>
                    <p>{formatDate(job.postedAt)}</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-xl p-6 bg-white">
                <h2 className="text-xl font-semibold mb-4">Sobre a empresa</h2>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded bg-remotando-100 mr-3 flex items-center justify-center">
                    <img src={job.logo} alt={job.company} className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium">{job.company}</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {job.companyDescription || 'Empresa especializada em sua área de atuação, com foco em qualidade e inovação.'}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/empresas/${job.id}`)}
                >
                  Ver perfil da empresa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Candidatura enviada com sucesso!</AlertDialogTitle>
            <AlertDialogDescription>
              Sua candidatura para a vaga de {job.title} foi enviada com sucesso. 
              A empresa entrará em contato caso seu perfil seja selecionado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default VagaDetalhes;
