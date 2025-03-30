
import { Home, Clock, Ban, TrendingUp, MessageCircle, Check } from 'lucide-react';

const features = [
  {
    icon: <Home className="h-8 w-8 text-remotando-500" />,
    title: 'Trabalhe de onde quiser',
    description: 'Liberdade para trabalhar de casa, de um café ou de qualquer lugar no Brasil.'
  },
  {
    icon: <Clock className="h-8 w-8 text-remotando-500" />,
    title: 'Flexibilidade total',
    description: 'Muitas vagas oferecem horários flexíveis para você equilibrar vida e trabalho.'
  },
  {
    icon: <Ban className="h-8 w-8 text-remotando-500" />,
    title: 'Sem deslocamento',
    description: 'Economize tempo e dinheiro eliminando o trajeto diário até o escritório.'
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-remotando-500" />,
    title: 'Vagas atualizadas diariamente',
    description: 'Novas oportunidades são adicionadas todos os dias na nossa plataforma.'
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-remotando-500" />,
    title: 'Comunicação segura com empresas',
    description: 'Converse diretamente com recrutadores através da nossa plataforma segura.'
  },
  {
    icon: <Check className="h-8 w-8 text-remotando-500" />,
    title: 'Empresas verificadas',
    description: 'Todas as empresas são verificadas para garantir oportunidades legítimas.'
  }
];

const WhyUseRemotando = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-remotando-50/30 to-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Por que usar o Vagas Remota?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Criamos a melhor plataforma para conectar profissionais a vagas remotas de qualidade.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border bg-white/50 hover:border-remotando-300 transition-all duration-300 animate-fade-in"
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseRemotando;
