
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Database, UserCheck } from "lucide-react";

const Privacidade = () => {
  const policies = [
    {
      icon: <Database className="h-10 w-10 text-remotando-500" />,
      title: "Coleta de Dados",
      description: "Coletamos apenas as informações possíveis: nome, e-mail, CPF (se necessário), currículo e preferências de trabalho."
    },
    {
      icon: <Users className="h-10 w-10 text-remotando-500" />,
      title: "Uso das Informações",
      description: "Seus dados são utilizados para: encontrar vagas compatíveis, melhorar sua experiência e comunicar oportunidades."
    },
    {
      icon: <Shield className="h-10 w-10 text-remotando-500" />,
      title: "Compartilhamento",
      description: "Nunca vendemos seus dados. Compartilhamos apenas com empresas para as quais você se candidatou."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-remotando-500" />,
      title: "Seus Direitos",
      description: "Você pode editar ou excluir seus dados a qualquer momento, de acordo com a LGPD."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Política de Privacidade</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Como protegemos e utilizamos seus dados na plataforma VagasRemota.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {policies.map((policy, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50 p-6 flex justify-center">
                  {policy.icon}
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
                  <p className="text-muted-foreground">{policy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-remotando-50 p-8 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Compromisso com a LGPD</h2>
            <p className="text-muted-foreground mb-4">
              A VagasRemota está comprometida com a Lei Geral de Proteção de Dados (LGPD) e com a 
              proteção das informações pessoais de seus usuários. Respeitamos sua privacidade e 
              valorizamos a confiança que você deposita em nós.
            </p>
            <p className="text-muted-foreground">
              Se você tiver qualquer dúvida sobre como tratamos seus dados, entre em contato pelo 
              e-mail: <span className="text-remotando-600">privacidade@vagasremota.com.br</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
