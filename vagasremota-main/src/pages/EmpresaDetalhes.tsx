
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, Globe, Mail, Phone, Calendar, Briefcase } from 'lucide-react';

// Mock data for the company details page
const companyData = {
  1: {
    id: 1,
    name: 'TechSolutions',
    sector: 'Tecnologia',
    location: 'Brasil',
    size: '50-200 funcionários',
    description: 'Empresa de desenvolvimento de software especializada em soluções empresariais e aplicativos mobile.',
    longDescription: 'TechSolutions é uma empresa inovadora que trabalha com as mais recentes tecnologias para criar soluções de software personalizadas. Com foco em qualidade e experiência do usuário, desenvolvemos aplicações que ajudam nossos clientes a alcançar seus objetivos de negócios.',
    logo: '/placeholder.svg',
    website: 'https://example.com',
    email: 'contato@techsolutions.com',
    phone: '+55 11 1234-5678',
    foundedYear: '2015',
    openPositions: [
      {
        id: 101,
        title: 'Desenvolvedor Full Stack',
        location: 'Remoto',
        postedDate: '2023-06-10',
        type: 'CLT'
      },
      {
        id: 102,
        title: 'UX/UI Designer',
        location: 'Remoto',
        postedDate: '2023-06-08',
        type: 'PJ'
      },
      {
        id: 103,
        title: 'Product Manager',
        location: 'Remoto',
        postedDate: '2023-06-05',
        type: 'CLT'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Agência Criativa',
    sector: 'Marketing e Design',
    location: 'Brasil',
    size: '10-50 funcionários',
    description: 'Agência full-service de marketing digital, branding e design para empresas inovadoras.',
    longDescription: 'Fundada em 2017, a Agência Criativa é uma empresa especializada em criar experiências de marca memoráveis e estratégias de marketing digital efetivas. Trabalhamos com empresas de todos os portes para ajudá-las a se destacar no mercado.',
    logo: '/placeholder.svg',
    website: 'https://example.com',
    email: 'contato@agenciacriativa.com',
    phone: '+55 11 9876-5432',
    foundedYear: '2017',
    openPositions: [
      {
        id: 201,
        title: 'Social Media Manager',
        location: 'Remoto',
        postedDate: '2023-06-09',
        type: 'PJ'
      },
      {
        id: 202,
        title: 'Designer Gráfico',
        location: 'Remoto',
        postedDate: '2023-06-07',
        type: 'CLT'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Marketing Digital Ltda',
    sector: 'Marketing',
    location: 'Brasil',
    size: '10-50 funcionários',
    description: 'Especialistas em estratégias de marketing digital, SEO e gestão de mídias sociais.',
    longDescription: 'A Marketing Digital Ltda é uma empresa dedicada a ajudar negócios a aumentarem sua presença online. Oferecemos serviços de SEO, marketing de conteúdo, mídia paga e consultoria estratégica.',
    logo: '/placeholder.svg',
    website: 'https://example.com',
    email: 'contato@marketingdigital.com',
    phone: '+55 11 5555-1234',
    foundedYear: '2018',
    openPositions: [
      {
        id: 301,
        title: 'Especialista em SEO',
        location: 'Remoto',
        postedDate: '2023-06-11',
        type: 'PJ'
      }
    ]
  },
  4: {
    id: 4,
    name: 'ContentPro',
    sector: 'Produção de Conteúdo',
    location: 'Brasil',
    size: '1-10 funcionários',
    description: 'Produção de conteúdo de alta qualidade para blogs, sites e redes sociais.',
    longDescription: 'ContentPro é uma equipe de escritores, editores e criadores de conteúdo dedicados a produzir material de alta qualidade para marcas. Nosso conteúdo não apenas entretém, mas também educa e converte leitores em clientes.',
    logo: '/placeholder.svg',
    website: 'https://example.com',
    email: 'contato@contentpro.com',
    phone: '+55 11 4444-8888',
    foundedYear: '2020',
    openPositions: [
      {
        id: 401,
        title: 'Redator de Conteúdo',
        location: 'Remoto',
        postedDate: '2023-06-12',
        type: 'PJ'
      },
      {
        id: 402,
        title: 'Editor de Vídeo',
        location: 'Remoto',
        postedDate: '2023-06-10',
        type: 'Freelancer'
      }
    ]
  }
};

const EmpresaDetalhes = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with setTimeout
    const timer = setTimeout(() => {
      if (id && companyData[Number(id)]) {
        setCompany(companyData[Number(id)]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Carregando informações da empresa...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Empresa não encontrada</h1>
            <p className="text-muted-foreground mb-8">
              A empresa que você está procurando não existe ou foi removida.
            </p>
            <Button className="remotando-button-primary px-8 py-3" asChild>
              <Link to="/empresas">Ver todas as empresas</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 rounded-xl bg-remotando-100 flex items-center justify-center">
                <img src={company.logo} alt={company.name} className="w-16 h-16" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{company.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{company.sector}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{company.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{company.size}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" 
                      className="hover:text-remotando-500">Site da empresa</a>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Desde {company.foundedYear}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a href={`mailto:${company.email}`}>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </a>
                  <a href={`tel:${company.phone}`}>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Telefone
                    </Button>
                  </a>
                </div>
              </div>
              
              <div className="w-full md:w-auto flex justify-center">
                <Button className="remotando-button-primary px-6">
                  <Link to={`/empresas/${company.id}/vagas`}>
                    Ver vagas abertas ({company.openPositions.length})
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="sobre" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
              <TabsTrigger value="sobre">Sobre a empresa</TabsTrigger>
              <TabsTrigger value="vagas">Vagas disponíveis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sobre" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Sobre nós</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {company.longDescription}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="vagas" className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Vagas disponíveis</h2>
                
                {company.openPositions.length > 0 ? (
                  <div className="grid gap-4">
                    {company.openPositions.map(job => (
                      <div key={job.id} className="border rounded-lg p-4 hover:border-remotando-300 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                              <span className="mx-2">•</span>
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          <Button className="remotando-button-primary" asChild>
                            <Link to={`/vagas/${job.id}`}>Ver vaga</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    Esta empresa não possui vagas abertas no momento.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmpresaDetalhes;
