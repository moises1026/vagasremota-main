
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Video, BookOpen, Wrench, Award, Users, Calendar } from "lucide-react";

const Dicas = () => {
  const tips = [
    {
      icon: <Video className="h-10 w-10 text-remotando-500" />,
      title: "Como se preparar para entrevistas online",
      description: "Aprenda a se destacar em entrevistas remotas com dicas sobre equipamentos, ambiente, comunicação não-verbal e como lidar com problemas técnicos.",
      link: "#"
    },
    {
      icon: <Wrench className="h-10 w-10 text-remotando-500" />,
      title: "Como montar seu home office ideal",
      description: "Guia completo para criar um espaço de trabalho produtivo em casa, desde a escolha do mobiliário até iluminação e organização do ambiente.",
      link: "#"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-remotando-500" />,
      title: "Ferramentas para organização e produtividade",
      description: "Conheça as melhores ferramentas para gestão de tempo, organização de tarefas e aumento de produtividade no trabalho remoto.",
      link: "#"
    },
    {
      icon: <Award className="h-10 w-10 text-remotando-500" />,
      title: "Erros comuns em currículos (e como evitá-los)",
      description: "Descubra os erros mais frequentes que podem eliminar seu currículo e aprenda como destacar suas habilidades de forma eficiente.",
      link: "#"
    },
    {
      icon: <Users className="h-10 w-10 text-remotando-500" />,
      title: "A importância do networking digital",
      description: "Estratégias para construir e manter uma rede de contatos profissionais no ambiente digital, essencial para oportunidades remotas.",
      link: "#"
    },
    {
      icon: <Calendar className="h-10 w-10 text-remotando-500" />,
      title: "Equilibrando vida pessoal e trabalho remoto",
      description: "Dicas práticas para manter o equilíbrio entre vida profissional e pessoal quando se trabalha de casa.",
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dicas de Carreira</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conteúdo criado para turbinar sua jornada remota e ajudar você a se destacar 
              no mercado de trabalho à distância.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-6 flex justify-center">
                  {tip.icon}
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground mb-4">{tip.description}</p>
                  <a 
                    href={tip.link} 
                    className="text-remotando-600 hover:underline inline-flex items-center"
                  >
                    Ler mais
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-remotando-50 p-8 rounded-xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Newsletter Vagas Remota</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Receba semanalmente dicas exclusivas de carreira, novas vagas e conteúdo especializado 
                sobre trabalho remoto diretamente no seu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Seu melhor email" 
                  className="px-4 py-2 rounded-md border border-input"
                />
                <button className="remotando-button-primary px-6 py-2 rounded-md">
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dicas;
