
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(true);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Build the query with parameters
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append('q', searchQuery);
    }
    if (remoteOnly) {
      params.append('remote', 'true');
    }
    
    // Navigate to the search page with query parameters
    navigate({
      pathname: '/vagas',
      search: params.toString()
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-remotando-50/50 to-white/20"></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-remotando-200/30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-remotando-100/40 blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in" style={{ '--index': 0 } as React.CSSProperties}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              🚀 Encontre a vaga remota dos seus sonhos <span className="title-gradient">— onde você estiver!</span>
            </h1>
          </div>
          
          <div className="animate-fade-in" style={{ '--index': 1 } as React.CSSProperties}>
            <p className="text-xl text-muted-foreground mb-4">
              Vagas Remota é o portal brasileiro exclusivo para oportunidades de trabalho remoto.
              Aqui você encontra vagas reais, de empresas confiáveis, com filtros inteligentes para facilitar sua busca por liberdade profissional.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Seja você um profissional em busca de novas oportunidades ou uma empresa que valoriza o modelo remoto, está no lugar certo.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <span className="inline-flex items-center text-sm text-muted-foreground">
                📍 Vagas de todo o Brasil
              </span>
              <span className="inline-flex items-center text-sm text-muted-foreground">
                💼 Todos os setores
              </span>
              <span className="inline-flex items-center text-sm text-muted-foreground">
                🔒 Plataforma segura
              </span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl animate-fade-in" style={{ '--index': 2 } as React.CSSProperties}>
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Procure por cargo, empresa ou área..."
                className="pl-10 pr-4 py-3 h-14 w-full text-base rounded-xl border border-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={() => setRemoteOnly(!remoteOnly)}
                  className="rounded text-remotando-500 focus:ring-remotando-500"
                />
                <span>Mostrar apenas vagas 100% remotas</span>
              </label>
              
              <Button 
                className="remotando-button-primary px-8 py-3 h-12 rounded-xl w-full sm:w-auto" 
                onClick={handleSearch}
              >
                Buscar Vagas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
