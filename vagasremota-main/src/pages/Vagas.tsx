
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Briefcase, Search, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedFilters, { FilterOptions } from '@/components/AdvancedFilters';
import JobAlertDialog from '@/components/JobAlertDialog';

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
    logo: '/placeholder.svg',
    salary: 'R$ 3.000 - R$ 5.000',
    experienceLevel: 'pleno',
    remote: true
  },
  {
    id: 2,
    title: 'Desenvolvedor(a) Front-end React',
    company: 'TechSolutions',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Buscamos desenvolvedor React com experiência em TypeScript para integrar nosso time de desenvolvimento de produtos digitais.',
    logo: '/placeholder.svg',
    salary: 'R$ 6.000 - R$ 9.000',
    experienceLevel: 'pleno',
    remote: true
  },
  {
    id: 3,
    title: 'Social Media Manager',
    company: 'Marketing Digital Ltda',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    description: 'Gerenciar redes sociais de clientes, criar estratégias de conteúdo e analisar métricas de desempenho.',
    logo: '/placeholder.svg',
    salary: 'R$ 3.500 - R$ 5.500',
    experienceLevel: 'junior',
    remote: true
  },
  {
    id: 4,
    title: 'Analista de Suporte Técnico',
    company: 'TechHelp',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Fornecer suporte técnico aos clientes, solucionar problemas e garantir a satisfação dos usuários.',
    logo: '/placeholder.svg',
    salary: 'R$ 2.500 - R$ 4.000',
    experienceLevel: 'junior',
    remote: true
  },
  {
    id: 5,
    title: 'Redator de Conteúdo',
    company: 'ContentPro',
    location: 'Remoto',
    schedule: 'Horário flexível',
    type: 'PJ',
    description: 'Criação de artigos, blogs e materiais para diversas áreas. Boa capacidade de pesquisa e escrita impecável são requisitos.',
    logo: '/placeholder.svg',
    salary: 'R$ 2.000 - R$ 3.500',
    experienceLevel: 'junior',
    remote: true
  },
  {
    id: 6,
    title: 'Desenvolvedor(a) Back-end Node.js',
    company: 'SoftwareHouse',
    location: 'São Paulo, SP',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Desenvolver APIs e serviços usando Node.js, Express e MongoDB. Experiência com arquitetura de microserviços é um diferencial.',
    logo: '/placeholder.svg',
    salary: 'R$ 7.000 - R$ 10.000',
    experienceLevel: 'senior',
    remote: false
  },
  {
    id: 7,
    title: 'Product Manager',
    company: 'Inovação Tech',
    location: 'Remoto',
    schedule: 'Integral',
    type: 'CLT',
    description: 'Liderar o desenvolvimento de produtos digitais, desde a concepção até o lançamento. Experiência em metodologias ágeis e produtos SaaS.',
    logo: '/placeholder.svg',
    salary: 'R$ 10.000 - R$ 15.000',
    experienceLevel: 'senior',
    remote: true
  },
  {
    id: 8,
    title: 'Estágio em Marketing Digital',
    company: 'AgênciaWeb',
    location: 'Remoto',
    schedule: 'Meio período',
    type: 'Estágio',
    description: 'Oportunidade para estudantes de marketing, comunicação ou áreas afins. Aprenda na prática sobre SEO, redes sociais e marketing de conteúdo.',
    logo: '/placeholder.svg',
    salary: 'R$ 1.200 - R$ 1.500',
    experienceLevel: 'estagio',
    remote: true
  }
];

const Vagas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const navigate = useNavigate();

  const handleSearch = () => {
    applyFilters(searchQuery, activeFilters);
  };

  const applyFilters = (query: string, filters: FilterOptions) => {
    let results = jobs.filter(job => 
      (job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase()))
    );

    // Apply advanced filters
    if (filters.experienceLevel) {
      results = results.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    if (filters.contractType) {
      results = results.filter(job => job.type === filters.contractType);
    }

    if (filters.schedule) {
      results = results.filter(job => job.schedule === filters.schedule);
    }

    if (filters.remote) {
      results = results.filter(job => job.remote === true);
    } else if (filters.location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.salaryRange) {
      results = results.filter(job => {
        // Extract numeric values from salary range
        const salaryText = job.salary.replace(/[^0-9\-]/g, '');
        const [min, max] = salaryText.split('-').map(Number);
        
        return (
          (min >= filters.salaryRange![0] && min <= filters.salaryRange![1]) ||
          (max >= filters.salaryRange![0] && max <= filters.salaryRange![1])
        );
      });
    }

    setFilteredJobs(results);
  };

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    applyFilters(searchQuery, filters);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilters({});
    setFilteredJobs(jobs);
  };

  // Count the number of active filters
  const activeFiltersCount = Object.values(activeFilters).filter(value => 
    value !== undefined && value !== '' && value !== false
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">
              Vagas disponíveis
            </h1>
            <div className="flex items-center gap-2">
              <JobAlertDialog />
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => navigate('/publicar-vaga')}
              >
                <span>Publicar Vaga</span>
              </Button>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Buscar por cargo, empresa ou palavra-chave..."
                  className="pl-10 pr-4 py-3 h-12 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
              <Button 
                className="remotando-button-primary h-12 px-6"
                onClick={handleSearch}
              >
                Buscar
              </Button>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => setIsFiltersOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros avançados
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-remotando-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
            
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Filtros ativos:</span>
                {activeFilters.experienceLevel && (
                  <span className="text-xs bg-remotando-100 text-remotando-700 px-2 py-1 rounded-full mr-2">
                    Nível: {activeFilters.experienceLevel}
                  </span>
                )}
                {activeFilters.contractType && (
                  <span className="text-xs bg-remotando-100 text-remotando-700 px-2 py-1 rounded-full mr-2">
                    Contrato: {activeFilters.contractType}
                  </span>
                )}
                {activeFilters.schedule && (
                  <span className="text-xs bg-remotando-100 text-remotando-700 px-2 py-1 rounded-full mr-2">
                    Jornada: {activeFilters.schedule}
                  </span>
                )}
                {activeFilters.remote && (
                  <span className="text-xs bg-remotando-100 text-remotando-700 px-2 py-1 rounded-full mr-2">
                    Remoto
                  </span>
                )}
                {activeFilters.location && (
                  <span className="text-xs bg-remotando-100 text-remotando-700 px-2 py-1 rounded-full mr-2">
                    Local: {activeFilters.location}
                  </span>
                )}
                <Button 
                  variant="ghost" 
                  className="text-xs h-6 px-2 text-muted-foreground"
                  onClick={resetFilters}
                >
                  Limpar
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded bg-remotando-100 mr-3 flex items-center justify-center">
                      <img src={job.logo} alt={job.company} className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-muted-foreground">{job.company}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3">{job.title}</h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{job.schedule}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="default" 
                      className="remotando-button-primary flex-1"
                      onClick={() => navigate(`/vagas/${job.id}`)}
                    >
                      Ver detalhes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/vagas/${job.id}`)}
                    >
                      Candidatar-se
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhuma vaga encontrada para sua busca.
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <AdvancedFilters 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
      
      <Footer />
    </div>
  );
};

export default Vagas;
