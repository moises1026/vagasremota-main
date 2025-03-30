
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Upload, BookOpen, MessageSquare, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Recursos = () => {
  const resources = [
    {
      icon: <FileText className="h-10 w-10 text-remotando-500" />,
      title: "Modelos prontos de descrição de vagas",
      description: "Templates prontos para criar descrições de vagas atraentes e completas para diferentes áreas.",
      downloadText: "Baixar modelo",
      link: "#"
    },
    {
      icon: <Users className="h-10 w-10 text-remotando-500" />,
      title: "Guia para entrevistas remotas",
      description: "Aprenda a conduzir entrevistas remotas eficazes e avaliar candidatos à distância.",
      downloadText: "Baixar guia",
      link: "#"
    },
    {
      icon: <Upload className="h-10 w-10 text-remotando-500" />,
      title: "Estratégias de onboarding à distância",
      description: "Como integrar novos colaboradores remotos de forma eficiente e engajadora.",
      downloadText: "Baixar estratégias",
      link: "#"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-remotando-500" />,
      title: "E-books sobre cultura remota",
      description: "Materiais completos sobre como construir e manter uma cultura empresarial remota forte.",
      downloadText: "Baixar e-book",
      link: "#"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-remotando-500" />,
      title: "Templates de comunicação com candidatos",
      description: "Modelos de emails e mensagens para cada etapa do processo seletivo remoto.",
      downloadText: "Baixar templates",
      link: "#"
    },
    {
      icon: <Download className="h-10 w-10 text-remotando-500" />,
      title: "Checklist de contratação remota",
      description: "Lista completa para não esquecer nenhum detalhe ao contratar profissionais remotos.",
      downloadText: "Baixar checklist",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Recursos para Empresas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas e materiais para recrutamento inteligente e gestão de equipes remotas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-6 flex justify-center">
                  {resource.icon}
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    className="text-remotando-600 hover:underline inline-flex items-center"
                  >
                    {resource.downloadText}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-remotando-50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Precisa de ajuda personalizada?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Oferecemos consultoria especializada para empresas que desejam implementar ou 
              melhorar suas práticas de trabalho remoto.
            </p>
            <Button className="remotando-button-primary px-6 py-2 h-12">
              <Link to="/contato">Entrar em contato</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recursos;
