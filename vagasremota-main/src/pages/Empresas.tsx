
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users } from 'lucide-react';

const companies = [
  {
    id: 1,
    name: 'TechSolutions',
    sector: 'Tecnologia',
    location: 'Brasil',
    size: '50-200 funcionários',
    description: 'Empresa de desenvolvimento de software especializada em soluções empresariais e aplicativos mobile.',
    logo: '/placeholder.svg',
    openPositions: 3
  },
  {
    id: 2,
    name: 'Agência Criativa',
    sector: 'Marketing e Design',
    location: 'Brasil',
    size: '10-50 funcionários',
    description: 'Agência full-service de marketing digital, branding e design para empresas inovadoras.',
    logo: '/placeholder.svg',
    openPositions: 2
  },
  {
    id: 3,
    name: 'Marketing Digital Ltda',
    sector: 'Marketing',
    location: 'Brasil',
    size: '10-50 funcionários',
    description: 'Especialistas em estratégias de marketing digital, SEO e gestão de mídias sociais.',
    logo: '/placeholder.svg',
    openPositions: 1
  },
  {
    id: 4,
    name: 'ContentPro',
    sector: 'Produção de Conteúdo',
    location: 'Brasil',
    size: '1-10 funcionários',
    description: 'Produção de conteúdo de alta qualidade para blogs, sites e redes sociais.',
    logo: '/placeholder.svg',
    openPositions: 2
  },
];

const Empresas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const handleSearch = () => {
    const filtered = companies.filter(company => 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Empresas com vagas remotas
          </h1>
          
          <div className="glass-card p-6 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Buscar por empresa, setor ou palavra-chave..."
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
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <div key={company.id} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded bg-remotando-100 mr-3 flex items-center justify-center">
                      <img src={company.logo} alt={company.name} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-medium">{company.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {company.description}
                  </p>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{company.location}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{company.size}</span>
                    </div>

                    <div className="text-sm font-medium text-remotando-600">
                      {company.openPositions} vaga{company.openPositions !== 1 ? 's' : ''} aberta{company.openPositions !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="default" 
                      className="remotando-button-primary flex-1"
                    >
                      <Link to={`/empresas/${company.id}`}>Ver perfil</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                    >
                      <Link to={`/empresas/${company.id}/vagas`}>Ver vagas</Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  Nenhuma empresa encontrada para sua busca.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setFilteredCompanies(companies);
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold mb-4">É uma empresa com vagas remotas?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cadastre sua empresa no Vagas Remota e encontre os melhores profissionais para suas posições remotas.
            </p>
            <Button 
              className="remotando-button-primary px-8 py-3 h-12 rounded-xl"
            >
              <Link to="/cadastro">Cadastrar minha empresa</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Empresas;
