
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Como se destacar em entrevistas remotas',
    excerpt: 'Dicas para se preparar e causar uma boa impressão em entrevistas online.',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'As melhores ferramentas para trabalho remoto',
    excerpt: 'Conheça os softwares essenciais para aumentar sua produtividade no home office.',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'Como montar seu home office ideal',
    excerpt: 'Guia completo para criar um espaço de trabalho produtivo e confortável em casa.',
    image: '/placeholder.svg'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Blog
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Conteúdos exclusivos para ajudar na sua carreira remota.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ '--index': index } as React.CSSProperties}
            >
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-remotando-500 hover:text-remotando-600 font-medium"
                >
                  Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center text-remotando-600 hover:text-remotando-700 font-medium">
            Ver todos os artigos <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
