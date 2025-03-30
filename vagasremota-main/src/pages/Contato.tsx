
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone, Instagram, Linkedin, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada",
      description: "Recebemos sua mensagem e responderemos em até 24h úteis.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Contato</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Como Falar Conosco - Tem alguma dúvida, sugestão ou encontrou algum erro na plataforma? 
              Entre em contato pelos canais abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-xl font-semibold mb-6">Envie uma mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Assunto da mensagem" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Sua mensagem ou dúvida" className="min-h-32" required />
                  </div>
                </div>
                
                <Button type="submit" className="remotando-button-primary w-full">
                  Enviar mensagem
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-6">Informações de contato</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-remotando-500 mt-1" />
                    <div>
                      <h3 className="font-medium">E-mail</h3>
                      <p className="text-muted-foreground">contato@vagasremota.com.br</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-remotando-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Suporte ao cliente</h3>
                      <p className="text-muted-foreground">De segunda a sexta, das 9h às 18h</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-start">
                    <MessageSquare className="h-5 w-5 mr-3 text-remotando-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Redes Sociais</h3>
                      <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-muted-foreground hover:text-remotando-500 transition-colors">
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-remotando-500 transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-remotando-500 transition-colors">
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 bg-remotando-50 p-6 rounded-lg">
                <h3 className="font-medium mb-2">Tempo de resposta</h3>
                <p className="text-sm text-muted-foreground">
                  Respondemos todas as mensagens em até 24 horas úteis. 
                  Sugestões de melhoria e relatórios de bugs são sempre bem-vindos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
