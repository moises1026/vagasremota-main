
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Calendar } from 'lucide-react';

// Mock data - would be replaced with actual API calls
const companyData = {
  1: {
    id: 1,
    name: 'TechSolutions',
    sector: 'Tecnologia',
    logo: '/placeholder.svg',
    openPositions: [
      {
        id: 101,
        title: 'Desenvolvedor Full Stack',
        location: 'Remoto',
        postedDate: '10/06/2023',
        type: 'CLT',
        salary: 'R$ 8.000 - R$ 12.000',
        description: 'Buscamos um desenvolvedor Full Stack com experiência em React e Node.js para trabalhar em projetos inovadores.'
      },
      {
        id: 102,
        title: 'UX/UI Designer',
        location: 'Remoto',
        postedDate: '08/06/2023',
        type: 'PJ',
        salary: 'R$ 7.000 - R$ 10.000',
        description: 'Procuramos um designer UX/UI para criar experiências incríveis em nossos produtos digitais.'
      },
      {
        id: 103,
        title: 'Product Manager',
        location: 'Remoto',
        postedDate: '05/06/2023',
        type: 'CLT',
        salary: 'R$ 10.000 - R$ 15.000',
        description: 'Estamos em busca de um Product Manager experiente para liderar nosso time de produto.'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Agência Criativa',
    sector: 'Marketing e Design',
    logo: '/placeholder.svg',
    openPositions: [
      {
        id: 201,
        title: 'Social Media Manager',
        location: 'Remoto',
        postedDate: '09/06/2023',
        type: 'PJ',
        salary: 'R$ 5.000 - R$ 7.000',
        description: 'Procuramos um Social Media Manager para gerenciar as redes sociais de nossos clientes.'
      },
      {
        id: 202,
        title: 'Designer Gráfico',
        location: 'Remoto',
        postedDate: '07/06/2023',
        type: 'CLT',
        salary: 'R$ 4.500 - R$ 6.500',
        description: 'Buscamos um Designer Gráfico talentoso para criar materiais visuais para campanhas de marketing.'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Marketing Digital Ltda',
    sector: 'Marketing',
    logo: '/placeholder.svg',
    openPositions: [
      {
        id: 301,
        title: 'Especialista em SEO',
        location: 'Remoto',
        postedDate: '11/06/2023',
        type: 'PJ',
        salary: 'R$ 6.000 - R$ 8.000',
        description: 'Estamos procurando um especialista em SEO para melhorar o posicionamento dos sites de nossos clientes.'
      }
    ]
  },
  4: {
    id: 4,
    name: 'ContentPro',
    sector: 'Produção de Conteúdo',
    logo: '/placeholder.svg',
    openPositions: [
      {
        id: 401,
        title: 'Redator de Conteúdo',
        location: 'Remoto',
        postedDate: '12/06/2023',
        type: 'PJ',
        salary: 'R$ 4.000 - R$ 6.000',
        description: 'Procuramos um redator de conteúdo para criar artigos de blog, posts em redes sociais e outros materiais.'
      },
      {
        id: 402,
        title: 'Editor de Vídeo',
        location: 'Remoto',
        postedDate: '10/06/2023',
        type: 'Freelancer',
        salary: 'R$ 5.000 - R$ 7.000',
        description: 'Buscamos um editor de vídeo para trabalhar em projetos de marketing digital e redes sociais.'
      }
    ]
  }
};

const EmpresaVagas = () => {
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
          <div className="animate-pulse">Carregando vagas da empresa...</div>
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
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-remotando-100 flex items-center justify-center mr-4">
              <img src={company.logo} alt={company.name} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <p className="text-muted-foreground">{company.sector}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6">
            Vagas disponíveis ({company.openPositions.length})
          </h2>

          {company.openPositions.length > 0 ? (
            <div className="grid gap-4">
              {company.openPositions.map(job => (
                <div key={job.id} className="glass-card p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-4 mb-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job.type}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Publicada em {job.postedDate}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-remotando-600 mb-3">
                        {job.salary}
                      </div>
                      
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {job.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-end items-center md:items-start">
                      <Button className="remotando-button-primary w-full md:w-auto" asChild>
                        <Link to={`/vagas/${job.id}`}>Ver detalhes</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                Esta empresa não possui vagas abertas no momento.
              </p>
              <Button variant="outline" asChild>
                <Link to="/empresas">Ver outras empresas</Link>
              </Button>
            </div>
          )}
          
          <div className="flex justify-between mt-10">
            <Button variant="outline" asChild>
              <Link to="/empresas">Voltar para empresas</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/empresas/${id}`}>Ver perfil da empresa</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmpresaVagas;
