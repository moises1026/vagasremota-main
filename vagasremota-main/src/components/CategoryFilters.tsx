
import { Code, Palette, BarChart, Headphones, MessageSquare } from 'lucide-react';

const categories = [
  {
    id: 'dev',
    name: 'Desenvolvedor(a)',
    icon: <Code className="h-8 w-8 text-remotando-500 mb-3" />,
  },
  {
    id: 'design',
    name: 'Design e Criação',
    icon: <Palette className="h-8 w-8 text-remotando-500 mb-3" />,
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    icon: <BarChart className="h-8 w-8 text-remotando-500 mb-3" />,
  },
  {
    id: 'support',
    name: 'Atendimento e Suporte',
    icon: <Headphones className="h-8 w-8 text-remotando-500 mb-3" />,
  },
  {
    id: 'content',
    name: 'Redação e Conteúdo',
    icon: <MessageSquare className="h-8 w-8 text-remotando-500 mb-3" />,
  },
];

const CategoryFilters = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-remotando-50/30">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Filtros Populares
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className="category-card animate-fade-in"
              style={{ '--index': index } as React.CSSProperties}
            >
              {category.icon}
              <h3 className="font-medium text-center">{category.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center text-remotando-600 hover:text-remotando-700 font-medium">
            Ver todas as categorias →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilters;
