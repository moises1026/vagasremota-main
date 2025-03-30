
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ForCompanies = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 px-4 bg-remotando-600 text-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">
            Publique suas vagas remotas em minutos
          </h2>
          <p className="text-xl opacity-90 mb-8 animate-fade-in" style={{ '--index': 1 } as React.CSSProperties}>
            Alcance talentos em todo o Brasil com nosso painel inteligente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ '--index': 2 } as React.CSSProperties}>
            {user ? (
              <Button asChild className="bg-white text-remotando-600 hover:bg-remotando-50 px-8 py-3 rounded-xl h-12 font-medium">
                <Link to="/publicar-vaga">✅ Publique uma vaga agora</Link>
              </Button>
            ) : (
              <Button asChild className="bg-white text-remotando-600 hover:bg-remotando-50 px-8 py-3 rounded-xl h-12 font-medium">
                <Link to="/cadastro">✅ Crie sua conta agora</Link>
              </Button>
            )}
            <Button asChild variant="navy" className="border-white px-8 py-3 rounded-xl h-12 font-medium">
              <Link to="/planos">📢 Conheça nossos planos</Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm animate-fade-in" style={{ '--index': 3 } as React.CSSProperties}>
              <h3 className="text-xl font-semibold mb-2">⭐ Alcance</h3>
              <p className="opacity-90">Encontre os melhores profissionais remotos em todo o país.</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm animate-fade-in" style={{ '--index': 4 } as React.CSSProperties}>
              <h3 className="text-xl font-semibold mb-2">⭐ Simplicidade</h3>
              <p className="opacity-90">Interface intuitiva para publicar e gerenciar suas vagas.</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm animate-fade-in" style={{ '--index': 5 } as React.CSSProperties}>
              <h3 className="text-xl font-semibold mb-2">⭐ Eficiência</h3>
              <p className="opacity-90">Filtros inteligentes para encontrar os candidatos ideais.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCompanies;
